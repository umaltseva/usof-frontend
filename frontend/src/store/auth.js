import axios from '../axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const selectAuth = state => state.auth;

const register = createAsyncThunk('auth/register', async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post("/auth/register", user)
        return response.data;
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data);
        }
    }
});

const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post("/auth/login", credentials);
        return response.data;
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data);
        }
    }
});

const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/users/current");
        return response.data;
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data);
        }
    }
});

const updateCurrentUser = createAsyncThunk('auth/updateCurrentUser', async ({ userId, changes }, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`/users/${userId}`, changes);
        return response.data;
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data);
        }
    }
});

const updateCurrentAvatar = createAsyncThunk('auth/updateCurrentAvatar', async (avatar, { rejectWithValue }) => {
    try {
        const formData = new FormData();

        formData.append('avatar', avatar);

        const response = await axios.patch(`/users/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data);
        }
    }
});

const logout = createAsyncThunk('auth/logout', async () => {
    const response = await axios.post("/auth/logout");
    return response.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: null,
        success: false,
        logout: false
    },
    reducers: {
        resetLogout(state, action) {
            state.logout = false;
        }
    },
    extraReducers(builder) {
        builder.addCase(register.fulfilled, (state, { payload }) => {
            state.success = true;
            state.error = null;
        });

        builder.addCase(register.rejected, (state, { payload }) => {
            state.error = payload.error;
        });

        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.error = null;
            state.logout = false;
        });

        builder.addCase(login.rejected, (state, { payload }) => {
            state.error = payload.error;
        });

        builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.error = null;
        });

        builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
            state.error = payload.error;
        });

        builder.addCase(logout.fulfilled, (state, { payload }) => {
            state.user = null;
            state.logout = true;
        });

        builder.addCase(updateCurrentUser.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.error = null;
        });

        builder.addCase(updateCurrentUser.rejected, (state, { payload }) => {
            state.error = payload.error;
        });

        builder.addCase(updateCurrentAvatar.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.error = null;
        });

        builder.addCase(updateCurrentAvatar.rejected, (state, { payload }) => {
            state.error = payload.error;
        });
    }
})

const { resetLogout } = authSlice.actions;

export { selectAuth, register, login, getCurrentUser, updateCurrentUser, updateCurrentAvatar, logout, resetLogout };

export default authSlice.reducer;
