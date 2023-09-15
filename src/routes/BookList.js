import React, { useState, useEffect } from 'react'
import PageLayout from '../components/pageLayout/PageLayout'
import "../routes/booklist.css"
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

const BookList = () => {

    const [books, setBooks] = useState([])
    const [search , setSearch] = useState('')
    const [trigger , setTrigger] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {

        const memberData = async () => {
            try {
                const response = await fetch("https://64f036cc8a8b66ecf7794817.mockapi.io/books", {
                    method: "GET",

                });

                let data = await response.json();
                setBooks(data);
                console.log(data)
            } catch (error) {
                console.log(error);
            }
        }

        memberData();

    }, [trigger]);

    async function deleteBook(id){
        try {
            const response = await fetch(`https://64f036cc8a8b66ecf7794817.mockapi.io/books/${id}`, {
                method: "DELETE",
        })
        setTrigger(!trigger)
        toast.success('Removed successfully')
        } catch (error) {
            toast.error("Error in Deleting Books")
        }

    }

    function addBook(){
        navigate('/add_book')
    }
    return (
        <div>
            <PageLayout>
            <input placeholder='search for Book/Author' value={search} onChange={(e)=> setSearch(e.target.value)} className='search-box'/>

            <button className='btn btn-primary' onClick={addBook}>ADD BOOKS</button>

            <div className='card-container'>
                {
                    books ? (
                        books.filter(item => {
                            if (search === '') {
                                return item
                            } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
                                return item
                            }
                            else if (item.author?.toLowerCase().includes(search.toLowerCase())) {
                                return item
                            }
                        })
                        
                            .map((i) => {
                                return (

                            <div className="card">
                                <img className="card-img-top" src={require("../routes/bookImage.jpeg")} alt="books" />
                                <div className="card-body">
                                    <h5 className="card-title">{i.name}</h5>
                                    <p>Author: {i.author}</p>

                                    {
                                        i.status ? (<button className='btn btn-success'>Available</button>) : (<button className='btn btn-danger'>N/A</button>)
                                    }

                                    <button className='btn btn-danger m-2' onClick={()=>deleteBook(i.id)}><DeleteIcon/></button>

                                </div>
                            </div>

                            )
                            }
                            )

                    ) : (
                        <p>loading...</p>
                    )
                }

</div>
            </PageLayout>
        </div>
    )
}

export default BookList