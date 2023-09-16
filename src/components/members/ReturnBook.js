import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import "../members/members.css"
import MenuBookIcon from '@mui/icons-material/MenuBook';
import dayjs from 'dayjs';
import { Autocomplete, TextField } from '@mui/material';
import PageLayout from '../pageLayout/PageLayout';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';


const ReturnBook = () => {

    const val = JSON.parse(localStorage.getItem('userId'))
    console.log(val, 'val')

    const [id, setId] = useState(val);
    const [member, setMember] = useState({})
    const [showTable, setShowTable] = useState(false);
    const [booksAvailable, setBooksAvailable] = useState([]) // storing data taken from db

    const date = new Date()
    const today = dayjs(date).format("YYYY-MM-DD")
    const [selectedBook, setSelectedBook] = useState(null) // selected from option
    const [availableBooks, setAvailableBooks] = useState(null) // available books (Array of object)
    const [availableBookName, setAvailableBookName] = useState([]) // book names taken from array of object
    const [render, setRender] = useState(false)



    function handleSelect(e, selected) {
        if (selected !== null) {
            return setSelectedBook(selected)
        }
    }



    function getBookList() {
        const inStock = booksAvailable.filter((item) => item.status === true)
    }


    async function getMember() {
        if (id === '') {
            return alert("Input Not Valid")
        }

        try {
            const response = await fetch(`https://64f036cc8a8b66ecf7794817.mockapi.io/members/${id}`, {
                method: "GET"
            })
            let data = await response.json()
            setMember(data)
            setShowTable(true)
        } catch (error) {
            toast.error('Error in Finding Member')
        }
    }


    // update member borrowed book detail
    async function update(book, index) {
        const updated_bookList = member.borrowed_books?.splice(index, 1)

        try {
            const response = await fetch(`https://64f036cc8a8b66ecf7794817.mockapi.io/members/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(member)
            })
            let data = await response.json()
            setMember(data)

            // to change the status of book
            const bookId = book.bookId;

            try {
                const response = await fetch(`https://64f036cc8a8b66ecf7794817.mockapi.io/books/${bookId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({ status: true })
                })

                setRender(!render)
            } catch (error) {
                toast.error('Error in changing the status of changing book status')
            }

        } catch (error) {
            toast.error('Error in Finding Member')
        }
    }

    // add new books to member account
    async function addNewBooks() {
        const newObj = { date: today, book: selectedBook.name, bookId: selectedBook.id }
        const updated_bookList = member.borrowed_books?.push(newObj)
        member.last_visit = today;


        try {
            const response = await fetch(`https://64f036cc8a8b66ecf7794817.mockapi.io/members/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(member)
            })
            let data = await response.json()
            setMember(data)

            // to change the status of book
            const bookId = selectedBook.id;
            selectedBook.status = false;
            try {
                const response = await fetch(`https://64f036cc8a8b66ecf7794817.mockapi.io/books/${bookId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(selectedBook)
                })
                setSelectedBook(null)
                setRender(!render)
            } catch (error) {
                toast.error("Error in changing the status of changing book status")
            }
        } catch (error) {
            toast.error("Error in finding member")
        }
    }






    console.log(availableBookName, 'ans')
    useEffect(() => {

        // get all available books
        async function getBooks() {

            try {
                const response = await fetch(`https://64f036cc8a8b66ecf7794817.mockapi.io/books`, {
                    method: "GET",
                })

                let data = await response.json()
                setBooksAvailable(data)
                let available = data.filter((book) => book.status === true)

                setAvailableBooks(available)

                setAvailableBookName(available.map((i) => (i.name)))

            } catch (error) {
                toast.error("Error in fetching available books")
            }
        }
        getBooks()

        getMember()

    }, [render])



    return (
        <PageLayout>
            <div className='return-book-container'>

                <div style={{ backgroundColor: 'yellowgreen' }}>

                    {showTable ? (
                        <>

                            <div>
                               
                                {/* modal */}
                                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLongTitle">ADD NEW BOOKS</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">

                                                <Autocomplete
                                                    disablePortal
                                                    options={availableBooks}
                                                    getOptionLabel={(option) => option.name}
                                                    isOptionEqualToValue={(options, value) => options?.value === value?.value}

                                                    id="combo-box-demo"
                                                    sx={{ width: 300 }}
                                                    value={selectedBook}
                                                    onChange={handleSelect}
                                                    renderInput={(params) => <TextField {...params} label="Select Book" />}
                                                />


                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" onClick={addNewBooks} data-dismiss="modal" >Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th colSpan={3} style={{ textAlign: 'center', color: 'red' }}>
                                            {member.name?.toUpperCase()}
                                            <button className='btn btn-success' data-toggle="modal" data-target="#exampleModalCenter" type="button" onClick={getBookList} style={{margin:'5px'}}>+ <MenuBookIcon /></button>

                                        </th>
                                    </tr>
                                    <tr>
                                        <th>SI.NO</th>
                                        <th>Book</th>
                                        <th>Return</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        member.borrowed_books?.map((i, index) => {
                                            console.log(i, "table", i.book)
                                            return (

                                                <tr key={i.book + i.date + index}>
                                                    <td>{index + 1}</td>
                                                    <td>{i.book.toUpperCase()}</td>
                                                    <td> <button className='btn btn-danger' onClick={() => update(i, index)}><DeleteIcon/></button>  </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </>

                    ) : (
                        'Loading...'
                    )

                    }

                </div>
            </div>
        </PageLayout>
    )
}

export default ReturnBook