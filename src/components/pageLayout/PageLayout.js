import React from 'react'
import Header from '../header/Header'
import Navigation from '../navbar/Navigation'
import Footer from '../footer/Footer'

const PageLayout = ({children}) => {
  return (
    <div>
        <Header />
        <Navigation />
        <div className='content'>
        {children}
        </div>
        {/* <Footer /> */}
    </div>
  )
}

export default PageLayout