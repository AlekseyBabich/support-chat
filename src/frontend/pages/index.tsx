import React, {useState} from "react";
import Header from "@component/Header/Header";
import Menu from "@component/Menu/Menu";

export default function Home() {

    const [isMenuOpen, setMenuOpen] = useState(false)


    return (
        <>
            <Header handleMenu={() => setMenuOpen(true)}/>
            <Menu menuOpen={isMenuOpen}
                  menuClose={() => setMenuOpen(false)}
            />
        </>
    )
}
