import React from 'react';
import Header from './component/Header/Header'
import s from './app.module.css'
import ChatList from "@/src/component/ChatList/ChatList";
import Messages from "@/src/component/Messages/Messages";

const App = () => {
    return (
        <div className={s.wrapperContainer}>
            <Header/>
            <ChatList/>
           <div className={s.wrapperContent}>
                <Messages/>
           </div>
        </div>
    );
};

export default App;