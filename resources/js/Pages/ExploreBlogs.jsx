import AboutNexBlog from '@/Components/AboutNexBlog';
import Blogs from '@/Components/Blogs';
import Footer from '@/Components/Footer';
import GuestHeader from '@/Components/GuestHeader';
import { Link, Head } from '@inertiajs/react';

export default function ExploreBlogs({ auth, blogs }) {
    
    return (
        <>
            <Head title="Explore Blogs" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[1000px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                />
                <div className="relative min-h-screen selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full px-4 lg:px-[10rem]">
                        <GuestHeader auth={auth}/>

                        <main className="py-16">
                            <h1 className='text-4xl font-bold text-center text-white'>Latest Blogs</h1>
                            <Blogs blogs={blogs} auth={auth}/>
                        </main>
                    </div>
                </div>

                <Footer />

            </div>

        </>
    );
}
