import React, {useEffect} from 'react';
import routes from "../../constants/route.constants";
import {useHistory} from "react-router-dom";
import {useTypedSelector} from "../../types/redux.types";

const Home = (): JSX.Element => {
    const history = useHistory();
    const {auth, photos, notAuthorized} = routes;
    const {access_token, loading, error} = useTypedSelector((state) => state.main);

    useEffect(() => {
        if (loading) {
            return;
        }
        if (error) {
            history.push(notAuthorized);
        } else if (!access_token) {
            history.push(auth);
        } else {
            history.push(photos);
        }
    }, [loading, auth, photos, notAuthorized, access_token, error, history]);

    return <div/>;
}

export default Home;
