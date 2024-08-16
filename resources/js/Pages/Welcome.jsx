import AboutNexBlog from '@/Components/AboutNexBlog';
import Footer from '@/Components/Footer';
import GuestHeader from '@/Components/GuestHeader';
import JoinCommunity from '@/Components/JoinComuunity';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[1000px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                />
                <div className="relative min-h-screen selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full px-4 lg:px-[10rem]">
                        <GuestHeader auth={auth}/>

                        <main className="mt-16">
                            <div className="">
                                <div className='space-y-6 grid place-items-center text-center'>
                                    <h1 className='text-6xl text-white'>Welcome to NexBlog</h1>
                                    <p className='w-[50rem]'>
                                        Dive into the world of ideas, stories, and inspiration.
                                        At NexBlog, we bring together a community of curious minds
                                        eager to share their thoughts, experiences, and expertise.
                                        Whether you are here to explore new perspectives, stay updated
                                        with the latest trends, or simply find a moment of reflection,
                                        you have come to the right place.
                                    </p>
                                    <div className='space-x-4'>
                                        <Link href={route('register')} className='inline-block text-white bg-blue-800 px-4 py-2 rounded-md hover:bg-transparent border  hover:border-white transition-all duration-300'>
                                            Get Started
                                        </Link>
                                        <Link href={'/explore-blogs'} className='inline-block text-white border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition-all duration-300'>
                                            Explore Blogs
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>




                    </div>
                </div>

                <AboutNexBlog />

                <JoinCommunity />

                <Footer />
            </div>

        </>
    );
}
