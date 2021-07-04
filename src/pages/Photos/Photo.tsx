import React, {FC} from "react";
import {Item} from "react-photoswipe-gallery";
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import {IPhotoInfo} from "../../interfaces/unsplash.interface";
import {HeartTwoTone} from '@ant-design/icons';
import {useDispatch} from "react-redux";
import {changePhotoLike} from "../../reducers/photos.reducer";

interface IProps {
    data: IPhotoInfo,
}

const Photo: FC<IProps> = ({data}): JSX.Element => {
    const dispatch = useDispatch();
    const {width, height, urls, liked_by_user, id} = data;
    const {full, small} = urls;

    const onChangeLike = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        dispatch(changePhotoLike({id, isLiked: !liked_by_user}));
    };

    return (
        <Item
            original={full}
            thumbnail={small}
            width={width}
            height={height}
        >
            {({ref, open}) => (
                <div className="photo-container" ref={ref as React.MutableRefObject<HTMLImageElement>} onClick={open}
                     style={{backgroundImage: `url(${small})`}}>
                    <div className="photo" onClick={onChangeLike}>
                        <HeartTwoTone className={`like ${liked_by_user ? 'active' : ''}`}/>
                    </div>
                </div>
            )}
        </Item>
    )
}

export default Photo;