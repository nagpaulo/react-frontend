import React from 'react';

export default props => {
    let dados = props.result;
    //console.log(dados);
    const registros = () => {
        return dados.map(todo => (
            <label htmlFor="#" key={0}>{`${todo.numberOfElements} de ${todo.totalElements} Registros`}</label>
        ))
    }
    const fistPagination = () =>{
        return dados.map(todo =>(
            <li className={todo.first == true ? "page-item disabled" : "page-item"} key={0}>
                <a className="page-link" href={todo.last == true ? "." : "#"}>&laquo;</a>
            </li>
        ))
    }
    const lastPagination = () =>{
        return dados.map(todo=>(
            <li className={todo.last == true ? "page-item disabled" : "page-item"} key={0}>
                <a className="page-link" href={todo.last == true ? "#" : `/#/todos?pag=${todo.totalPages}`} onClick={() => props.handlePaginationChange(todo.totalPages)}>&raquo;</a>
            </li>
        ))
    }
    const item = function(){
        var rows = [], i = 0, len = dados.map(todo => todo.totalPages), pgAtual=dados.map(todo => todo.paginaAtual), description=dados.map(todo => todo.description);
        //console.log(description[0]);
        while (++i <= len) rows.push(i);
        return (
            rows.map(function (i) {
                return <li className={i==pgAtual ? "page-item active" : "page-item"} key={i}>
                            <a className="page-link" href={`/#/todos?pag=${i}`} onClick={() => props.handlePaginationChange(i,description[0])}>{i}</a>
                        </li>;
            })
        );
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col align-self-end">
                    {registros()}
                </div>
            </div>
            <div className="row">
                <div className="col align-self-end">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                            {fistPagination()}
                            {item()}
                            {lastPagination()}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}