import { MOCKAPI } from "../helper/const"

export const getBanners = async () => {
    try {
        const banners = await fetch(`${MOCKAPI}/banners`)
            .then(res => res.json())
        return banners
    } catch (error) {
        console.warn(error);
    }
}
