import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const url = 'https://randomuser.me/api/?results=5'

export const fetchUsersAsync = createAsyncThunk (
        'users/fetchUsers',
        async (_, thunkAPI) => {
            try {
                const response = await fetch(url);
                console.log(response);
                if (!response.ok) {
                  throw new Error('Failed to fetch cart items');
                }
                const data = await response.json();
                return data;
              } catch (error) {
                return thunkAPI.rejectWithValue(error);
              }
        }
)



const usersSlice = createSlice ({
    name: 'users',
  initialState: {
    users: [],
    isLoading: false,
    error: undefined
  },
  extraReducers: (builder) => {

    builder.addCase(fetchUsersAsync.pending, (state) => {
        state.isLoading = true;
    });

    builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.results;
        console.log(state.users);
      });
      
      builder.addCase(fetchUsersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  } 
});

export const usersReducer = usersSlice.reducer;
export default usersSlice;
