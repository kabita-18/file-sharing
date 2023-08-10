import axios from 'axios';

// const API_URL = 'https://file-sharing-app-6875d-default-rtdb.firebaseio.com/';
const API_URL = 'http://localhost:8000';

export const uploadFile = async(data) =>{
    try{
        let response = await axios.post(`${API_URL}/upload`, data);
        return response.data;
    }
    catch(error){
        console.error(`Error while calling the api`, error.message);
    }
}