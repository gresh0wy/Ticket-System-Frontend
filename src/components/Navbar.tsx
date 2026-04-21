import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from 'react-router-dom';


export function Navbar() {
    const location = useLocation()
    let navigate = useNavigate();


    const [fullName, setFullName] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    async function getFullName() {
        const data = await fetch('http://localhost:3000/auth/users/me', {
            method: 'GET',
            credentials: 'include' // zezwala na zapisywanie ciasteczek 
        })
        if (data.ok) {
            const res = await data.json()
            setFullName(`${res[0].imie} ${res[0].nazwisko}`)
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }

    }
    useEffect(() => {
        getFullName()
    }, [location])


    async function logout() {
        const logout = await fetch('http://localhost:3000/auth/logout', {
            method: 'POST',
            credentials: "include"
        })

        navigate('/login')

    }


    function GuestLinks() {

        return (
            <>
                <Link to='/login' className="nav-link">Zaloguj</Link >
                <Link to='/register' className="nav-link">Rejestracja</Link>
            </>
        )
    }
    function UserInfo() {
        return (
            <>
                <p className="nav-link">Witaj: {fullName}</p>
                <button onClick={logout} className="nav-link">wyloguj się</button>
            </>
        )
    }

    return (
        <nav className="navbar">
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/tickets/create" className="nav-link">Nowe zgłoszenie</Link>
                <Link to="/admin/tickets" className="nav-link">Wszystkie zgłoszenia</Link>
                <Link to="/about" className="nav-link">O nas</Link>
            </div>

            <div className="user-section">
                {isLoggedIn ? <UserInfo /> : <GuestLinks />}
            </div>
        </nav>
    );
}