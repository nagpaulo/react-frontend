import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    todo: () => ({
        description: 'Ler livro',
        list: [{
            id: 1,
            toDo: 'Pagar fatura do cartão de credito.',
            done: true
        },{
            id: 2,
            toDo: 'Reuniao com a equipe às 10:00.',
            done: false
        },{
            id: 3,
            toDo: 'Consulta médica na terça depois do almoço.',
            done: false
        }]
    })
});

export default rootReducer;