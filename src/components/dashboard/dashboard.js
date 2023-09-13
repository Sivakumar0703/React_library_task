import React from 'react'
import Layout from '../pageLayout/layout'
import './dashboard.css'
import PageLayout from '../pageLayout/PageLayout'
import { useNavigate } from 'react-router-dom'
/*
no.of.books
no.of.books.borrowed
no.of.books.pending
no.of.members
*/
const Dashboard = () => {
  const navigate = useNavigate()

  function gotoMembers(){
        navigate('/member')
  }

  function gotoBookList(){
    navigate('/book_list')
}
  return (
    <PageLayout>

     <div className='dashboard_cards' style={{zIndex:'1'}}>

     <div className="card  " style={{width: "18rem"}} onClick={gotoBookList} >
        <img src="https://imgs.6sqft.com/wp-content/uploads/2016/10/14160508/nypl-book-stacks1.jpg" className="card-img-top" alt="" />
          <div className="card-body">
            <p className="card-text">TOTAL NUMBER OF BOOKS AVAILABLE</p>
          </div>
      </div>

      <div className="card " style={{width: "18rem"}}>
        <img src="https://th.bing.com/th/id/OIP.I4sG-MtWXME2Lw3WdWwHuAAAAA?pid=ImgDet&w=278&h=256&rs=1" className="card-img-top" alt="" />
          <div className="card-body">
            <p className="card-text">TOTAL NUMBER OF BOOKS BORROWED</p>
          </div>
      </div>

      <div className="card " style={{width: "18rem"}}>
        <img src="      https://www.channypicture.com/pic/imgsgroup1/M00/B9/9E/DC824796E61666908D6886F657D627BDC6942999A9F6A9F4B2AC14A0C49B05BEBEBEA8CE56AB26D244BE2377CA14CACEA053.jpg
" className="card-img-top" alt="" />
          <div className="card-body">
            <p className="card-text">PENALTY</p>
          </div>
      </div>

      <div className="card " style={{width: "18rem"}} onClick={gotoMembers}>
        <img src="https://th.bing.com/th/id/R.5cae91549f11d109d339ad086dc7347c?rik=KPCqkBRNFDtrpQ&riu=http%3a%2f%2fwww.melbourne.vic.gov.au%2fSiteCollectionImages%2flibrary-membership-card.jpg&ehk=jTESnHeE5NrwZ9EbLAH9MfZGGj9NEYkM9QZuEARm4jg%3d&risl=&pid=ImgRaw&r=0" className="card-img-top" alt="" />
          <div className="card-body">
            <p className="card-text">TOTAL MEMBERS</p>
          </div>
      </div>

     </div>


    </PageLayout>
  )
}

export default Dashboard