import { useState } from "react"
import { deleteComment, postComments, updateComment } from "../pages/api/comment"
import Button from "./Button"
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md"
import { Typography } from "./Typography";
import dayjs from "dayjs";

const Comments = ({ idArticle, items }) => {

    const [commentItems, setCommentItems] = useState(items)
    const [commentText, setCommentText] = useState()
    const [indexUpdate, setIndexUpdate] = useState()
    const [user, setUsername] = useState("")
    const [comment, setComment] = useState("")
    const [loadComment, setLoadComment] = useState(false)

    const handleDeleteComment = async item => {
        const newItems = commentItems.filter(i => i.id !== item.id)
        setCommentItems(newItems)
        await deleteComment(idArticle, item.id)
            .catch(error => console.warn(error))
    }

    const handleUpdateComment = async (idComment, data) => {
        let commentItem = commentItems.find(comment => comment.id === idComment)
        commentItem.comment = data.comment
        setCommentItems(commentItems)
        await updateComment(idArticle, idComment, data)
            .catch(error => console.warn(error))
    }

    const handlePostComment = async comment => {
        setLoadComment(true)
        await postComments(idArticle, comment)
            .then(response => {
                setCommentItems([...commentItems, response])
                setLoadComment(false)
                setUsername("")
                setComment("")
            })
            .catch(error => console.warn(error))
    }

    return (
        <>
            <div className="space-y-2 py-4">
                <input
                    className="border p-2 w-full text-2xl"
                    type="text"
                    value={user}
                    onChange={e => setUsername(e.target.value)} placeholder="Name (optional)" />
                <input
                    className="border p-2 w-full text-2xl"
                    type="text"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Comment" />
                <Button onClick={() => {
                    if (comment !== "") {
                        handlePostComment({ user, comment })
                    }
                }}>
                    {loadComment ? "Add..." : "Add"}
                </Button>
            </div>
            <div className="divide-y space-y-2 py-4">
                {
                    commentItems?.sort((a, b) => (a.id > b.id ? -1 : 1))
                        .map((item, index) => (
                            <div key={index} className="py-2">
                                <Typography
                                    className="capitalize"
                                    weight="medium"
                                    size="b1">
                                    {item.user}
                                </Typography>
                                <div>
                                    {
                                        indexUpdate === index ?
                                            <div className="flex space-x-2">
                                                <input
                                                    className="w-full border p-2 text-2xl"
                                                    type="text"
                                                    value={commentText}
                                                    onChange={e => setCommentText(e.target.value)} />
                                                <Button
                                                    onClick={() => {
                                                        if (commentText !== "") {
                                                            handleUpdateComment(item.id, {
                                                                user: item.user,
                                                                comment: commentText
                                                            })
                                                            setIndexUpdate(null)
                                                        }
                                                    }}>
                                                    Update
                                                </Button>
                                            </div>
                                            :
                                            <div>
                                                <Typography
                                                    className="block"
                                                    weight="light"
                                                    size="b1">
                                                    {item.comment}
                                                </Typography>
                                                <Typography
                                                    className="block text-gray-500"
                                                    weight="light"
                                                    size="b2">
                                                    {dayjs(item.createdAt).fromNow()}
                                                </Typography>
                                                <MdOutlineEdit
                                                    onClick={() => {
                                                        setIndexUpdate(index)
                                                        setCommentText(item.comment)
                                                    }}
                                                    className="inline cursor-pointer text-blue-500 w-6 h-6" />
                                                <MdDeleteOutline
                                                    className="inline cursor-pointer text-red-500 w-6 h-6"
                                                    onClick={() => handleDeleteComment(item)} />
                                            </div>
                                    }
                                </div>
                            </div>
                        ))
                }
            </div>
        </>
    )
}

export default Comments