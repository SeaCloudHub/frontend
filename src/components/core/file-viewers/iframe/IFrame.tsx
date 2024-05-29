import React from 'react';

type IFrameProps = {
  isHtml?: boolean;
  url?: string;
};
const Iframe: React.FC<IFrameProps> = ({ url, isHtml }) => {
  return (
    <div className='h-full w-full flex items-center justify-center'>
      {!url && <img src='./loader.svg ' className='w-[50px] h-[50px]' />}
      {url && (
        <iframe
          title='myFrame'
          srcDoc={isHtml ? url : undefined}
          style={{
            background: isHtml ? 'white' : '',
            height: '100%',
            width: '100%',
            border: '1px solid #d6d6d6',
          }}
          src={isHtml ? undefined : url + '#toolbar=0'}></iframe>
      )}
    </div>
  );
};

export default Iframe;
