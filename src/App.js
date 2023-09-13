
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard/dashboard';
import Navigation from './components/navbar/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Member from './components/members/Member';
// import AddNew from './components/members/AddNew';
import ReturnBook from './components/members/ReturnBook';
import GetBooks from './components/members/GetBooks';
import BookList from './routes/BookList';
// import Members from './components/members/members';
// import Members from './components/members/members2';


function App() {
  return (
    <div className="App">
      {/* <Dashboard /> */}
  {/* <Members /> */}
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Dashboard />} />
    <Route path='/member' element={<Member />} />
    <Route path='/nav' element={<Navigation />} />
    {/* <Route path='/new_member' element={<AddNew />} /> */}
    <Route path='/return_books' element={<ReturnBook />} />
    <Route path='/get_books' element={<GetBooks />} />
    <Route path='/book_list' element={<BookList />} />
  </Routes>
  </BrowserRouter>

     
    
    </div>
  );
}

export default App;
