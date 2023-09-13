import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import "../members/members.css"
import MenuBookIcon from '@mui/icons-material/MenuBook';
import dayjs from 'dayjs';
import { Autocomplete, TextField, Box, MenuItem, FormControl, Select, InputLabel } from '@mui/material';

const ReturnBook = () => {
    const [id, setId] = useState('');
    const [addBooks, setAddBooks] = useState([]) // books that are to be added in member account
    const [member, setMember] = useState({})
    const [showTable, setShowTable] = useState(false);
    const [booksAvailable, setBooksAvailable] = useState([]) // storing data taken from db
    // const inStock = [];
    // console.log('selected books',addBooks)
    const date = new Date()
    const today = dayjs(date).format("YYYY-MM-DD")
    const [selectedBook, setSelectedBook] = useState(null) // selected from option
    const [availableBooks, setAvailableBooks] = useState(null) // available books (Array of object)
    const [availableBookName , setAvailableBookName] = useState([]) // book names taken from array of object
    // const top100Films = ["hhkjd", "sckjs", "jdkd"]
  

    // console.log(inStock , 'instock - oprion')
    // const defaultProps = {
        
    //     options: bookAry,
    //     getOptionLabel: (option) => option.name,
    //     isOptionEqualToValue: (options, value) => options?.value === value?.value
    // };

    function handleSelect(e, selected) {
        // setSelectBook(selected)
        if(selected !== null){
            console.log(selected , 'set select')
           return setSelectedBook(selected)
        }
    }

    // function inStockBooks(data){
    //     if(data.status === true){
    //         return inStock.push(data.name)
    //     }
    // }
    // console.log("stock" , inStock)

    function getBookList() {
        // const inStock = booksAvailable.filter(inStockBooks)
        const inStock = booksAvailable.filter((item) => item.status === true)
        // bookAry = inStock
        console.log(inStock, "in stock", availableBooks)
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
            console.log(data)
            setMember(data)
            setShowTable(true)
        } catch (error) {
            console.log("error in finding member", error)
        }
    }


    // update member borrowed book detail
    async function update(index) {
        const updated_bookList = member.borrowed_books?.splice(index, 1)
        console.log("removed :", updated_bookList, "remains :", member)
        try {
            const response = await fetch(`https://64f036cc8a8b66ecf7794817.mockapi.io/members/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(member)
            })
            let data = await response.json()
            console.log("updated on db", data)
            setMember(data)

        } catch (error) {
            console.log("error in finding member", error)
        }
    }

    // add new books to member account
    async function addNewBooks() {
        // const str = addBooks.split(',');
        const newObj = {date:today , book:selectedBook.name}
        const updated_bookList = member.borrowed_books?.push(newObj)
        member.last_visit = today;

        console.log("new book :", updated_bookList, "remains :", member, newObj)
        console.log('add book function' , selectedBook , typeof(selectedBook))
        setSelectedBook(null)
      
        // try {
        //     const response = await fetch(`https://64f036cc8a8b66ecf7794817.mockapi.io/members/${id}`, {
        //         method: "PUT",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },

        //         body: JSON.stringify(member)
        //     })
        //     let data = await response.json()
        //     console.log("updated on db", data)
        //     setMember(data)
        //     setAddBooks([])
            // 
            // to change the status of book
            // try {
            //     const response = await fetch(`https://64f036cc8a8b66ecf7794817.mockapi.io/books/${id}`, {
            //     method: "PUT",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },

            //     body: JSON.stringify(member)
            // })
                
            // } catch (error) {
            //     console.log("error in changing the status of changing book status")
            // }
        // } catch (error) {
        //     console.log("error in finding member", error)
        // }
    }

    // function getBooksName(book) {
    //     if (book.status === true) {
    //         return book.name
    //     }
    // }



console.log(availableBookName , 'ans')
    useEffect(() => {

        // get all available books
        async function getBooks() {

            try {
                const response = await fetch(`https://64f036cc8a8b66ecf7794817.mockapi.io/books`, {
                    method: "GET",
                })

                let data = await response.json()
                console.log("avilable books", data)
                setBooksAvailable(data)
                let available = data.filter((book) => book.status === true)

                setAvailableBooks(available)

                setAvailableBookName(available.map((i)=>(i.name)))


                console.log(available, "use effect", availableBooks)

            } catch (error) {
                console.log("error in fetching available books", error)
            }
        }
        getBooks()



    }, [])



    return (
        <div className='return-book-container'>
            <div>
                <input placeholder='enter id' value={id} onChange={(e) => setId(e.target.value)} />
            </div> <br />

            <div>
                <button onClick={getMember} className='btn btn-warning'>FIND</button>
            </div> <br />

            <div style={{ backgroundColor: 'yellowgreen' }}>





                {showTable ? (
                    <>

                        <div>
                            <button className='btn btn-success' data-toggle="modal" data-target="#exampleModalCenter" type="button" onClick={getBookList}>+ <MenuBookIcon /></button>

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
                                            {/* <p>If your adding more than one book please use comma ( , ) for seperation</p> */}
                                            {/* <input placeholder='Enter Book Name' value={addBooks} onChange={((e) => setAddBooks(e.target.value))} /> <br /> */}

                                            {/* <Box>
    <TextField 
    label="Select Books"
    value={selectBook}
    onChange={(e) => setSelectBook(e.target.value)}
    select
    SelectProps={{ multiple:true}}
    sx={{width:"250px"}}
    disableEnforceFocus
    >
        { bookAry.map((book) =>(
           
                <MenuItem key={book.id} value={book.name}>
                   {book.name}
                </MenuItem>
            )
        )} 
        </TextField>

</Box> */}


                                            {/* <Autocomplete   
    options={bookAry}
    disablePortal
    id="combo-box-demo"
    // getOptionLabel={(options)=>options}
    // isOptionEqualToValue={(options,value)=>options?.value === value?.value}
    value={selectBook}
    onChange={handleSelect}
    renderInput={(params)=>(
        <TextField {...params} label="select books" />
    )}
    /> */}

                                            <Autocomplete
                                                // {...defaultProps}
                                           
                                                disablePortal
                                                options={availableBooks}
                                                  getOptionLabel = {(option) => option.name}
                                                  isOptionEqualToValue = { (options,value)=>options?.value === value?.value }
                                               
                                                id="combo-box-demo"
                                                sx={{ width: 300 }}
                                                value={selectedBook}
                                                onChange={handleSelect}
                                                renderInput={(params) => <TextField {...params} label="Select Book" />}
                                            />


                                            {console.log(selectedBook, 'selected')}






                                          
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
                                    <th colSpan={3} style={{ textAlign: 'center', color: 'red' }}>{member.name?.toUpperCase()}</th>
                                </tr>
                                <tr>
                                    <th>SI.NO</th>
                                    <th>book</th>
                                    <th>Return</th>
                                </tr>
                            </thead>
  
                            <tbody>

                                {
                                    member.borrowed_books?.map((i, index) => {
                                        console.log(i , "table" , i.book)
                                        return (
                                            
                                            <tr key={i.book+i.date+index}>
                                                <td>{index + 1}</td>
                                                <td>{i.book}</td>
                                                <td> <button  onClick={() => update(index)}>delete</button>  </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody> 
                        </Table> 
                    </>

                ) : (
                    ''
                )

                }
                 



            </div>
        </div>
    )
}

export default ReturnBook