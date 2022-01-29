import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';


const SoftwareCard = ({ software }) => (
    <div className='card' title={software.title}>
        <div className="imgBx contrast-200">
            <img src={software.featuredImage.url} />
        </div>
        <div className="contentBx">
            <h2>{software.title}</h2>
            <div className="size">
                {software.exerpt}
            </div>
            <Link href={`/applications/${software.slug}`}>Open</Link>
        </div>
    </div>
)

export default SoftwareCard;