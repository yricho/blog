import Link from "next/link"
import { Typography } from "./Typography"

const Card = ({ item }) => {
    const { id, title, image, previewContent } = item
    return (
        <div className="border">
            <img
                alt={title}
                className="object-cover w-full h-64"
                src={image} />
            <div className="p-4">
                <h1>
                    <Typography
                        className="capitalize line-clamp-1"
                        weight="medium"
                        size="h2">
                        {title}
                    </Typography>
                </h1>
                <p className="justify-between sm:space-x-4 sm:flex">
                    <div>
                        <Typography
                            className="line-clamp-1"
                            weight="light"
                            size="b1">
                            {previewContent}
                        </Typography>
                    </div>
                    <Link href={`/${id}`}>
                        <a className="cursor-pointer underline whitespace-nowrap text-blue-500 font-black">
                            <Typography
                                size="b1">
                                Read More
                            </Typography>
                        </a>
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Card