import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {defaultPageSize} from '../constants/global.constants';
import {
    IChangePhotoLikeRequest,
    IFetchPhotosQuery,
    IGetPhotosResponse,
    IPhotoInfo
} from "../interfaces/unsplash.interface";
import {AppStateType} from './store';
import {unsplashAPI} from "../api/unsplash.api";

export type InitialState = {
    list: IPhotoInfo[],
    search: string,
    currentPage: number,
    currentSize: number,
    allCount: number;
    error: string | null
    loading: boolean
}

const initialState: InitialState = {
    list: [],
    search: '',
    currentPage: 1,
    currentSize: defaultPageSize,
    allCount: 0,
    error: null,
    loading: false
};

export const fetchPhotos = createAsyncThunk(
    'photos/fetchPhotos',
    async (anyData, {rejectWithValue, getState}): Promise<IGetPhotosResponse | Error> => {
        try {
            const {photos} = getState() as AppStateType;
            const {search, currentSize, currentPage} = photos;

            const params: IFetchPhotosQuery = {
                page: currentPage,
                per_page: currentSize,
                client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY || '',
                query: search,
            }

            return unsplashAPI.fetchPhotos(params)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const setSearch = createAsyncThunk(
    'photos/setSearch',
    async (search: string, {rejectWithValue, dispatch, getState}) => {
        try {
            const {photos} = getState() as AppStateType;
            const {search: currentSearchValue} = photos;

            if (currentSearchValue === search) {
                return;
            }

            dispatch(setSearchAC(search))
            dispatch(fetchPhotos())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const changePhotoLike = createAsyncThunk(
    'photos/changePhotoLike',
    async (payload: IChangePhotoLikeRequest, {rejectWithValue}) => {
        try {
            return unsplashAPI.changeLikePhoto(payload)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        setPhotos(state: InitialState, action: PayloadAction<{ list: IPhotoInfo[] }>) {
            state.list = action.payload.list;
        },
        setSearchAC(state: InitialState, action: PayloadAction<string>) {
            state.search = action.payload;
        },
        setPageAC(state: InitialState) {
            state.currentPage = +1;
        },
        clearPhotosAC(state: InitialState) {
            return initialState
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchPhotos.fulfilled, (state, action) => {
            const {total, results} = action.payload as IGetPhotosResponse

            state.list = state.currentPage === 1 ? results : [...state.list, ...results];
            state.allCount = total;
            state.loading = false;
        })
        builder.addCase(fetchPhotos.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        })
        builder.addCase(fetchPhotos.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(changePhotoLike.fulfilled, (state, action) => {
            const updatedPhoto = action.payload as IPhotoInfo;

            state.list.map(photo => photo.id === updatedPhoto.id ? updatedPhoto : photo);
            state.loading = false;
        })
        builder.addCase(changePhotoLike.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        })
        builder.addCase(changePhotoLike.pending, (state, action) => {
            state.loading = true;
        })
    }
});

export const photosReducer = photosSlice.reducer;
export const {setSearchAC, setPageAC, clearPhotosAC} = photosSlice.actions;