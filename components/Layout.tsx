import React from 'react';
import Nav from './Nav';
import Header from './Header';
import NavTopic from './NavTopic';
import { Footer } from './Footer';

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => (
  <>
    <Nav />
    <Header />
    <NavTopic />
    {children}
    <Footer />
  </>
);

export default Layout;
