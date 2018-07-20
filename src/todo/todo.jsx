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
        this.state = { description: '',list: [],result: []}
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove=this.handleRemove.bind(this);
        this.handlePaginationChange=this.handlePaginationChange.bind(this);
        this.handleMarkAsDone=this.handleMarkAsDone.bind(this);
        this.handleMarkAsPending=this.handleMarkAsPending.bind(this);

        this.refresh();
    }

    refresh(pag){
        let pagina = pag ? `&pag=${pag-1}` : "";
        let url_ = `${URL}/listar?sort=-toDo${pagina}`
        axios.get(url_)
            .then(res => {
                let dados = res.data.data;
                let pag = [{
                    "first": dados.first,
                    "last": dados.last,
                    "totalElements": dados.totalElements,
                    "totalPages": dados.totalPages,
                    "numberOfElements":dados.numberOfElements,
                    "paginaAtual": this.props.location.query.pag
                }]
                this.setState({...this.state, description: '', list: res.data.data.content, result: pag})
            });
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

    handlePaginationChange(pag){
        this.refresh(pag);
    }

    handleMarkAsDone(todo){
        axios.put(`${URL}/${todo.id}`, {...todo,"done": true})
            .then(resp => this.refresh());
    }

    handleMarkAsPending(todo){
        axios.put(`${URL}/${todo.id}`, {...todo, done:false})
            .then(resp => this.refresh());
    }

    render(){
        return (
            <div>
                <PageHeader name="Tarefas" small="Cadastro"/>
                <TodoForm 
                    handleAdd={this.handleAdd} 
                    handleChange={this.handleChange}
                    description={this.state.description}/> 
                <TodoList 
                    list={this.state.list} 
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                    />
                <Pagination 
                    result={this.state.result} 
                    handlePaginationChange={this.handlePaginationChange}/>
            </div>
        )
    }
}