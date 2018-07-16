import React, { Component } from 'react';
import axios from 'axios'; 

import PageHeader from '../template/pageHeader';
import TodoForm from '../todo/todoForm';
import TodoList from '../todo/todoList';

const URL = "http://localhost:8080/api/todo/listar";

export default class Todo extends Component{
    constructor(props){
        super(props);
        this.state = { description: '', list: []}
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }
    handleChange(e){
        this.setState({...this.state, description: e.target.value})
    }

    handleAdd(){
        /*var config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type':'application/json',
                'authorization':'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9BRE1JTiIsImNyZWF0ZWQiOjE1MzE3NjQ1NDg4ODAsImV4cCI6MTUzMjM2OTM0OH0.4XqtCLdrFZr1Z2oswhXycGLDknw2pcuH7eoNfBVg8QuzvpONXPmqYvQc2RAq72dned1DedoGi1wZV25UcE6nIA' 
            }
        };
        axios.get(URL,{config})
            .then(resp => console.log("Funcionou!"));*/

        
        /*let data = {
            description: description
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9BRE1JTiIsImNyZWF0ZWQiOjE1MzE3NjQ1NDg4ODAsImV4cCI6MTUzMjM2OTM0OH0.4XqtCLdrFZr1Z2oswhXycGLDknw2pcuH7eoNfBVg8QuzvpONXPmqYvQc2RAq72dned1DedoGi1wZV25UcE6nIA");
        let fetchData = { 
            method: 'GET', 
            body: data,
            headers: myHeaders
        }
        
        fetch(URL,fetchData)
        .then((resp) => resp.json())
        .catch(function(data) {
            console.log("Erro! "+data);
        });*/


        fetch(URL, {
            method: 'GET',
            headers: new Headers({
              'Content-Type': 'application/json',
              'authorization':'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9BRE1JTiIsImNyZWF0ZWQiOjE1MzE3NjQ1NDg4ODAsImV4cCI6MTUzMjM2OTM0OH0.4XqtCLdrFZr1Z2oswhXycGLDknw2pcuH7eoNfBVg8QuzvpONXPmqYvQc2RAq72dned1DedoGi1wZV25UcE6nIA'
            })
          }).then(function(response) {
            console.log(response);
          });
        
    }

    render(){
        return (
            <div>
                <PageHeader name="Tarefas" small="Cadastro"/>
                <TodoForm handleAdd={this.handleAdd} 
                    handleChange={this.handleChange}
                    description={this.state.description}/>
                <TodoList />
            </div>
        )
    }
}