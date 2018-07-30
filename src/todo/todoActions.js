import axios from 'axios';

const URL = "http://localhost:8080/api/todo";
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9BRE1JTiIsImNyZWF0ZWQiOjE1MzI5MDczOTU0NzIsImV4cCI6MTUzMzUxMjE5NX0.RH2Z6oiLF5jLq2F5ukC5-OUxQLCsd5AM3wi1x1nSj0y7So4Yz5gexOD9zeUVwvXvve5uuLnLP8Q6lAGBDge2nw";


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
    return dispatch => {
        axios.post(URL,body,axiosConfig)
            .then( resp => dispatch(clear()) )
            .then( resp => dispatch(search()))
    }
}

export const maskAsDone = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo.id}`, {...todo,"done": true})
            .then( resp => dispatch(search()) )
    }
}

export const maskAsPending = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo.id}`, {...todo,"done": false})
            .then( resp => dispatch(search()) )
    }
}

export const remove = (todo) => {
    return dispatch => {
        axios.delete(`${URL}/${todo.id}`)
            .then( resp => dispatch(search()) )
    }
}

export const clear = () => {
    return { type: 'TODO_CLEAR' }
}