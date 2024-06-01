import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='mt-8 justify-center text-3xl font-bold'>About Us</h1>
      <img className='object-fit mb-4' src={(import.meta.env.BASE_URL + 'logo.png') as string} alt='logo' />
      <div>This is a Graduation project</div>
      <div>Credit:</div>
      <div className='list-disc'>
        <li>Võ Phi Hùng</li>
        <li>Thái Nguyễn Việt Hùng</li>
        <li>Nguyễn Cảnh Huy</li>
        <li>Phan Nhật Triều</li>
        <li>Lê Kim Hiếu</li>
        <li>Nguyễn Quang Tuyến</li>
      </div>
    </div>
  );
};
