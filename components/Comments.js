import { useState } from "react";
import { deleteComment, updateComment } from "../pages/api/comment";

const Comments = ({ idArticle, items }) => {

    const [commentText, setCommentText] = useState()
    const [indexUpdate, setIndexUpdate] = useState()

    const handleDeleteComment = async (idComment) => {
        await deleteComment(idArticle, idComment).then(response => {
            console.warn(response);
        })
    }

    const handleUpdateComment = async (idComment, data) => {
        await updateComment(idArticle, idComment, data).then(response => {
            console.warn(response);
        })
    }

    return (
        <div style={{
            border: "solid 1px"
        }}>
            {items?.map((item, index) => (
                <div key={index}>
                    <div>
                        <strong>
                            {item.user}
                        </strong>
                    </div>
                    <div>
                        {
                            indexUpdate === index ?
                                <input
                                    type="text"
                                    value={commentText}
                                    onChange={e => setCommentText(e.target.value)} />
                                :
                                <div onClick={() => {
                                    setIndexUpdate(index)
                                    setCommentText(item.comment)
                                }
                                }>
                                    {item.comment}
                                </div>
                        }
                    </div>
                    <button
                        onClick={() => {
                            handleUpdateComment(item.id, {
                                user: item.user,
                                comment: commentText
                            })
                            // setIndexUpdate(null)
                        }}>
                        Update
                    </button>
                    <button onClick={() => handleDeleteComment(item.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export const PostComment = ({ onPost }) => {

    const [user, setUsername] = useState("")
    const [comment, setComment] = useState("")
    return (
        <div>
            <input type="text" value={user} onChange={e => setUsername(e.target.value)} placeholder="Anonymous" />
            <input type="text" value={comment} onChange={e => setComment(e.target.value)} placeholder="Your comment" />
            <button onClick={() => onPost({ user, comment })}>Create</button>
        </div>
    )
}

export default Comments