import { useState } from "react"
import Button from "./Button"

const Search = ({ callback }) => {
    const [keyword, setKeyword] = useState()
    return (
        <div className="flex">
            <input
                onChange={e => setKeyword(e.target.value)}
                onKeyDown={e => {
                    if (e.key === "Enter" && keyword) {
                        callback(keyword)
                    }
                }}
                maxLength={255}
                type="search"
                value={keyword}
                placeholder={`Search article`}
                className='w-full outline-none p-2 border text-2xl'
            />
            <Button onClick={() => {
                if (keyword) { callback(keyword) }
            }}>
                Search
            </Button>
        </div>
    )
}

export default Search