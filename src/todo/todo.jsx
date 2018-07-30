import React from 'react';

import PageHeader from '../template/pageHeader';
import Pagination from '../template/pagination';
import TodoForm from './todoForm';
import TodoList from './todoList';

export default props => (
    <div>
        <PageHeader name="Tarefas" small="Cadastro"/>
        <TodoForm /> 
        <TodoList />
        {/* <Pagination 
            result={this.state.result} 
            handlePaginationChange={this.handlePaginationChange}/> */}
    </div>
);