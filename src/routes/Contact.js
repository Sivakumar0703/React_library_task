import React from 'react'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { TextField } from '@mui/material'
import { toast } from 'react-toastify';
import SendIcon from '@mui/icons-material/Send';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SignpostIcon from '@mui/icons-material/Signpost';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import FiberPinIcon from '@mui/icons-material/FiberPin';


const contactFormSchemaValidation = yup.object({
    userName: yup.string().min(3, 'name should have minimum 3 character').required("Enter Your Name"),
    email: yup.string().email().required("Enter Email"),
    mobile: yup.string().matches(/^[0-9]{10}/, "Enter valid mobile number").required("Enter Mobile Number"),
    message: yup.string().required('Type your message'),

})

const Contact = () => {


    const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
        initialValues: {
            userName: "",
            email: "",
            mobile: "",
            message: ""

        },

        validationSchema: contactFormSchemaValidation,
        onSubmit: () => contact_form()

    })


    async function contact_form() {

        try {
            toast.success('From Submitted Successfully');
            values.userName = '';
            values.email = '';
            values.mobile = '';
            values.message = '';


        } catch (error) {
            console.log(error)
            toast.error('Form Submission Failed')
        }
    }




    return (

        <div>


            <div className='row d-flex' style={{ justifyContent: "center", alignItems: "center" }}>

                <h1 style={{ textAlign: 'center', marginTop: '50px' }}> Contact Us </h1>

                <div style={{ textAlign: 'center' }}>
                    <p>  Please send your query/suggestion to us. </p>
                </div>

                <div className='contact_form col-md-4 ' >

                    <form onSubmit={handleSubmit}>

                        <TextField id="outlined-basic1" required label="USER NAME" onBlur={handleBlur} variant="outlined" fullWidth margin="normal" name="userName" value={values.userName} onChange={handleChange} /> <br />
                        {touched.userName && errors.userName ? <p className='error-msg' style={{ color: "red" }}>{errors.userName}</p> : <p className='error-msg'> </p>}

                        <TextField id="outlined-basic2" required label="EMAIL" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="email" value={values.email} onChange={handleChange} /> <br />
                        {touched.email && errors.email ? <p className='error-msg' style={{ color: "red" }}>{errors.email}</p> : <p className='error-msg'> </p>}

                        <TextField id="outlined-basic3" required label="MOBILE NUMBER" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="mobile" value={values.mobile} onChange={handleChange} /> <br />
                        {touched.mobile && errors.mobile ? <p className='error-msg' style={{ color: "red" }}>{errors.mobile}</p> : <p className='error-msg'> </p>}


                        <TextField id="standard-multiline-static" required label="Message" variant="outlined" multiline rows={4} onBlur={handleBlur} fullWidth margin="normal" name="message" value={values.message} onChange={handleChange} />
                        {touched.message && errors.message ? <p className='error-msg' style={{ color: "red" }}>{errors.message}</p> : <p className='error-msg'> </p>}

                        <div className='d-flex' style={{ justifyContent: "center", alignItems: "center" }}> <button className='btn btn-primary mb-3 register-btn' type='submit'> SEND <span> <SendIcon /> </span> </button> </div>
                    </form>

                </div>

                <div className='p-3 d-flex justify-content-center flex-column'>
                    <h3>LIBRARY TIMING <span><WatchLaterIcon /></span></h3>
                    <p>MON - 09:00 AM TO 9:00 PM</p>
                    <p>TUE - 09:00 AM TO 9:00 PM</p>
                    <p>WED - 09:00 AM TO 9:00 PM</p>
                    <p>THU - 09:00 AM TO 9:00 PM</p>
                    <p>FRI - 09:00 AM TO 9:00 PM</p>
                    <p>SAT - 09:00 AM TO 7:00 PM</p>
                    <p>SUN - 09:00 AM TO 7:00 PM</p>
                </div>

                <div className='contactbox' style={{ backgroundColor: 'black' }}>
                    <div style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>
                        <h1>OUR LOCATION</h1>
                        <p><span><ApartmentIcon /></span>House No , Street</p>
                        <p><span><SignpostIcon /></span>Area</p>
                        <p><span><FiberPinIcon /></span>Pincode</p>
                        <p><span><LocationOnIcon /></span>City</p>
                        <p><span><LocalPhoneIcon /></span>Contact</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact