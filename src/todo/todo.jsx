import React, { Component } from 'react';
import axios from 'axios'; 

import PageHeader from '../template/pageHeader';
import Pagination from '../template/pagination';
import TodoForm from './todoForm';
import TodoList from './todoList';

export default class Todo extends Component{

    render(){
        return (
            <div>
                <PageHeader name="Tarefas" small="Cadastro"/>
                <TodoForm /> 
                <TodoList />
                {/* <Pagination 
                    result={this.state.result} 
                    handlePaginationChange={this.handlePaginationChange}/> */}
            </div>
        )
    }
}