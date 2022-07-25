import { useState } from "react"
import List from "../components/List"
import Search from "../components/Search"
import { getArticles } from "./api/articles"
import { getBanners } from "./api/banners"

const Home = ({ articles, banners }) => {

  const itemsBanner = JSON.parse(banners)

  const itemsArticle = JSON.parse(articles)
  const limit = 10
  const [loadItems, setLoadItems] = useState(false)
  const [num, setNum] = useState(limit)
  const [items, setItems] = useState(itemsArticle.slice(0, limit))
  const articleLength = itemsArticle.length
  const itemsLength = items?.length

  const handleSearch = keyword => {
    const searchResult = itemsArticle?.filter(item => item["title"]?.toLowerCase().includes(keyword.toLowerCase()))
    setItems(searchResult)
  }

  const handleGetItems = async position => {
    setLoadItems(true)
    await getArticles(position)
      .then(items => {
        setLoadItems(false)
        setItems(items)
        setNum(position)
      })
  }

  return (
    <div>
      <section>
        Main Banner
      </section>
      <section>
        <Search callback={keyword => handleSearch(keyword)} />
        <List items={items} />
        <button
          onClick={() => handleGetItems(itemsLength === articleLength ? limit : num + limit)}>
          {
            loadItems ? "load..."
              :
              <span>
                {itemsLength === articleLength ? "View Less" : "View More"}
              </span>
          }
        </button>
      </section>
    </div>
  )
}

export const getServerSideProps = async () => {
  try {
    const articles = await getArticles().then(items => (items))
    const banners = await getBanners().then(items => (items))
    return {
      props: {
        articles: JSON.stringify(articles),
        banners: JSON.stringify(banners)
      }
    };
  } catch (error) {
    // 
  }
}

export default Home