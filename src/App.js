
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard/dashboard';
import Navigation from './components/navbar/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Member from './components/members/Member';
import AddNew from './components/members/AddNew';
import ReturnBook from './components/members/ReturnBook';
import BookList from './routes/BookList';
import Penalty from './routes/Penalty';
import BookStatus from './routes/BookStatus';
import AddBook from './routes/AddBook';
import Contact from './routes/Contact';
import Errorpage from './routes/ErrorPage';



function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/member' element={<Member />} />
          <Route path='/nav' element={<Navigation />} />
          <Route path='/new_member' element={<AddNew />} />
          <Route path='/return_books' element={<ReturnBook />} />
          <Route path='/book_list' element={<BookList />} />
          <Route path='/penalty' element={<Penalty />} />
          <Route path='/books_status' element={<BookStatus />} />
          <Route path='/add_book' element={<AddBook />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<Errorpage />} />
        </Routes>
      </BrowserRouter>



    </div>
  );
}

export default App;
