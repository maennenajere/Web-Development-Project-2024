import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { useUser } from '../components/UserProvider.js';
import Cookies from 'js-cookie';

export default function Logout() {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const [logoutMessage, setLogoutMessage] = useState(false);

    const handleLogout = async () => {
        try {

            const token = Cookies.get('token'); 
    
            if (!token) {
                console.error('Ei löytynyt tokenia!');
                return;
            }
    
            console.log('Lähetetään logout-pyyntö ilman Bearer-tokenia...');

            const response = await axios.get('https://moviexplorer.site/logout', {
        
            });
    
            console.log('Logout-pyyntö onnistui:', response.data);
            logout(); 
            setLogoutMessage(true); 
    
            setTimeout(() => {
                setLogoutMessage(false); 
                navigate('/'); 
            }, 3000);
    
        } catch (err) {
            console.error('Logout epäonnistui:', err);
            if (err.response) {
                console.log('Virhe response:', err.response.data);
            } else if (err.request) {
                console.log('Virhe requestissa:', err.request);
            } else {
                console.log('Virhe viestissä:', err.message);
            }
            logout(); 
            setLogoutMessage(true); 
    
            setTimeout(() => {
                setLogoutMessage(false); 
                navigate('/'); 
            }, 3000);
        }
    };

    return (
        <header className="header">
            <div className="container header-content">
                <nav>
                    <ul className="nav-list">
                        <li><Link to="/" className="nav-link"><b>Home</b></Link></li>
                        <li><Link to="/movieinfo" className="nav-link">Movie info</Link></li>
                        <li><Link to="/group" className="nav-link">Groups</Link></li>
                        <li><Link to="/showtimes" className="nav-link">Showtime</Link></li>
                    </ul>
                </nav>
                {user ? (
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                ) : (
                    <Link to="/login" className="account-link">
                        <svg xmlns="http://www.w3.org/2000/svg" className="user-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        My account
                    </Link>
                )}
            </div>
            {logoutMessage && (
                <div className="logout-message">
                    You have successfully logged out.
                </div>
            )}
        </header>
    );
}