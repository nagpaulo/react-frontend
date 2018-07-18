import React from 'react';
import IconButton from '../template/IconButton';

export default props => {
    const renderRows = () => {
        const list = props.list || [];
        return list.map(todo => (
            <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.toDo}</td>
                <td>
                    <IconButton style='danger' icon='trash-o' 
                        onClick={() => props.handleRemove(todo)}></IconButton>
                </td>
            </tr>
        ))
    }

    return (
        <table className="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Descrição</th>
                <th scope="col">Ações</th>
            </tr>
        </thead>
        <tbody>
            {renderRows()}
        </tbody>
        </table>
    );
}