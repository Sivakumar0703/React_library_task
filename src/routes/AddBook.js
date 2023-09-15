import { TextField } from '@mui/material'
import React from 'react'
import PageLayout from '../components/pageLayout/PageLayout'
import * as yup from 'yup'; 
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const registerSchemaValidation = yup.object({
    name: yup.string().required("Enter The Book Name"),
    author: yup.string().required("Enter The Author Name"),
    url: yup.string().required("Enter The Image Url"),
})

const AddBook = () => {

    const navigate = useNavigate()


    const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
        initialValues: {
            name: "",
            author: "",
            url: ""
        },

        validationSchema: registerSchemaValidation,
        onSubmit: (newBook) => {
            addBook(newBook)
            console.log(newBook)
            navigate('/')
        }
    })

    async function addBook(newBook) {
        const book = {
            name: newBook.name,
            author: newBook.author,
            url: newBook.url,
            status: true
        }
        try {
            const response = await fetch("https://64f036cc8a8b66ecf7794817.mockapi.io/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(book)
            })
            let data = await response.json();
            console.log(data, "new book")
            toast.success('Book Added Successfully')
        } catch (error) {
            toast.error('Error in Adding Book')
        }
    }

    return (
        <PageLayout>
            <div className='register-form'>
                <form onSubmit={handleSubmit}>

                    <TextField id="outlined-basic1" required label="NAME" onBlur={handleBlur} variant="outlined" margin="normal" name="name" value={values.name} onChange={handleChange} /> <br />
                    {touched.name && errors.name ? <p className='error-msg' style={{ color: "red" }}>{errors.name}</p> : <p className='error-msg'> </p>}

                    <TextField id="outlined-basic1" required label="AUTHOR" onBlur={handleBlur} variant="outlined" margin="normal" name="author" value={values.author} onChange={handleChange} /> <br />
                    {touched.author && errors.author ? <p className='error-msg' style={{ color: "red" }}>{errors.author}</p> : <p className='error-msg'> </p>}

                    <TextField id="outlined-basic3" required label="URL" variant="outlined" onBlur={handleBlur} margin="normal" name="url" value={values.url} onChange={handleChange} /> <br />
                    {touched.url && errors.url ? <p className='error-msg' style={{ color: "red" }}>{errors.url}</p> : <p className='error-msg'> </p>}

                    <div className='register-btn'> <button className='btn btn-primary mb-3' type='submit'>Add Book</button>
                    </div>
                </form>

            </div>

        </PageLayout>
    )
}

export default AddBook