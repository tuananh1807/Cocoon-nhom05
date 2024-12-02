import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../redux/slides/counterSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
})