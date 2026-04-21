import { useState } from "react"
import { useNavigate } from 'react-router-dom';

function Login() {

    const [loginData, setLoginData] = useState({ username: '', password: '' })

    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')


    const [error, setError] = useState(null)

    let navigate = useNavigate();

    function handleLoginData(e) {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }


    function preventDefault(e) {
        e.preventDefault()
        loginFetch()
    }

    async function loginFetch() {
        const sendDataLogin = await fetch('http://localhost:3000/auth/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(loginData),
            credentials: 'include' // zezwala na zapisywanie ciasteczek 
        })

        if (sendDataLogin.status === 200) {
            navigate('/tickets/create')

        } else {
            const data = await sendDataLogin.json()

            setError(data.error)


        }

    }


    return (
        <>
            <div className="login-container">
                <div className="login-card">
                    <h1>Formularz logowania</h1>
                    <p className="subtitle">Zaloguj się do swojego konta</p>

                    <form action="" onSubmit={preventDefault}>
                        <div className="form-group">
                            <label>Nazwa użytkownika</label>
                            <input
                                type="text"
                                name="username"
                                value={loginData.username}
                                onChange={handleLoginData}
                                placeholder="Wpisz nazwę użytkownika"
                            />
                        </div>

                        <div className="form-group">
                            <label>Hasło</label>
                            <input
                                name="password"
                                type="password"
                                value={loginData.password}
                                onChange={handleLoginData}
                                placeholder="Wpisz hasło"
                            />
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" className="login-button">
                            Zaloguj się
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Login