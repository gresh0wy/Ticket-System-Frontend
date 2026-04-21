export function ConfirmModal(props) {
    return (
        <div className="success-modal-backdrop">

            <div className="success-modal-card">
                <span className="close-btn" onClick={props.onClick}>
                    ✕
                </span>
                <h1>{props.title}</h1>
                <button className="edit-btn confirm-btn" onClick={props.confirm}>Tak</button>
                <button className="edit-btn confirm-btn" onClick={props.onClick}>Nie</button>
                <p className="ticket-id">
                    {props.message}
                </p>


            </div>
        </div>
    );
}