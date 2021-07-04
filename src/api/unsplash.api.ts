import axios from "axios";
import {
    IChangePhotoLikeRequest,
    IFetchPhotosQuery,
    IGetPhotosResponse,
    IPhotoInfo
} from "../interfaces/unsplash.interface";
import qs from "qs";
import {getTokens} from "../helpers/localstorage.helper";

const instance = axios.create({
    baseURL: 'https://api.unsplash.com',
})

class UnsplashApi {

    async fetchPhotos(params: IFetchPhotosQuery): Promise<IGetPhotosResponse> {
        const queryParams = qs.stringify(params, {encode: false});

        return instance
            .get(`/search/photos?${queryParams}`)
            .then(response => response.data)
    }

    async changeLikePhoto({id, isLiked}: IChangePhotoLikeRequest): Promise<IPhotoInfo> {
        const url = `/photos/${id}/like`;
        const [token] = getTokens();

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }

        if (isLiked) {
            return instance.post(url, {}, config)
        }

        return instance.delete(url, config)
            .then(response => response.data)
    }
}

export const unsplashAPI = new UnsplashApi();