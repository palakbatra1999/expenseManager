import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import toast, { Toaster } from 'react-hot-toast';


const Layout = (props) => {
  return (
    <>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Toaster />
          {props.children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
