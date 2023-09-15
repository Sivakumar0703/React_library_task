

import React from 'react'

const Navigation = () => {
    return (
        <div style={{ zIndex: '2', position: 'relative' }}>
            <div className='container-fluid'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">

                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/book_list">Books</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/member">Members</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/contact">Contact</a>
                            </li>

                        </ul>
                    </div>

                </nav>

            </div>

        </div>
    )
}

export default Navigation