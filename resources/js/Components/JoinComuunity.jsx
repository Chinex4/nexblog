
import { Link } from "@inertiajs/react"

export default function JoinCommunity() {
    return (
        <section className='relative w-full px-4 lg:px-[10rem] py-10 mt-16'>
            <div className="">
                <div className='space-y-6 lg:text-center'>
                    <h1 className='text-4xl text-white'>Join Our Community</h1>
                    <p className=''>
                        Become a part of NexBlog today and never miss out on the latest posts. Subscribe to our newsletter for weekly updates delivered straight to your inbox. Let's embark on this journey of discovery together!
                    </p>
                    <div className='space-x-4'>
                        <Link href={route('register')} className='inline-block px-4 py-2 text-white transition-all duration-300 border border-white rounded-md hover:bg-white hover:text-black'>
                            Join Community
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}