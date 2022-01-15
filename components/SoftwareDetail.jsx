import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import Prism from 'prismjs';
import { Tooltip } from '@mui/material';

const softwareDetail = ({ software }) => {
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
        <div className="relative overflow-hidden shadow-md mb-6">
          <img src={software.featuredImage.url} alt="" className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg" />
        </div>

        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full">
            <div className="hidden md:flex justify-center lg:mb-0 lg:w-auto mr-8 items-center">
              <img
                alt={software.author.name}
                height="30px"
                width="30px"
                className="align-middle rounded-full"
                src={software.author.photo.url}
              />
              <Tooltip title={`Bio- ${software.author.bio}`}>
                <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{software.author.name}</p>
              </Tooltip>
            </div>
            <div className='flex-1' />
            <Tooltip title={`Updated on - ${moment(software.updatedAt).format('MMM DD, YYYY')}`}>
              <div className="font-medium text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="align-middle">Published On - {moment(software.createdAt).format('MMM DD, YYYY')}</span>
              </div>
            </Tooltip>
          </div>
          <h1 className="mb-8 text-3xl font-semibold text-center">Title - {software.title}</h1>
          <p className="text-gray-500 text-center my-4">Small Description - {software.exerpt}</p>
          <h1 className="text-2xl text-center my-16 break-all">Description - {software.desc}</h1>
          <h1 className="text-xl font-semibold mb-4 mx-auto  max-w-xs text-center">Code to install</h1>
          <p style={{ background: '#333', borderRadius: '50px', textAlign: 'center' }} className='text-red-300  max-w-xs mx-auto'>{software.code}</p>
          <h1 className='text-center'>Categories</h1>
          <div className="flex flex-wrap justify-center">
            {software.categories.map((category, index) => (
              <div className="bg-gray-200 text-gray-700 p-2 m-2 rounded-full" key={index}>
                #{category}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">

          {software.software_website && <a href={software.software_website} target="_blank" rel="noreferrer">
            <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block hover:bg-teal-900 bg-teal-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer mx-auto">Website of the Software</span>
          </a>}
          </div>
        </div>
      </div>
    </>
  );
};

export default softwareDetail;