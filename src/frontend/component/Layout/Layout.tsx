import React, { ReactNode, useState } from 'react';
import Header from '@component/Header/Header';
import Menu from '@component/Menu/Menu';

interface LayoutProps {
  children: ReactNode
}
const Layout = ({ children }: LayoutProps) => {

  const [ isMenuOpen, setMenuOpen ] = useState(false)

  return (
    <header>

      <Header handleMenu={ () => setMenuOpen(true) }/>
      <Menu menuOpen={ isMenuOpen }
            menuClose={ () => setMenuOpen(false) }
      />
      { children }

    </header>
  );
};

export default Layout;