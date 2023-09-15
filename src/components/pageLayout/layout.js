import React from 'react';
import './layout.css'
import Navigation from '../navbar/Navigation';


const Layout = ({ children }) => {
    return (
        <div className='layout'>

            <div className='row'>
                <header className='header col-12'>
                    <h1>UNIVERSAL LIBRARY</h1>
                </header>
            </div>

            <Navigation />

            <div className='content'>
                {children}
            </div>



        </div>
    )
}

export default Layout