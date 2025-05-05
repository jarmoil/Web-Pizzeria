const ManagementPage = () => {
    return (
        <main className="managementPage-main-wrapper">
            <nav className="managementPage-sidebar">
                <ul className="managementPage-sidebar-menu">
                <li>
                    <a href="#menu-management" className="managementPage-sidebar-link"
                    >Menun hallinta</a
                    >
                </li>
                <li>
                    <a href="#order-management" className="managementPage-sidebar-link"
                    >Tilausten hallinta</a
                    >
                </li>
                <li>
                    <a href="#user-management" className="managementPage-sidebar-link"
                    >Käyttäjien hallinta</a
                    >
                </li>
                <li>
                    <a href="#review-moderation" className="managementPage-sidebar-link"
                    >Arvosteluiden hallinta</a
                    >
                </li>
                </ul>
            </nav>

        <div className="managementPage-content">
            <h1>HALLINTAPANEELI</h1>

            <section id="menu-management" className="managementPage-section">
                <h2 className="managementPage-section-title">Menun hallinta</h2>
                <p>Muokkaa menun tuotteita, hintoja ja kuvauksia</p>
            </section>

            <section id="order-management" className="managementPage-section">
                <h2 className="managementPage-section-title">Tilausten hallinta</h2>
                <p>Hallinnoi asiakastilauksia ja toimituksia</p>
            </section>

            <section id="user-management" className="managementPage-section">
                <h2 className="managementPage-section-title">Käyttäjien hallinta</h2>
                <p>Hallinnoi käyttäjätilejä</p>
            </section>

            <section id="review-moderation" className="managementPage-section">
                <h2 className="managementPage-section-title">Arvosteluiden hallinta</h2>
                <p>Hallinnoi asiakasarvosteluja, moderointi</p>
            </section>
        </div>
    </main>
    )
}

export default ManagementPage;
