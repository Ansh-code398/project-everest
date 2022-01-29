import React, { useEffect, useState } from 'react';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from '@mui/material';
import EditPost from './EditPost';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from './Modal';
import DownloadIcon from '@mui/icons-material/Download';
import Ratings from './Rating';
import LanguageIcon from '@mui/icons-material/Language';

const SoftwareDetail = ({ software, user }) => {
  const [openModal, setOpenModal] = useState(false)
  const [edit, setEdit] = useState(false);
  const [dlurl, setDlurl] = useState('');
  const [copytoClipboard, setCopytoClipboard] = useState(false);
  useEffect(() => {
    software.downloadLink && setDlurl(software.downloadLink.replace("&", "-"))
    software.downloadLink && setDlurl(software.downloadLink.replace("--", "-"))
  }, [software])
  return (
    <>
      {software && <div className="bg-[#131313] shadow-lg rounded-lg lg:p-8 pb-12">
        <div className="relative overflow-hidden shadow-md mb-6 flex justify-center contrast-200">
          {software.featuredImage.url && <img src={software.featuredImage.url} alt="" className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg max-w-md mx-auto image-shadow" />}
        </div>

        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full">
            {software.author && <div className="hidden md:flex justify-center lg:mb-0 lg:w-auto mr-8 items-center">
              <img
                alt={software.author.name}
                height="30px"
                width="30px"
                className="align-middle rounded-full"
                src={software.author.photo.url}
              />
              <Tooltip title={`Bio- ${software.author.bio}`}>
                <p className="inline align-middle text-gray-200 ml-2 font-medium text-lg cursor-pointer">{software.author.name}</p>
              </Tooltip>
            </div>}
            <div className='flex-1' />
            {software.createdAt && <Tooltip title={`Updated on - ${moment(software.updatedAt).format('MMM DD, YYYY')}`}>
              <div className="font-medium text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="align-middle">Published On - {moment(software.createdAt).format('MMM DD, YYYY')}</span>
              </div>
            </Tooltip>}
            {user && software.author.email === user.email && <EditIcon
              className="cursor-pointer text-gray-200 hover:text-teal-300 transition-all mx-5 duration-500" onClick={() => setEdit(!edit)} />}
            {user && software.author.email === user.email && <DeleteIcon
              className="cursor-pointer text-gray-200 hover:text-teal-300 transition-all mx-5 duration-500" onClick={() => setOpenModal(true)} />}
          </div>
          {openModal && <Modal title='Are you sure that you want to delete this application? ' open={openModal} setOpen={setOpenModal} software_id={software._id} email={user.email} />}
          {edit && <EditPost software={software} user={user} setEdit={setEdit} />}
          {software.title && <h1 className="titlee mb-8 text-3xl font-semibold text-center text-white"> {software.title}</h1>}
          {software.exerpt && <p className="text-gray-300 text-center my-4">{software.exerpt}</p>}
          {software.slug && <h1 className="text-2xl text-center my-16 text-white">{software.desc}</h1>}
          {software.code && <h1 className="text-xl font-semibold mb-4 mx-auto  max-w-xs text-center text-white">Manual Installation</h1>}
          {software.code && <p style={{
            fontFamily: "Monaco, monospace", fontSize: "18px", lineHeight: "100%", backgroundColor: "#474747", padding: "0.2em", letterSpacing: "-0.05em", color: "white", textAlign: "center", margin: "12px auto",
            wordBreak: "normal", borderRadius: "5px"
          }} className='text-red-300  max-w-xs mx-auto'>{software.code} <span className={`cursor-pointer rounded-sm px-2 ${copytoClipboard ? 'bg-green-500 text-white' : 'text-black bg-white hover:bg-black hover:text-white transition-all duration-1000'}`} onClick={
           () => {
            navigator.clipboard.writeText(software.code)
            setCopytoClipboard(true)
            setTimeout(() => {
              setCopytoClipboard(false)
            }, 2000)
           } 
          }>Copy</span> </p>}
          <Ratings id={software._id} />
          <div className="flex justify-center mt-10 text-white">

            {software.software_website && <a href={software.software_website} target="_blank" rel="noreferrer">
              <Tooltip title={`Visit ${software.software_website}`}>
                <span className="bn632-hover bn27 transition duration-500 ease transform hover:-translate-y-1 inline-block hover:bg-teal-300 bg-teal-200 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer mx-auto"><LanguageIcon /> </span>
              </Tooltip>
            </a>}
            {software.downloadLink && <a href={dlurl} target="_blank" rel="noreferrer">
              <Tooltip title={`Download - ${software.title}`}>
                <span className="bn632-hover bn27 transition duration-500 ease transform hover:-translate-y-1 inline-block hover:bg-teal-900 bg-teal-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer mx-auto"><DownloadIcon /></span>
              </Tooltip>
            </a>}
          </div>
        </div>
      </div>}
    </>
  );
};

export default SoftwareDetail;