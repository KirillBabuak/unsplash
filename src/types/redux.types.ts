import {useSelector, TypedUseSelectorHook} from 'react-redux';
import {AppStateType} from "../reducers/store";

export const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector;