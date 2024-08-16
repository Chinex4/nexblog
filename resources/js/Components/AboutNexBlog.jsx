import { blogFeatures } from "@/data"
import BlogFeature from "./BlogFeature"

export default function AboutNexBlog() {
    return (
        <section className='relative w-full px-4 lg:px-[10rem] py-10'>
            <h1 className='text-white text-center text-4xl font-semibold uppercase'>What You'll Find on NexBlog:</h1>

            <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    blogFeatures.map((feature) => {
                        return <BlogFeature key={feature.title} {...feature} />
                    })
                }
            </div>
        </section>
    )
}