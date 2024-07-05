/* disable-eslint */
import axios from "axios"

export const create = async (todo) => {
    try{

        const res = await axios({
            method: 'POST',
            url: '/api/v1/todo',
            data: {
                todo
            }
        });

        window.setTimeout(() => {
            location.reload();
        }, 500);
    }
    catch(err){
        console.error(err);
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

        window.setTimeout(() =>{
            location.reload()
        }, 500);
    }
    catch(err){
        console.error(err);
    }
}

export const deleteOpp = async (id) => {
    try{
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/todo/${id}`
        });
        window.setTimeout(() => {
            location.reload();
        }, 500);
    }
    catch(err){
        console.error(err);
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
        console.error(err);
    }

}
