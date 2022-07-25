import Comments, { PostComment } from "../components/Comments";
import { getDetailArticle } from "./api/articles"
import { getComments, postComments } from "./api/comment";

const Detail = ({ item, comments }) => {
    const detail = JSON.parse(item)
    const articleComments = JSON.parse(comments)
    const {
        id,
        createdAt,
        title,
        image,
        content,
        createBy
    } = detail

    const handlePostComment = async (comment) => {
        await postComments(id, comment).then((response) => {
            console.warn(response);
        })
    }

    return (
        <div>

            <section>
                <h1>{title}</h1>
                <img src={image} />

                <div>{content}</div>
                <div>{createdAt}</div>
                <div>{createBy}</div>
                <hr />
            </section>
            <section>
                <PostComment onPost={data => {
                    handlePostComment(data)
                }} />
                {
                    articleComments.length > 0 &&
                    <>
                        <h2>Comments</h2>
                        <Comments idArticle={id} items={articleComments} />
                    </>
                }
            </section>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    try {
        const id = context.query.id
        const article = await getDetailArticle(id)
            .then(item => (item))
        const comments = await getComments(id)
            .then(items => (items))
        if (!article) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/'
                }
            }
        }
        return {
            props: {
                item: JSON.stringify(article),
                comments: JSON.stringify(comments)
            }
        };
    } catch (error) {
        // 
    }
}

export default Detail