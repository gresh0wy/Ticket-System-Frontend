import { useState } from "react"
import { FormInput } from '../components/FormInput'
import { SuccessModal } from '../components/SuccessModal '

function CreateTickets() {
    const [ticketsData, setTicketsData] = useState({ imie_nazwisko: '', numer_wewnetrzny: '', miejsce_zdarzenia: '', dzial_docelowy: '', kategoria_zgloszenia: '', temat_zgloszenia: '', opis_zgloszenia: '', priorytet_zgloszenia: '', powtarzalnosc: '', })

    const [error, setError] = useState('')
    const [mess, setMess] = useState('')
    const [ticketId, setTicketId] = useState('')
    const [isOpen, setIsOpen] = useState(false)


    function handleData(e) {
        setTicketsData({ ...ticketsData, [e.target.name]: e.target.value })
    }
    function preventDefault(e) {
        e.preventDefault()
        sendTickets()
    }


    async function sendTickets() {
        const data = await fetch('http://localhost:3000/api/tickets', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ticketsData),
        }
        )
        const res = await data.json()
        if (data.ok) {
            setMess(res.message)
            setTicketId(res.ticketId)
            setIsOpen(true)
        } else {
            setError(res.error)
        }
    }


    const inputValueData = [
        { label: 'imie_nazwisko', name: 'imie_nazwisko', type: 'text', placeholder: 'Wpisz imie i nazwisko' },
        { label: 'numer_wewnetrzny', name: 'numer_wewnetrzny', type: 'number', placeholder: 'Wpisz numer wew' },
        { label: 'miejsce_zdarzenia', name: 'miejsce_zdarzenia', type: 'text', placeholder: 'Wybierz oddział' },
        { label: 'dzial_docelowy', name: 'dzial_docelowy', type: 'text', placeholder: 'Wybierz dział cocelowy' },
        { label: 'kategoria_zgloszenia', name: 'kategoria_zgloszenia', type: 'text', placeholder: 'Wybierz kategorie' },
        { label: 'temat_zgloszenia', name: 'temat_zgloszenia', type: 'text', placeholder: 'Temat zgłoszenia' },
        { label: 'opis_zgloszenia', name: 'opis_zgloszenia', type: 'text', placeholder: 'opis_zgloszenia' },
        { label: 'priorytet_zgloszenia', name: 'priorytet_zgloszenia', type: 'text', placeholder: 'priorytet_zgloszenia' },
        { label: 'powtarzalnosc', name: 'powtarzalnosc', type: 'text', placeholder: 'powtarzalnosc' },
    ]

    function closeModal() {
        setIsOpen(false)
        setTicketsData({ imie_nazwisko: '', numer_wewnetrzny: '', miejsce_zdarzenia: '', dzial_docelowy: '', kategoria_zgloszenia: '', temat_zgloszenia: '', opis_zgloszenia: '', priorytet_zgloszenia: '', powtarzalnosc: '' })
    }

    return (
        <>
            <div className="ticket-container">
                <div className="ticket-card">
                    <h1>Wyślij zgłoszenie</h1>
                    <p className="subtitle">Opisz swój problem lub wniosek</p>

                    <form action="" onSubmit={preventDefault}>
                        {inputValueData.map((element) => (
                            <FormInput
                                key={element.name}
                                label={element.label}
                                name={element.name}
                                type={element.type}
                                value={ticketsData[element.name]}
                                placeholder={element.placeholder}
                                onChange={handleData}
                            />
                        ))}

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" className="submit-button">
                            Wyślij zgłoszenie
                        </button>
                    </form>

                    {isOpen && <SuccessModal mess={mess} ticketId={ticketId} onClick={closeModal} name='close' />}
                </div>
            </div>
        </>
    )
}
export default CreateTickets

