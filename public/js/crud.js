/* disable-eslint */
import axios from "axios"
import { showAlert } from "./alerts";

export const create = async (todo) => {
    try{

        const res = await axios({
            method: 'POST',
            url: '/api/v1/todo',
            data: {
                todo
            }
        });

        showAlert('success', 'Added Todo!');
        window.setTimeout(() => {
            location.reload();
        }, 500);
    }
    catch(err){
        showAlert('error', err.message);
    }
}

export const update = async (todo, id) => {
    try{
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/todo/${id}`,
            data: {
                todo
            }
        });

        showAlert('success', 'Updated Todo!');
        window.setTimeout(() =>{
            location.reload()
        }, 500);
    }
    catch(err){
        showAlert('error', err.message);
    }
}

export const deleteOpp = async (id) => {
    try{
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/todo/${id}`
        });
        showAlert('success', 'Deleted Todo!');
        window.setTimeout(() => {
            location.reload();
        }, 500);
    }
    catch(err){
        showAlert('error', err.message);
    }

}

export const checkboxChecked = async (completed, id) => {
    try{
        const res = await axios({
            method: 'PATCH',
            url: `api/v1/todo/${id}`,
            data: {
                completed
            }
        });
        window.setTimeout(() => {
            location.reload();
        }, 500);
    }
    catch(err){
        showAlert('error', err.message);
    }

}
