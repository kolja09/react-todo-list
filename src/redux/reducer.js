import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const AddTodoReducer = createSlice({
  name: 'todos',
  initialState,
  reducers:{
    //here we will write our reducer 
    //Adding todos
    addTodos:(state, action) =>{
      state.push(action.payload)
      return state
    },
    removeTodos:(state, action) =>{
      return state.filter(item => item.id !== action.payload)
    },
    updateTodos:(state, action ) =>{
      return state.map(todo =>{
        if(todo.id === action.payload.id){
          return{
            ...todo,
            item: action.payload.item,
          }
        }
        return todo;
      })
    },
    completeTodos:(state, action) =>{
      return state.map(todo =>{
        if(todo.id === action.payload){
          return{
            ...todo,
            completed: true,
          }
        }
        return todo;
      })
    }
  }
})

export const {addTodos, removeTodos, updateTodos, completeTodos} = AddTodoReducer.actions;
export const reducer = AddTodoReducer.reducer;