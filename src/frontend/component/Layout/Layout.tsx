import React, { useState } from 'react';
import Header from '@component/Header/Header';
import Menu from '@component/Menu/Menu';


const Layout = ({ children }: any) => {

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