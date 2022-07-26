import { useRouter } from "next/router"
import Comments from "../components/Comments"
import { Typography } from "../components/Typography"
import { getDetailArticle } from "./api/articles"
import { getComments } from "./api/comment"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { AiOutlineArrowLeft } from "react-icons/ai"
import Head from "next/head"
import Image from "next/image"
import APPNAME from "../helper/const"
dayjs.extend(relativeTime)

const Detail = ({ item, comments }) => {
    const router = useRouter()
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

    return (
        <>
            <Head>
                <title>{`${APPNAME} - ${title}`}</title>
            </Head>
            <div className="grid lg:grid-cols-3 gap-4">

                <section className="space-y-4 lg:col-span-2">
                    <div className="relative">
                        <Image
                            className="object-cover w-full h-96"
                            alt={title}
                            src={image} />
                        <AiOutlineArrowLeft
                            onClick={() => router.back()}
                            className="cursor-pointer absolute top-4 left-4 bg-blue-500 text-white rounded-full p-2 w-14 h-14" />
                    </div>
                    <div className="mx-4 space-y-4">
                        <h1>
                            <Typography
                                className="capitalize"
                                size="h1"
                                weight="black">
                                {title}
                            </Typography>
                        </h1>
                        <div className="flex space-x-2">
                            <Typography weight="medium">
                                {createBy}
                            </Typography>
                            <Typography weight="light">
                                - {dayjs(createdAt).fromNow()}
                            </Typography>
                        </div>
                        <p>
                            <Typography
                                size="b1">
                                {content}
                            </Typography>
                        </p>
                    </div>
                </section>

                <section className="p-4 bg-gray-100">
                    <h2>
                        <Typography
                            weight="medium"
                            size="h2">
                            Comments
                        </Typography>
                    </h2>
                    <p className="divide-y">
                        <Comments idArticle={id} items={articleComments} />
                    </p>
                </section>

            </div>
        </>
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