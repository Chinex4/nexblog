// import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';

export default function BlogFeature({ title, description}) {
    

    return (
        <div className='space-y-2'>
            <h3 className='text-2xl text-white font-semibold'>
                {title}
            </h3>
            <p>
                {description}
            </p>
        </div>
    );
}
