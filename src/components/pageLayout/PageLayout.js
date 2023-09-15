import React from 'react'
import Header from '../header/Header'
import Navigation from '../navbar/Navigation'

const PageLayout = ({children}) => {
  return (
    <div>
        <Header />
        <Navigation />
        <div className='content'>
        {children}
        </div>
    </div>
  )
}

export default PageLayout