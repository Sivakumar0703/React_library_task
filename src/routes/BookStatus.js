import React, { useState, useEffect } from 'react'
import PageLayout from '../components/pageLayout/PageLayout';

const BookStatus = () => {

    const [books, setBooks] = useState([])

    useEffect(() => {

        const bookData = async () => {
            try {
                const response = await fetch("https://64f036cc8a8b66ecf7794817.mockapi.io/books", {
                    method: "GET"
                });

                let data = await response.json();
                setBooks(data);

            } catch (error) {
               alert('Error in fetching books data');
            }
        }

        bookData();

    }, []);



    return (
        <div className='book_status'>
            <PageLayout>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <div>
                        <h3>
                            <span>📚</span>  TOTAL BOOKS : {books?.length}
                        </h3>

                        <h3>
                            <span>📚</span>   TOTAL NUMBER OF BOOKS TAKEN BY READERS : {books?.filter(i => i.status === false).length}
                        </h3>

                        <h3>
                            <span>📚</span>   TOTAL BOOKS AVAILABLE IN LIBRRAY : {books?.filter(i => i.status === true).length}
                        </h3>
                    </div>
                </div>

            </PageLayout>

        </div>
    )
}

export default BookStatus