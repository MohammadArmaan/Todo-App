import axios from "axios";
import { showAlert } from "./alerts";

export const resetPassword = async (password, passwordConfirm, token) => {
    try{
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/users/resetPassword/${token}`,
            data: {
                password, 
                passwordConfirm
            }
        })
        if(res.data.status === 'success'){
            showAlert('success', 'Password Changed Successfully');
            window.setTimeout(() => {
                location.assign('/login')
            }, 1500);
        }
    }
    catch(err){
        showAlert('error', "Cannot Change your password!")
    }

}