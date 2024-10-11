import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const NavFooterLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default NavFooterLayout;
