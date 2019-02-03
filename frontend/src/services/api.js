import axios from 'axios';

const host='http://localhost:8000';

export const setToken=token=>{
    if (token) {
        axios.defaults.common['Authorization']=`Bearer ${token}`;
    }else{
        delete axios.defaults.common['Authorization'];
    }
};

export const call=async (method,path,data)=>{
    const response=await axios[method](`${host}/${path}`,data);
    return response.data;
};

//In this way the api is called like: api.call
export default {call, setToken};
