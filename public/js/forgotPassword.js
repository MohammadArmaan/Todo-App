import axios from "axios";
import { showAlert } from "./alerts";

export const forgotPassword = async (email) => {
    try{
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/forgotPassword',
            data: {
                email
            }
        })
        if(res.data.status === 'success'){
            showAlert('success', 'Email Sent!')
        }
    }
    catch(err){
        showAlert('error', "Couldn't send the email!")
    }

}