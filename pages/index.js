import { useEffect, useRef, useState } from "react"
import Banner from "../components/Banner"
import List from "../components/List"
import Search from "../components/Search"
import { getArticles } from "./api/articles"
import { getBanners } from "./api/banners"
import { AiOutlineArrowUp, AiOutlineLoading3Quarters } from "react-icons/ai"
import { Typography } from "../components/Typography"
import Head from "next/head"
import APPNAME from "../helper/const"

const Home = ({ articles, banners }) => {

  const itemsBanner = JSON.parse(banners)
  const itemsArticle = JSON.parse(articles)
  const limit = 10
  const [isSearch, setIsSearch] = useState(false)
  const [loadItems, setLoadItems] = useState(false)
  const [num, setNum] = useState(limit)
  const [items, setItems] = useState(itemsArticle.slice(0, limit))
  const [scrollPosition, setScrollPosition] = useState(0);

  const articleLength = itemsArticle.length
  const itemsLength = items?.length

  const topRef = useRef(null)

  const scrollToTop = () => topRef.current.scrollIntoView({ behavior: 'smooth' })

  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleSearch = keyword => {
    const searchResult = itemsArticle?.filter(item => item["title"]?.toLowerCase().includes(keyword.toLowerCase()))
    setItems(searchResult)
    setIsSearch(true)
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
    <>
      <Head>
        <title>{`${APPNAME} - Home`}</title>
      </Head>
      <div className="space-y-8 m-4 sm:m-0" ref={topRef}>
        <section>
          <Banner items={itemsBanner} />
        </section>
        <section className="space-y-8">
          <Search callback={keyword => handleSearch(keyword)} />
          <List items={items} />
          {
            !isSearch &&
            <div
              className="mx-auto w-max border border-blue-500 p-4 cursor-pointer"
              onClick={() => handleGetItems(itemsLength === articleLength ? limit : num + limit)}>
              {
                loadItems ?
                  <AiOutlineLoading3Quarters className="text-blue-600 animate-spin w-4 h-4 inline" />
                  :
                  <Typography
                    className="text-blue-500"
                    weight="black"
                    size="b1">
                    {itemsLength === articleLength ? "View Less" : "View More"}
                  </Typography>
              }
            </div>
          }
        </section>
        {
          scrollPosition > 500 &&
          <AiOutlineArrowUp
            onClick={() => scrollToTop()}
            className="cursor-pointer fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-2 w-14 h-14" />
        }
      </div>
    </>
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