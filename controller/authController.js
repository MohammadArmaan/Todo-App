const User = require('./../model/userModel');
const jwt = require('jsonwebtoken');
const sendEmail = require('./../utils/emails');
const crypto = require('crypto')

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 100),
        httpOnly: true,
        // secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        secure: 'production',
        sameSite: 'strict'
        
    }
    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        }
    });
}

exports.signup = async (req, res, next) => {
    try{
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        });

        const subject = 'Welcome to the Nisal Todo App'
        const text = `Thanks for joining Nisal Todo App, Start writing your todos in ${req.protocol}://${req.get('host')}/`
        sendEmail(req.body.email, subject, text, (err) => {
            res.status(400).json({
                status: 'error',
                message: err.message
            })
        });

        createSendToken(newUser, 201, req, res);

    }
    catch(err){
        res.status(400).json({
            status: 'error',
            data: err.message
        });
    }

}

exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400).json({
            status: 'error',
            data: {
                message: 'Please provide email and password!'
            }
        });
        next();
    }

    const user = await User.findOne({email}).select('+password');

    if(!user || !(await user.correctPassword(password, user.password))){
        res.status(400).json({
            status: 'error',
            data: {
                message: 'Email or password did not matched!'
            }
        });
        next();  
    }

    createSendToken(user, 200, req, res);
}

exports.logout = (req, res, next) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    });

    res.set('Cache-Control', 'no-store');
    res.status(200).json({ status: 'success' });
}

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (process.env.NODE_ENV === 'production' && !token) {
        return res.status(401).render('withoutLogin');
    }
    if (!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'You are not logged in! Please log in to get access.'
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return res.status(401).json({
            status: 'fail',
            message: 'The user belonging to this token does no longer exist.'
        });
    }

    req.user = currentUser;
    next();
};

const createPasswordResetToken = (user) => {
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    return resetToken;
};

// Forgot Password Handler
exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'No user found with that email'
            });
        }

        const resetToken = createPasswordResetToken(user);
        await user.save({ validateBeforeSave: false });

        const subject = 'Reset Your Password';
        const text = `Reset your password at ${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;

        sendEmail(req.body.email, subject, text, (err) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    message: 'There was an error sending the email. Try again later.'
                });
            }

            res.status(200).json({
                status: 'success',
                message: 'Token sent to email!'
            });
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

// Reset Password Handler
exports.resetPassword = async (req, res, next) => {
    try {
        const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Token is invalid or has expired'
            });
        }

        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        createSendToken(user, 200, req, res);
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};
