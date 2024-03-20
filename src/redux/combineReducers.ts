
import { combineReducers } from "@reduxjs/toolkit";
import {  //AUTH

  //USER
  registerUserReducer,
  getUserReducer,
  getUsersReducer,
  updateUserReducer,
  deleteUser} from "./combineImports.ts";

const reducers = combineReducers({
   //USERS REDUCERS 
    getUsers: getUsersReducer,
    registerUser: registerUserReducer,
    delete: deleteUser,
    getUser: getUserReducer,
    updateUser: updateUserReducer,
});

export { reducers };