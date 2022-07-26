import { MOCKAPI } from "../../helper/const"

export const getArticles = async (limit) => {
    try {
        let url = `${MOCKAPI}/articles`
        if (limit) {
            url = `${MOCKAPI}/articles?page=1&limit=${limit}`
        }
        const articles = await fetch(url).then(res => res.json())
        return articles
    } catch (error) {
        console.warn(error);
    }
}

export const getDetailArticle = async (id) => {
    try {
        const article = await fetch(`${MOCKAPI}/articles/${id}`).then(res => res.json())
        return article
    } catch (error) {
        console.warn(error);
    }
}