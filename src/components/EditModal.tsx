import { useState } from 'react';
import { useParams } from 'react-router-dom'

export function EditModal(props) {
    let { id } = useParams();


    const [dataTicket, setDataTicket] = useState({})


    async function editTicket() {

        const data = await fetch(`http://localhost:3000/api/tickets/${id}`, {
            method: 'PATCH',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataTicket)
        }
        )
    }

    function handleValue(e) {
        setDataTicket({ ...dataTicket, [e.target.name]: e.target.value })
    }
    function preventDefault(e) {
        e.preventDefault()
        editTicket()
    }
    console.log(dataTicket);
    return (


        <div className="success-modal-backdrop">

            <div className="success-modal-card">
                <span className="close-btn" onClick={props.onClick}>
                    ✕
                </span>


                <h1>Edytuj dane użytwkonika</h1>

                <form action="" onSubmit={preventDefault}>
                    <div>
                        <label htmlFor="">dzial_docelowy:</label>
                        <input type="text" placeholder="wartosc" name='dzial_docelowy' onChange={handleValue} />
                    </div>

                    <div>
                        <label htmlFor="">kategoria_zgloszenia:</label>
                        <input type="text" placeholder="wartosc" name='kategoria_zgloszenia' onChange={handleValue} />
                    </div>

                    <div>
                        <label htmlFor="">priorytet_zgloszenia:</label>
                        <input type="text" placeholder="wartosc" name='priorytet_zgloszenia' onChange={handleValue} />
                    </div>

                    <div>
                        <label htmlFor="">status_zgloszenia:</label>
                        <input type="text" placeholder="wartosc" name='status_zgloszenia' onChange={handleValue} />
                    </div>

                    <div>
                        <label htmlFor="">przypisane_do:</label>
                        <input type="text" placeholder="wartosc" name='przypisane_do' onChange={handleValue} />
                    </div>

                    <div>
                        <label htmlFor="">komentarz:</label>
                        <input type="text" placeholder="wartosc" name='komentarz' onChange={handleValue} />
                    </div>



                    <button type='submit' className="edit-btn" >Zapisz zmiany</button>
                </form>
            </div>

        </div>






    )
}