import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { ConfirmModal } from '../components/ConfirmModal'
import { EditModal } from '../components/EditModal'


function DetailsTickets() {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const [tickets, setTickets] = useState([])
    let navigate = useNavigate()
    let params = useParams()

    useEffect(() => {
        async function getTickets() {
            const dataTickets = await fetch(`http://localhost:3000/api/ticketsDetails/${params.id}`, {
                method: 'GET',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (dataTickets.status === 401 || dataTickets.status === 403) {
                navigate('/forbidden')
            } else {
                const res = await dataTickets.json()
                setTickets(res)
            }

        }
        getTickets()
    }, [EditModal])

    async function deleteTickets() {
        const data = await fetch(`http://localhost:3000/api/tickets/${params.id}`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
        navigate('/admin/tickets')
    }


    function showConfirmModal() {
        setIsOpen(true)

    }
    function closeConfirmModal() {
        setIsOpen(false)
    }
    function showEditModal() {
        setIsOpenEditModal(true)
    }
    function closeEditModal() {
        setIsOpenEditModal(false)
    }


    return (
        <div className="ticket-details-page">
            <div className="ticket-details-container">

                <div className="ticket-details-header">
                    <h1>Szczegóły zgłoszenia</h1>
                    <span className="ticket-id">#{tickets.id}</span>
                </div>

                <div className="ticket-details-grid">

                    <div className="detail-item">
                        <span>Osoba zgłaszająca</span>
                        <p>{tickets.imie_nazwisko}</p>
                    </div>

                    <div className="detail-item">
                        <span>Numer wewnętrzny</span>
                        <p>{tickets.numer_wewnetrzny}</p>
                    </div>

                    <div className="detail-item">
                        <span>Lokalizacja</span>
                        <p>{tickets.miejsce_zdarzenia}</p>
                    </div>

                    <div className="detail-item">
                        <span>Dział</span>
                        <p>{tickets.dzial_docelowy}</p>
                    </div>

                    <div className="detail-item">
                        <span>Kategoria</span>
                        <p>{tickets.kategoria_zgloszenia}</p>
                    </div>

                    <div className="detail-item">
                        <span>Temat</span>
                        <p className="highlight">{tickets.temat_zgloszenia}</p>
                    </div>

                    <div className="detail-item full">
                        <span>Opis</span>
                        <p>{tickets.opis_zgloszenia}</p>
                    </div>

                    <div className="detail-item">
                        <span>Priorytet</span>
                        <p className={`priority priority-${tickets.priorytet_zgloszenia?.toLowerCase()}`}>
                            {tickets.priorytet_zgloszenia}
                        </p>
                    </div>

                    <div className="detail-item">
                        <span>Status</span>
                        <p>{tickets.status_zgloszenia}</p>
                    </div>

                    <div className="detail-item">
                        <span>Powtarzalność</span>
                        <p>{tickets.powtarzalnosc}</p>
                    </div>

                    <div className="detail-item">
                        <span>Utworzone</span>
                        <p>{new Date(tickets.data_utworzenia).toLocaleDateString('local')}</p>
                    </div>

                    <div className="detail-item">
                        <span>Modyfikowane</span>
                        <p>{new Date(tickets.data_modyfikacji).toLocaleString('local')}</p>
                    </div>

                    <div className="detail-item">
                        <span>Utworzone przez</span>
                        <p>{tickets.utworzone_przez}</p>
                    </div>

                    <div className="detail-item">
                        <span>Przypisane do</span>
                        <p>{tickets.przypisane_do}</p>
                    </div>

                    <div className="detail-item full">
                        <span>Komentarz</span>
                        <p>{tickets.komentarz}</p>
                    </div>

                </div>

                <div className="ticket-details-actions">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        Go Back
                    </button>

                    <button className="edit-btn" onClick={showEditModal}>Edytuj</button>
                    <button className="edit-btn" name='close' onClick={showConfirmModal}>Usuń</button>
                </div>

            </div>
            {isOpen && <ConfirmModal title='Czy na pewno chcesz usunąć zgłoszenie?' message='Usunięcie będzie nieodwracalne!' onClick={closeConfirmModal} confirm={deleteTickets} />}
            {isOpenEditModal && <EditModal onClick={closeEditModal} />}
        </div>



    );
}

export default DetailsTickets


