import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';


const SoftwareCard = ({ software }) => (
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8 lg:w-1/3 md:w-1/2 sm:w-full">
        <div className="relative overflow-hidden shadow-md pb-80 mb-6 flex justify-center">
            <img src={software.featuredImage.url} alt="" className="object-center absolute h-full w-full max-w-xs object-cover  shadow-lg rounded-t-lg lg:rounded-lg" />
        </div>

        <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-teal-600 text-3xl font-semibold">
            <Link href={`/applications/${software.slug}`}>{software.title}</Link>
        </h1>
        <p className="text-gray-500 text-center mb-4">{software.exerpt}</p>
        <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
            <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
                <Image
                    unoptimized={true}
                    alt={software.author.name}
                    height="30px"
                    width="30px"
                    className="align-middle rounded-full"
                    src={software.author.photo.url}
                />
                <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{software.author.name}</p>
            </div>
            <div className="font-medium text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="align-middle">{moment(software.createdAt).format('MMM DD, YYYY')}</span>
            </div>
        </div>
        <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
            {software.excerpt}
        </p>
        {software.categories && <div className="flex flex-wrap justify-center">
            {software.categories.map((category, index) => (
                <div className="bg-gray-200 text-gray-700 p-2 m-2 rounded-full" key={index}>
                    #{category}
                </div>
            ))}
        </div>}

        <div className="text-center">
            <Link href={`/software/${software.slug}`}>
                <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-teal-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">Continue Reading</span>
            </Link>
        </div>
    </div>
);

export default SoftwareCard;