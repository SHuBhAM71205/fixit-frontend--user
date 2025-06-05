import React, { useRef, useState, useEffect ,useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/navbar.css';
import manIcon from '/man-icon-illustration-vector.jpg'; // Ensure this path is correct
import Currpgcontext from '../context/currpgcontext';


const Navbar = ({ userName }) => {
    const leftNavRef = useRef(null);
    const [isSmall, setIsSmall] = useState(false);
    const context=useContext(Currpgcontext);
    const{setcurrpg}=context;
    const buttonMappings = [
        { id: "b3", text: "Home", icon: <i className="fas fa-home" />, path: "/" },
        { id: "b1", text: "Request", icon: <i className="fas fa-file-alt" />, path: "/request" },
        { id: "b5", text: "Track Request", icon: <i className="fas fa-map-marker-alt" />, path: "/track-request" },
        { id: "b4", text: "History", icon: <i className="fas fa-history" />, path: "/history" },
        { id: "b2", text: "Feedback", icon: <i className="fas fa-comment-dots" />, path: "/feedback" },

    ];

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                const tooSmall =
                    entry.contentRect.width < 150 || entry.contentRect.height < 100;
                setIsSmall(tooSmall);
            }
        });

        if (leftNavRef.current) {
            observer.observe(leftNavRef.current);
        }

        return () => {
            if (leftNavRef.current) observer.unobserve(leftNavRef.current);
        };
    }, []);
    const navigate = useNavigate();

    const handleCloseBtn = () => {
        if(isSmall==false)  
        {
            document.querySelector('.left-nav').style.width = '6vw';
        }
        else
        {
            document.querySelector('.left-nav').style.width = '20vw';
        }
    setIsSmall(!isSmall)
    };

    const handleLogout = () => {
        navigate('/fixit-user?lgot=true'); // Adjust route if needed
    };
        return (

        <div className="left-nav flex-col">
            <div className="info">
                <div className="a flex-row " onClick={handleCloseBtn}>
                    <i
                        className="material-icons close-btn left-nav-open-close-button"
                        onClick={handleCloseBtn}
                    >
                        {isSmall ? 'menu' : 'close'}
                    </i>

                </div>

                <div className="user-info-left-nav">
                    <span>
                        <img src={manIcon} alt="User" id="user-img"  />
                    </span>
                    <p style={{ color: 'white' }}>{userName}</p>
                </div>
            </div>

            <div className="nav">
                <div className="btns">

                    {buttonMappings.map(({ id, text, icon, path }) => (
                        <Link
                            key={id}
                            to={path}
                            className="button"
                            id={id}
                            onClick={() => setcurrpg(text)}
                        >
                            <span className="icon" style={{ marginRight: !isSmall ? 0 : "10px" }}>
                                {icon}
                            </span>
                            {!isSmall && <span>{text}</span>}
                        </Link>
                    ))}



                </div>
            </div>

            <button id="logout" onClick={handleLogout}>
                <i className="icon fas fa-sign-out-alt"></i> {!isSmall && 'Log Out'}
            </button>
        </div>


    );
};

export default Navbar;



