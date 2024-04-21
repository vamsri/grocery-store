/* eslint-disable */
import React, { useRef } from 'react';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';  // For outline icons

function Sample() {
    const scrollContainer = useRef(null);

    const scrollLeft = () => {
        if (scrollContainer.current) {
            scrollContainer.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainer.current) {
            scrollContainer.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };
    const people = [
        {
            name: 'Vamsi Vangari',
            role: 'Software Architect',
            imageUrl:
                'https://res.cloudinary.com/dwnik4k9e/image/upload/v1713075930/samples/pyugab3qdtd1vwuxp3vm.png',
            xUrl: '#',
            linkedinUrl: '#',
        },
        {
            name: 'Whitney Francis',
            role: 'Copywriter',
            imageUrl:
                'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
            xUrl: '#',
            linkedinUrl: '#',
        },
        {
            name: 'Whitney Francis',
            role: 'Copywriter',
            imageUrl:
                'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
            xUrl: '#',
            linkedinUrl: '#',
        },
        // More people...
    ]
    return (
        <div className="grid gap-1 m-2">
            <div className="h-100 bg-slate-200">Row 2</div>

            <div className="relative h-840 w-full">
                <div ref={scrollContainer} className="w-full h-full flex overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        src="https://res.cloudinary.com/dwnik4k9e/image/upload/v1708341618/samples/landscapes/beach-boat.jpg"
                    />
                    <img
                        className="w-full h-full object-cover"
                        src="https://res.cloudinary.com/dwnik4k9e/image/upload/v1708341612/samples/food/fish-vegetables.jpg"
                    />
                    <img
                        className="w-full h-full object-cover"
                        src="https://res.cloudinary.com/dwnik4k9e/image/upload/v1708341618/samples/landscapes/beach-boat.jpg"
                    />
                    <img
                        className="w-full h-full object-cover"
                        src="https://res.cloudinary.com/dwnik4k9e/image/upload/v1708341612/samples/food/fish-vegetables.jpg"
                    />
                </div>
                <div className="absolute top-1/2 left-5 right-0 bottom-0" onClick={scrollLeft}>
                    <ChevronDoubleLeftIcon className="h-12 w-12 text-white" />
                </div>
                <div className="absolute top-1/2 left-100 right-5 bottom-0" onClick={scrollRight}>
                    <ChevronDoubleRightIcon className="h-12 w-12 text-white" />
                </div>
            </div>
            <div className="h-360 bg-slate-200">Row 2</div>
            <div className="h-240 bg-red-400">Row 3</div>
            <div className="h-800 overflow-y-scroll">
                <div className="bg-white py-32">
                    <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
                        <div className="mx-auto max-w-2xl">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our team</h2>
                            <p className="mt-4 text-lg leading-8 text-gray-600">
                                We’re a dynamic group of individuals who are passionate about what we do.
                            </p>
                        </div>
                        <ul
                            role="list"
                            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                        >
                            {people.map((person) => (
                                <li key={person.name}>
                                    <img className="mx-auto h-56 w-56 rounded-full" src={person.imageUrl} alt="" />
                                    <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                                    <p className="text-sm leading-6 text-gray-600">{person.role}</p>
                                    <ul role="list" className="mt-6 flex justify-center gap-x-6">
                                        <li>
                                            <a href={person.xUrl} className="text-gray-400 hover:text-gray-500">
                                                <span className="sr-only">X</span>
                                                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href={person.linkedinUrl} className="text-gray-400 hover:text-gray-500">
                                                <span className="sr-only">LinkedIn</span>
                                                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="h-240 bg-purple-500">
                <footer className="bg-gray-800 text-white py-8">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <h2 className="text-lg font-semibold">Contact Us</h2>
                                <ul className="mt-4 space-y-3">
                                    <li>1234 Street Rd, Suite 1234</li>
                                    <li>New York, NY 10001</li>
                                    <li>Phone: (123) 456-7890</li>
                                    <li>Email: contact@example.com</li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">Quick Links</h2>
                                <ul className="mt-4 space-y-3">
                                    <li><a href="/about" className="hover:underline">About Us</a></li>
                                    <li><a href="/services" className="hover:underline">Services</a></li>
                                    <li><a href="/blog" className="hover:underline">Blog</a></li>
                                    <li><a href="/contact" className="hover:underline">Contact</a></li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">Follow Us</h2>
                                <div className="mt-4 flex space-x-4">
                                    <a href="#" className="hover:text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 w-6" viewBox="0 0 24 24">
                                            {/* <!-- Facebook Icon --> */}
                                            <path d="M22.675 0h-21.35C.594 0 0 .594 0 1.325v21.35C0 23.406.594 24 1.325 24h11.348v-9.293H9.294V10.705h3.379V8.086c0-3.354 2.05-5.181 5.041-5.181 1.434 0 2.667.107 3.025.155v3.51l-2.076.001c-1.629 0-1.943.774-1.943 1.908v2.506h3.885l-.506 3.002h-3.379V24h6.631c.731 0 1.325-.594 1.325-1.325v-21.35C24 .594 23.406 0 22.675 0z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="hover:text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 w-6" viewBox="0 0 24 24">
                                            {/* <!-- Twitter Icon --> */}
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.194-.897-.957-2.178-1.555-3.594-1.555-2.718 0-4.92 2.203-4.92 4.92 0 .386.044.762.126 1.123-4.09-.205-7.719-2.164-10.144-5.144-.424.722-.666 1.56-.666 2.457 0 1.696.863 3.192 2.173 4.07-.803-.025-1.556-.246-2.228-.616v.062c0 2.367 1.684 4.338 3.918 4.785-.41.111-.841.171-1.287.171-.314 0-.619-.029-.917-.085.619 1.933 2.417 3.341 4.554 3.383-1.668 1.307-3.765 2.084-6.045 2.084-.392 0-.779-.023-1.158-.067 2.158 1.384 4.722 2.192 7.478 2.192 8.976 0 13.88-7.436 13.88-13.88 0-.211 0-.422-.015-.632.953-.688 1.78-1.549 2.436-2.533z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="hover:text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 w-6" viewBox="0 0 24 24">
                                            {/* <!-- Instagram Icon --> */}
                                            <path d="M7.75 0C3.47 0 0 3.47 0 7.75V16.25C0 20.53 3.47 24 7.75 24H16.25C20.53 24 24 20.53 24 16.25V7.75C24 3.47 20.53 0 16.25 0H7.75ZM21.85 16.25C21.85 19.15 19.15 21.85 16.25 21.85H7.75C4.85 21.85 2.15 19.15 2.15 16.25V7.75C2.15 4.85 4.85 2.15 7.75 2.15H16.25C19.15 2.15 21.85 4.85 21.85 7.75V16.25Z" />
                                            <path d="M12 5.55C8.51 5.55 5.55 8.51 5.55 12C5.55 15.49 8.51 18.45 12 18.45C15.49 18.45 18.45 15.49 18.45 12C18.45 8.51 15.49 5.55 12 5.55ZM12 16.15C9.75 16.15 7.85 14.25 7.85 12C7.85 9.75 9.75 7.85 12 7.85C14.25 7.85 16.15 9.75 16.15 12C16.15 14.25 14.25 16.15 12 16.15Z" />
                                            <path d="M18.41 4.94996C18.05 4.94996 17.74 5.25996 17.74 5.61996C17.74 5.97996 18.05 6.28996 18.41 6.28996C18.77 6.28996 19.08 5.97996 19.08 5.61996C19.08 5.25996 18.77 4.94996 18.41 4.94996Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    );
}

export default Sample;
