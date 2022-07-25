import { useState } from "react"

const Search = ({ callback }) => {
    const [keyword, setKeyword] = useState()
    return (
        <div>
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
                placeholder={`Title`}
                className='w-full outline-none ml-2'
            />
            <button onClick={() => callback(keyword)}>Search</button>
        </div>
    )
}

export default Search