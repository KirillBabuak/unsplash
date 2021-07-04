import React from "react";
import {Gallery} from "react-photoswipe-gallery";
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import {useTypedSelector} from "../../types/redux.types";
import Photo from "./Photo";

const List = (): JSX.Element => {
    const list = useTypedSelector((state) => state.photos.list);

    if (!list.length) {
        return <p className={'info'}> Please, start your search... </p>
    }

    return (
        <Gallery>
            <div className="photos-container">
                {list.map(photo => <Photo key={photo.id} data={photo}/>)}
            </div>
        </Gallery>
    )
}

export default List;