const HeaderLift = ({toggle, setToggle}) => {
    return (

            <div className="header-left">
                <div className="header-logo">
                    <strong>PLOG</strong>
                    <i className="bi bi-pencil"></i>
                </div>
                <div onClick={() => setToggle(!toggle)} className="header-menu">
                    {toggle ? <i className="bi bi-x-lg"></i> : <i className="bi bi-list"></i>}
                </div>
            </div>

    );
}

export default HeaderLift;