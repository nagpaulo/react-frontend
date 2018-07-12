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
        const description = this.state.description;
        var config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept':'application/json',
                'Authorization':'Bearer  eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9BRE1JTiIsImNyZWF0ZWQiOjE1MzEzMzc5NTc3NTcsImV4cCI6MTUzMTk0Mjc1N30.JjHIYp_caex3vr9F22GdF2UJJmNCu33ly_lqXgMk5qSg5UWwcZ2O33FTY4E43hD3IMSEBIvO_aSzVVImGfuRiw' 
            }
            

        };
        axios.defaults.baseURL = URL;
        axios.defaults.headers.common['Authorization'] = 'Bearer  eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9BRE1JTiIsImNyZWF0ZWQiOjE1MzEzMzc5NTc3NTcsImV4cCI6MTUzMTk0Mjc1N30.JjHIYp_caex3vr9F22GdF2UJJmNCu33ly_lqXgMk5qSg5UWwcZ2O33FTY4E43hD3IMSEBIvO_aSzVVImGfuRiw';
        axios.defaults.headers.get['Accept'] = 'application/json';
        axios.get()
            .then(resp => console.log("Funcionou!"));
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