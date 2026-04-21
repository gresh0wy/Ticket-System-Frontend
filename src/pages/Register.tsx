import { useState } from "react"
import { useNavigate } from 'react-router-dom';

function Register() {

    let navigate = useNavigate();

    const [userData, setUserData] = useState({ imie: '', nazwisko: '', username: '', email: '', password: '' })
    const [error, setError] = useState(null)

    function handleName(e) {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }


    async function sendDataRegister() {
        const data = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imie: userData.imie, nazwisko: userData.nazwisko, username: userData.username, email: userData.email, password: userData.password })
        })



        if (data.ok) {
            navigate('/login')
        } else {
            const res = await data.json()
            setError(res.error)
        }
    }


    function preventDefault(e) {
        e.preventDefault()
        sendDataRegister()
    }
    return (
        <>
            <div className="register-container">
                <div className="register-card">
                    <h1>Formularz rejestracji</h1>
                    <p className="subtitle">Utwórz nowe konto</p>


                    <form action="" onSubmit={preventDefault}>
                        <div className="form-group">
                            <label>Imię</label>
                            <input
                                type="text"
                                name="imie"
                                value={userData.imie}
                                onChange={handleName}
                                placeholder="Wpisz imię"
                            />
                        </div>

                        <div className="form-group">
                            <label>Nazwisko</label>
                            <input
                                type="text"
                                name="nazwisko"
                                value={userData.nazwisko}
                                onChange={handleName}
                                placeholder="Wpisz nazwisko"
                            />
                        </div>

                        <div className="form-group">
                            <label>Nazwa użytkownika</label>
                            <input
                                type="text"
                                name="username"
                                value={userData.username}
                                onChange={handleName}
                                placeholder="Wpisz nazwę użytkownika"
                            />
                        </div>

                        <div className="form-group">
                            <label>Adres e-mail</label>
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleName}
                                placeholder="Wpisz adres e-mail"
                            />
                        </div>

                        <div className="form-group">
                            <label>Hasło</label>
                            <input
                                type="password"
                                name="password"
                                value={userData.password}
                                onChange={handleName}
                                placeholder="Wpisz hasło"
                            />
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" className="register-button">
                            Rejestruj
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register