import { reducers } from "./combineReducers.ts";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: reducers });

export default store;
