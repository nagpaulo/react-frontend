import React, { Component } from 'react';
import axios from 'axios'; 

import PageHeader from '../template/pageHeader';
import Pagination from '../template/pagination';
import TodoForm from '../todo/todoForm';
import TodoList from '../todo/todoList';

const URL = "http://localhost:8080/api/todo";
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9BRE1JTiIsImNyZWF0ZWQiOjE1MzE5MzMyNjExNzEsImV4cCI6MTUzMjUzODA2MX0.lz9ohlBk_xPYdUbDhUyLGQfjL_ZYYGOcXtiCHL4j3TlYVr2_I16XVOcoQW32NcY_Wq8GvSZi47rzs_nfUO_dvw";

export default class Todo extends Component{
    constructor(props){
        super(props);
        this.state = { description: '', list: []}
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove=this.handleRemove.bind(this);

        this.refresh();
    }

    refresh(){
        axios.get(`${URL}/listar?sort=-toDo`)
            .then((resp) => this.setState({...this.state, description: '', list: resp.data.data.content}));
    }

    handleRemove(todo){
        axios.delete(`${URL}/${todo.id}`)
            .then(resp => this.refresh());
    }

    handleChange(e){
        this.setState({...this.state, description: e.target.value})
    }

    handleAdd(){
        var body = {
            toDo: this.state.description,
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

        axios.post(URL,body,axiosConfig)
            .then(resp=> this.refresh());
    }

    render(){
        return (
            <div>
                <PageHeader name="Tarefas" small="Cadastro"/>
                <TodoForm handleAdd={this.handleAdd} 
                    handleChange={this.handleChange}
                    description={this.state.description}/> 
                <TodoList list={this.state.list} handleRemove={this.handleRemove}/>
                <Pagination />
            </div>
        )
    }
}