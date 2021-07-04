import React, {useEffect} from 'react';
import {Button} from 'antd';
import {useDispatch} from "react-redux";
import {baseURL} from "../../constants/global.constants";
import {auth} from "../../reducers/main.reducer";
import {useHistory, useLocation} from "react-router-dom";
import routes from "../../constants/route.constants";
import {useTypedSelector} from "../../types/redux.types";

const Auth = (): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const code = query.get('code');
    const client_id = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
    const redirect_uri = process.env.REACT_APP_UNSPLASH_REDIRECT_URL
    const logInUrl = `${baseURL}/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&cope=public+read_photos+write_likes`
    const access_token = useTypedSelector((state) => state.main.access_token);

    useEffect(() => {
        if (access_token) {
            history.push(routes.basePath);
        }
    }, [access_token, dispatch, history])

    useEffect(() => {
        if (!access_token && code) {
            dispatch(auth(code))
            history.push(routes.basePath);
        }
    }, [code, dispatch, access_token, history])

    return <div>
        {!access_token && <div className={'auth-container'}>
            <a href={logInUrl}>
                <Button type="primary">
                    Log In
                </Button>
            </a>
            <a href={baseURL}>
                <Button type="primary" danger>
                    Registration
                </Button>
            </a>
        </div>}
    </div>;
}

export default Auth;
