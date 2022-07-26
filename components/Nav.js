import Link from "next/link"
import { AiFillHome } from "react-icons/ai"

const Nav = () => {
    return (
        <div className="bg-gray-800 sticky top-0 z-50">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <Link href="/">
                                <AiFillHome className="w-8 h-8" />
                            </Link>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:block">
                            <Link href="/">
                                <a className="underline text-white uppercase font-medium" aria-current="page">
                                    Home
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav