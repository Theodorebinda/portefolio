// components/CircularProgressBar.tsx
import Image, { StaticImageData } from 'next/image';
import React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircularProgressBarProps {
  percentage: number | undefined
  image : StaticImageData | string
  name : string 
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ percentage,image,name }) => {
  return (
    <div className="w-20 h-20 m-auto ">
        <CircularProgressbarWithChildren value={percentage} className=''>
            <Image width={50} height={50} src={image} alt={name} />
            <div className='text-xs pt-[-8]'>
                <span className='font-semibold'>{`${percentage}%`}</span>
            </div>
        </CircularProgressbarWithChildren>
    </div>
  );
};

export default CircularProgressBar;


