import Layout from '../components/Layout'
import '../styles/nprogress.css'
import '../styles/styles.css'

import nProgress from 'nprogress'
import Router from "next/router"

Router.events.on("routeChangeStart", nProgress.start)
Router.events.on("routerChangeError", nProgress.done)
Router.events.on("routeChangeComplete", nProgress.done)

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
