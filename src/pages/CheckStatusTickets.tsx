import { useEffect, useState } from "react";


function CheckStatusTickets() {
    const [ticket, setTicket] = useState([])



    const [btnValue, setBtnValue] = useState('')
    const [inputValue, setInputValue] = useState('')


    function handleValue(e) {
        setInputValue(e.target.value)
    }
    function checkId() {
        setBtnValue(inputValue)
    }

    useEffect(() => {
        async function dataTickets() {
            const data = await fetch(`http://localhost:3000/api/tickets/${btnValue}/status`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

            })
            const res = await data.json()
            setTicket(res)
        }
        dataTickets()
    }, [btnValue])


    function ShowTicket() {




        return (
            <div className="ticket-view-card">
                <div className="ticket-view-grid">

                    <div className="ticket-field">
                        <span className="ticket-label">ID</span>
                        <span className="ticket-value">{ticket.id}</span>
                    </div>

                    <div className="ticket-field">
                        <span className="ticket-label">Imię i nazwisko</span>
                        <span className="ticket-value">{ticket.imie_nazwisko}</span>
                    </div>

                    <div className="ticket-field">
                        <span className="ticket-label">Numer wewnętrzny</span>
                        <span className="ticket-value">{ticket.numer_wewnetrzny}</span>
                    </div>

                    <div className="ticket-field">
                        <span className="ticket-label">Miejsce zdarzenia</span>
                        <span className="ticket-value">{ticket.miejsce_zdarzenia}</span>
                    </div>

                    <div className="ticket-field">
                        <span className="ticket-label">Dział docelowy</span>
                        <span className="ticket-value">{ticket.dzial_docelowy}</span>
                    </div>

                    <div className="ticket-field">
                        <span className="ticket-label">Temat</span>
                        <span className="ticket-value">{ticket.temat_zgloszenia}</span>
                    </div>

                    <div className="ticket-field">
                        <span className="ticket-label">Priorytet</span>
                        <span className="ticket-value">{ticket.priorytet_zgloszenia}</span>
                    </div>

                    <div className="ticket-field">
                        <span className="ticket-label">Powtarzalność</span>
                        <span className="ticket-value">{ticket.powtarzalnosc}</span>
                    </div>

                    <div className="ticket-field">
                        <span className="ticket-label">Status</span>
                        <span className={`ticket-status ticket-status-${ticket.status_zgloszenia}`}>
                            {ticket.status_zgloszenia}
                        </span>
                    </div>

                    <div className="ticket-field">
                        <span className="ticket-label">Data</span>
                        <span className="ticket-value">{new Date(ticket.data_utworzenia).toLocaleDateString('local')}</span>
                    </div>

                    <div className="ticket-field">
                        <span className="ticket-label">Przypisane do</span>
                        <span className="ticket-value">{ticket.przypisane_do}</span>
                    </div>

                </div>

                <div className="ticket-description-block">
                    <h3>Opis zgłoszenia</h3>
                    <p className="ticket-description">{ticket.opis_zgloszenia}</p>
                </div>
            </div>
        )
    }


    return (
        <div className="ticket-search-page">

            <div className="ticket-search-box">
                <input
                    type="text"
                    placeholder="Wprowadź numer zgłoszenia"
                    onChange={handleValue}
                    className="ticket-search-input"
                />
                <button onClick={checkId} className="ticket-search-button">
                    Szukaj
                </button>
            </div>

            {ticket.id ? <ShowTicket /> : <p className="ticket-empty">Brak zgłoszeń</p>}

        </div>
    );
}

export default CheckStatusTickets