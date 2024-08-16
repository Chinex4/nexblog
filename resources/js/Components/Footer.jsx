
import { Link } from "@inertiajs/react"

export default function Footer() {
    return (
        <footer className='relative w-full px-4 lg:px-[10rem] py-10 mt-16'>
            <h1 className='text-3xl text-white font-bold'>
                NexBlog
            </h1>
            <div className='mt-8 w-[300px] grid grid-cols-2 gap-3'>
                <Link className='block hover:text-white cursor-pointer'>Home</Link>
                <Link href={route('login')} className='block hover:text-white cursor-pointer'>Login</Link>
                <Link href={'/explore-blogs'} className='block hover:text-white cursor-pointer'>Explore Blogs</Link>
                <Link href={route('register')} className='block hover:text-white cursor-pointer'>Join Community</Link>
                <Link href={'mailto:createverse4@gmail.com'} className='block hover:text-white cursor-pointer'>Contact Support</Link>
            </div>

            <p className='mt-4 text-center'>&copy;Copyright NexBlog 2024</p>
        </footer>
    )
}