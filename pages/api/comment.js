import { MOCKAPI } from "../helper/const"

export const getComments = async (id) => {
    try {
        const comments = await fetch(`${MOCKAPI}/articles/${id}/comments`)
            .then(res => res.json())
        return comments
    } catch (error) {
        console.warn(error);
    }
}

export const postComments = async (id, data) => {
    try {
        const comments = await fetch(`${MOCKAPI}/articles/${id}/comments`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: data.user || "Anonymous",
                comment: data.comment
            })
        })
            .then(res => res.json())
        return comments
    } catch (error) {
        console.warn(error);
    }
}

export const deleteComment = async (id, idComment) => {
    try {
        const comments = await fetch(`${MOCKAPI}/articles/${id}/comments/${idComment}`, {
            method: "DELETE"
        })
            .then(res => res.json())
        return comments
    } catch (error) {
        console.warn(error);
    }
}

export const updateComment = async (id, idComment, data) => {
    try {
        const comments = await fetch(`${MOCKAPI}/articles/${id}/comments/${idComment}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: data.user,
                comment: data.comment
            })
        })
            .then(res => res.json())
        return comments
    } catch (error) {
        console.warn(error);
    }
}