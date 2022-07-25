import { useRouter } from "next/router"

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    )
}

const Header = () => {
    const router = useRouter()
    return (
        <div>
            <div onClick={() => router.push('/')}>
                Home
            </div>
        </div>
    )
}

const Footer = () => {
    return (
        <div>
            Footer
        </div>
    )
}

export default Layout