import axios from 'axios';

const URL = "http://localhost:8080/api/todo";
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9BRE1JTiIsImNyZWF0ZWQiOjE1MzE5MzMyNjExNzEsImV4cCI6MTUzMjUzODA2MX0.lz9ohlBk_xPYdUbDhUyLGQfjL_ZYYGOcXtiCHL4j3TlYVr2_I16XVOcoQW32NcY_Wq8GvSZi47rzs_nfUO_dvw";


export const changeDescription = event => ({
    type: "DESCRIPTION_CHANGED",
    payload: event.target.value
});

export const search = (pag,description) => {
    let pagina = pag ? `&pag=${pag-1}` : "";
    let url_ = `${URL}/listar?sort=-toDo${pagina}`;
    let request;

    if(!description){
        request = axios.get(url_)
    }else{
        let url_ = `${URL}/listar?sort=-toDo`;
        axios.post(url_,{toDo:description})
        request = axios.post(url_)
    }

    return {
        type: 'TODO_SEARCHED',
        payload: request
    }
}

export const add = (description) => {
    var body = {
        toDo: description,
        done: false,
        access: token
    }
    let axiosConfig = {
        headers: {
            'async': true,
            'crossDomain': true,
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'application/json',
            'Cache-Control': 'no-cache',
            'Authorization':'Bearer '+token
        }
      };

    const request = axios.post(URL,body,axiosConfig)
    return {
        type: 'TODO_ADDED',
        payload: request
    }
}