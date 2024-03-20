import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Userervice,{ UserProps }  from './userService.ts'

  
  const initialState: any = {
    user: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };

//REGISTER User
export const deleteUserAction = createAsyncThunk(
    "/deleteUserAction",
    async ({id,token}:UserProps, thunkAPI: any,
    ) => {
      try {
        return await Userervice.deleteUser({id, token});
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
  
  export const deleteUserSlice = createSlice({
    name: "deleteUser",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.User = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(deleteUserAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteUserAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.user = action.payload.message;
        })
        
        .addCase(deleteUserAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = "Something Went Wrong";
          state.user = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = deleteUserSlice.actions;
  
  export default deleteUserSlice.reducer;