import React from 'react';

const Iframe: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div className='h-full w-full'>
      {!url && <img src='./loader.svg' />}
      {url && (
        <iframe
          title='myFrame'
          style={{
            height: '100%',
            width: '100%',
            border: '1px solid #d6d6d6',
          }}
          src={url + '#toolbar=0'}></iframe>
      )}
    </div>
  );
};

export default Iframe;
