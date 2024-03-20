import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import userService from './userService.ts'

  const initialState: any = {
    users: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };


export const getUsersAction = createAsyncThunk(
    "/getUserAction",
    async (thunkAPI: any,
    ) => {
      try {
        return await userService.getUsers();
      } catch (error: any) {
                   const message =
              (error.response &&
                error.response.data &&
                error.response.data.error) ||
              error.message || error.error
              error.toString();
            toast.warning(`${message}`);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
  
  export const getUsersSlice = createSlice({
    name: "getUser",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.users = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getUsersAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(getUsersAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.users = action.payload.data;
        })
        
        .addCase(getUsersAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload || "Something went wrong";
          state.users = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = getUsersSlice.actions;
  
  export default getUsersSlice.reducer;