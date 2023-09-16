import React from 'react'
import './dashboard.css'
import PageLayout from '../pageLayout/PageLayout'
import { useNavigate } from 'react-router-dom'
import Carousell from '../carousel/Carousel'


const Dashboard = () => {
  const navigate = useNavigate()

  function gotoMembers() {
    navigate('/member')
  }

  function gotoBookList() {
    navigate('/book_list')
  }

  function gotoPenalty() {
    navigate('/penalty')
  }

  function bookStatus() {
    navigate('/books_status')
  }

  return (
    <PageLayout>

      <Carousell />

      <div className='dashboard_cards' style={{ zIndex: '1' }}>

        <div className="card  " style={{ width: "18rem" }} onClick={gotoBookList} >
          <img src={require('./books.jpg')} className="card-img-top" alt="" />
          <div className="card-body">
            <p className="card-text">TOTAL NUMBER OF BOOKS AVAILABLE</p>
          </div>
        </div>

        <div className="card " style={{ width: "18rem" }}>
          <img src={require('./trolly.jpeg')} className="card-img-top" alt="" />
          <div className="card-body" onClick={bookStatus}>
            <p className="card-text">TOTAL NUMBER OF BOOKS BORROWED</p>
          </div>
        </div>

        <div className="card " style={{ width: "18rem" }}>
          <img src={require('./clock.jpg')} className="card-img-top" alt="" />
          <div className="card-body" onClick={gotoPenalty}>
            <p className="card-text">PENALTY</p>
          </div>
        </div>

        <div className="card " style={{ width: "18rem" }} onClick={gotoMembers}>
          <img src={require('./card.jpeg')} className="card-img-top" alt="" />
          <div className="card-body">
            <p className="card-text">TOTAL MEMBERS</p>
          </div>
        </div>

      </div>


      <div className='lib'>
        <h3>Why is the library better than the internet?</h3>
        <p className='left-side-content'>
          There are several reasons why the library is better than the internet when it comes to
          finding information. First, the information you see in the library has been carefully compiled
          and checked for accuracy by trained librarians. This means that you can trust that the information
          you find in the library is reliable and up-to-date
        </p>

        <p className='right-side-content'>
          Second, the library offers a wider range of resources than the internet. In addition to books, you can
          find journals, newspapers, and other materials that are not easily accessible online. This means you
          can explore a variety of perspectives and sources to gain a more comprehensive understanding of a topic
        </p>

        <p className='left-side-content'>
          Third, the library provides a quiet, focused learning and research space. You can work without distractions
          or interruptions to concentrate and learn more effectively
        </p>

        <p className='right-side-content'>
          Finally, the library offers a wealth of assistance and support in finding the necessary information.
          The librarians are experts at finding and organizing information and are always available to assist
          you in your research
        </p>
      </div>


    </PageLayout>
  )
}

export default Dashboard