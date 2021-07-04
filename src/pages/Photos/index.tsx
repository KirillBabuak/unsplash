import React, {useEffect} from 'react';
import routes from "../../constants/route.constants";
import {useTypedSelector} from "../../types/redux.types";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {clearPhotosAC, fetchPhotos} from "../../reducers/photos.reducer";
import Search from "./Search";
import List from "./List";
import {PageHeader, Button} from 'antd';
import {logOut} from '../../reducers/main.reducer';

const Photos = (): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();
    const access_token = useTypedSelector((state) => state.main.access_token);

    useEffect(() => {
        if (!access_token) {
            history.push(routes.basePath);
            return;
        }

        dispatch(fetchPhotos())
    }, [access_token, dispatch, history])

    const onHandleLogOut = () => {
        dispatch(logOut())
        dispatch(clearPhotosAC())

        history.push(routes.auth);
    }

    return <>
        {access_token && <>
            <PageHeader
                extra={[
                    <Button onClick={onHandleLogOut}>Log out</Button>,
                ]}
            />
            <div className={'photos'}>
                <Search/>
                <List/>
            </div>
        </>}
    </>;
}

export default Photos;
