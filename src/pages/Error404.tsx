function Error404() {
    return (
        <div className="notfound-page">
            <div className="notfound-card">
                <h1>404</h1>
                <h2>Strona nie istnieje</h2>
                <p>Wygląda na to, że trafiłeś w złe miejsce.</p>

                <button className="back-button" onClick={() => window.history.back()}>
                    ← Wróć
                </button>
            </div>
        </div>
    );
}

export default Error404