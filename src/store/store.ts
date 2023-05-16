import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getTodos, todoSliceReducer } from '../components/todo/todoSlice';

const combinedReducers = combineReducers({
  todos:todoSliceReducer
})

export const store = configureStore({
  reducer:combinedReducers
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch : ()=> AppDispatch   = useDispatch;
export const useAppSelector : TypedUseSelectorHook<RootState>   = useSelector