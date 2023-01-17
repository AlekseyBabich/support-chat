import React from 'react';
import s from './Header.module.css'

const Header = (props) => {
    return (
        <div className={s.wrapperContainer}>
           <div>
               <h1>Header</h1>
           </div>
        </div>
    );
};

export default Header;