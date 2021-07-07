import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.models';
import * as actions from './todo.actions';
 
export const initialState: Todo[] = [
    new Todo('Salvar el mundo'),
    new Todo('Hola'),
    new Todo('Chao')
];
 
const _todoReducer = createReducer(
  initialState,
  on(actions.crear, (state, { texto }) => [...state, new Todo(texto) ]),
  
  on(actions.toggle, (state, { id }) => {
    return state.map( todo => {
      if( todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        }
      }
      else {
          return todo;
        }
      
    });
  }),

  on(actions.editar, (state, { id, texto }) => {
    return state.map( todo => {
      if( todo.id === id) {
        return {
          ...todo,
          texto: texto
        }
      }
      else {
          return todo;
        }
      
    });
  }),
  
  on(actions.eliminar, (state, { id }) => state.filter(todo => todo.id !== id)),

  on(actions.toggleAll, (state, { completado }) => 
    state.map( todo => {
      return {
        ...todo,
        completado: completado
      }
    })
  ),

  on(actions.eliminarCompletados, (state) => state.filter( todo => !todo.completado) ),
  
);
 
export function todoReducer(state, action) {
  return _todoReducer(state, action);
}