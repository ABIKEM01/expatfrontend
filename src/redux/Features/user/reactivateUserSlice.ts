import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import UserService,{ UserProps }  from './userService'



  
  const initialState: any = {
    loading: false,
    error: false,
    success: false,
    message: "",
  };

//REGISTER User
export const reactivateUserAction = createAsyncThunk(
    "/reactivateUserAction",
    async ({id,token}:UserProps, thunkAPI: any,
    ) => {
      try {
        return await UserService.reactivateUser({id, token});
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
  
  export const reactivateUserSlice = createSlice({
    name: "reactivateUser",
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
        .addCase(reactivateUserAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(reactivateUserAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.message = action.payload.message;
        })
        
        .addCase(reactivateUserAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = "Something Went Wrong";
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = reactivateUserSlice.actions;
  
  export default reactivateUserSlice.reducer;