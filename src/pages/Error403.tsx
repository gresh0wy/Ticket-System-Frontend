
function Error403() {

    return (
        <div className="error403-page">
            <div className="error403-box">
                <div className="error403-code">403</div>
                <h1>Brak uprawnień</h1>
                <p>Nie masz dostępu do tej strony.</p>

                <a href="/tickets/create" className="error403-btn">Wróć</a>


            </div>
        </div>
    );
}

export default Error403;