export interface IObject {
    [key: string]: any
}

export interface IAuthResponse {
    "access_token": string,
    "refresh_token": string,
    "token_type": string,
    "scope": string,
    "created_at": number
}

export interface IFetchPhotosQuery {
    query: string,
    page: number,
    per_page: number,
    client_id: string,
}

export interface IGetPhotosResponse {
    total: number,
    total_pages: number,
    results: IPhotoInfo[],
}

export interface IPhotoInfo {
    "id": string,
    "created_at": string,
    "width": number,
    "height": number,
    "color": string,
    "blur_hash": string,
    "likes": number,
    "liked_by_user": boolean,
    "description": string,
    "user": {
        "id": string,
        "username": string,
        "name": string,
        "first_name": string,
        "last_name": string,
        "instagram_username": string,
        "twitter_username": string,
        "portfolio_url": string,
        "profile_image": {
            "small": string,
            "medium": string,
            "large": string,
        },
        "links": {
            "self": string,
            "html": string,
            "photos": string,
            "likes": string,
        }
    },
    "urls": {
        "raw": string,
        "full": string,
        "regular": string,
        "small": string,
        "thumb": string,
    },
    "links": {
        "self": string,
        "html": string,
        "download": string,
    }
}

export interface IChangePhotoLikeRequest {
    id: string,
    isLiked: boolean
}