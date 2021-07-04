import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {mainReducer} from "./main.reducer";
import {photosReducer} from "./photos.reducer";

const rootReducer = combineReducers({
    main: mainReducer,
    photos: photosReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export type AppDispatch = typeof store.dispatch
