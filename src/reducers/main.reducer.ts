import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IAuthResponse} from "../interfaces/unsplash.interface";
import {cleanStorage, getTokens, setTokens} from "../helpers/localstorage.helper";
import {authUnsplashAPI} from "../api/auth.api";

export type InitialState = {
    access_token: string,
    refresh_token: string,
    loading: boolean,
    error: string | null
}

const initialState: InitialState = {
    access_token: '',
    refresh_token: '',
    loading: false,
    error: null,
};

export const auth = createAsyncThunk(
    'unsplash/auth',
    async (authCode: string, {rejectWithValue}): Promise<IAuthResponse | Error> => {
        try {
            return await authUnsplashAPI.auth(authCode)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        initialize(state: InitialState) {
            const [access_token, refresh_token] = getTokens();

            state.access_token = access_token;
            state.refresh_token = refresh_token;
        },
        logOut(state: InitialState) {
            cleanStorage()

            return initialState
        },
    },
    extraReducers: builder => {
        builder.addCase(auth.fulfilled, (state, action) => {
            const {access_token, refresh_token} = action.payload as IAuthResponse

            state.access_token = access_token;
            state.refresh_token = refresh_token;
            state.loading = false;

            setTokens(access_token, refresh_token)
        })
        builder.addCase(auth.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        })
        builder.addCase(auth.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
    }
});

export const mainReducer = mainSlice.reducer;
export const {initialize, logOut} = mainSlice.actions;
