import Nav from "./Nav"
import { Typography } from "./Typography"

const Layout = ({ children }) => {
    return (
        <div>
            <Nav />
            <div className="max-w-screen-xl mx-auto">
                {children}
            </div>
            <Footer />
        </div>
    )
}

const Footer = () => {
    return (
        <footer className="h-20 flex items-center justify-center">
            <Typography
                className="text-gray-700">
                &copy; {new Date().getFullYear()} All Rights Reserved.
            </Typography>
        </footer>
    )
}

export default Layout