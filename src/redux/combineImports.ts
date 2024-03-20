
import getUsersReducer from "./Features/user/getUsersSlice.ts";
import registerUserReducer from "./Features/user/registerUserSlice.ts";
import deleteUser from "./Features/user/deleteUserSlice.ts";
import getUserReducer from "./Features/user/getUserSlice.ts";
import updateUserReducer from "./Features/user/updateUserSlice.ts";


export { 
    //USER
    registerUserReducer,
    getUserReducer,
    getUsersReducer,
    deleteUser,
    updateUserReducer
    
}

