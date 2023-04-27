import React from 'react';
import './layout.css'


const Layout = ({children}) => {
  return (
    <div className='layout'>

        <div className='row'>
        <header className='header  col-12'>
            <h1>UNIVERSAL LIBRARY</h1>
        </header>
        </div>

        <div className='row'>
        <div className='navbar  col-12'>
              <button>HOME</button>
              <button>BOOKS</button>
              <button>MEMBERS</button>
              <button>CONTACT US</button>
        </div>
        </div>

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