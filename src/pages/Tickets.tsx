import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
function AllTickets() {

    const [tickets, setTickets] = useState([])
    let navigate = useNavigate()


    useEffect(() => {
        async function getTickets() {

            const data = await fetch('http://localhost:3000/api/tickets', {
                method: 'GET',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (data.status === 401 || data.status === 403) {
        navigate('/forbidden')
            } else {
                const res = await data.json()
                setTickets(res)
            }
        } getTickets()
    }, [])

    return (
        <div className="tickets-page">
            <h1 className="tickets-title">Lista zgłoszeń</h1>
            {tickets.length === 0 && <p className="tickets-title">Brak zgłoszeń...</p>}
            <ul className="tickets-ul">
                {tickets.map((element) => (
                    <li key={element.id} className="ticket-li">

                        <div className="ticket-row top">
                            <span className="ticket-id">#{element.id}</span>

                            <span
                                className={`priority priority-${element.priorytet_zgloszenia?.toLowerCase()}`}
                            >
                                {element.priorytet_zgloszenia}
                            </span>
                        </div>

                        <h3 className="ticket-topic">
                            {element.temat_zgloszenia}
                        </h3>

                        <div className="ticket-row">
                            <span className="person">
                                {element.imie_nazwisko}
                            </span>

                            <span className="location">
                                {element.miejsce_zdarzenia}
                            </span>
                        </div>

                        <div className="ticket-row">
                            <span className="date">
                                {new Date(element.data_utworzenia).toLocaleString()}
                            </span>
                        </div>
                        <button className="edit-btn" onClick={() => navigate(`/admin/tickets/${element.id}`)}>
                            Szczegóły
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AllTickets

