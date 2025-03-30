import  { useState } from "react";
import "./header.css";
import HeaderLift from "./Header-left";
import HeaderRight from "./Header-right";
import NavLinks from "./nav-links"; // تأكد من صحة مسار الملف

const Header = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <header className="header">
            <HeaderLift toggle={toggle} setToggle={setToggle} />
            <NavLinks toggle={toggle} setToggle={setToggle} />
            <HeaderRight />
        </header>
    );
}

export default Header;
