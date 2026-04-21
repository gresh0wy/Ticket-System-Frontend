export function SuccessModal(props) {
    return (
        <div className="success-modal-backdrop">

            <div className="success-modal-card">
                <span className="close-btn" onClick={props.onClick}>
                    ✕
                </span>



                <h1>{props.mess}</h1>
                <p className="ticket-id">
                    ID zgłoszenia: <strong>{props.ticketId}</strong>
                </p>


            </div>
        </div>
    );
}