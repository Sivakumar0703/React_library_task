import React from 'react';
import './layout.css'
import Navigation from '../navbar/Navigation';


const Layout = ({children}) => {
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



        <div className='row'>
        <footer className='col-12 footer'>
            <div>
                <h5>
                Copyright © 2023
                </h5> <br />
                <h5>Follow us on </h5>
            </div>

        </footer>
        </div>
        

    </div>
  )
}

export default Layout