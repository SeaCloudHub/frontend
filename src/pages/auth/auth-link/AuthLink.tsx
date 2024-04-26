import React from 'react';
import { Link } from 'react-router-dom';

type AuthLinkProps = {
  children: React.ReactNode;
  link: string;
  className?: string;
};

const AuthLink: React.FC<AuthLinkProps> = ({ children, link, className }) => {
  return (
    <Link to={link} className={`rounded-xl px-1 text-sm hover:bg-[#ecf2fc] ${className}`}>
      {children}
    </Link>
  );
};

export default AuthLink;
