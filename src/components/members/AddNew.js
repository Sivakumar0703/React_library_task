import { TextField } from '@mui/material'
import React from 'react'
import PageLayout from '../pageLayout/PageLayout'
import * as yup from 'yup'; 
import { useFormik } from 'formik';
import "../members/addnew.css"
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'
import { toast } from 'react-toastify';

const registerSchemaValidation = yup.object({
  name: yup.string().min(3, 'name should have minimum 3 character').required("Enter Your Name"),
  mobile: yup.string().matches(/^[0-9]{10}/, "Enter valid mobile number").required("Enter Mobile Number"),
  age: yup.string().matches(/^[0-9]{2}/, "Enter valid age").required("Enter Your Age"),
  password: yup.string().min(8, 'enter minimum 8 character').required('not valid'),
  confirmpassword: yup.string().min(8, 'enter minimum 8 character').oneOf([yup.ref('password')], "Password Not Matched").required('Enter Password to Confirm')
})

const AddNew = () => {

  const navigate = useNavigate()
  const date = new Date()
  const today = dayjs(date).format("YYYY-MM-DD")

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
    initialValues: {
      name: "",
      age: "",
      mobile: "",
      password: "",
      confirmpassword: ""
    },

    validationSchema: registerSchemaValidation,
    onSubmit: (newuser) => {
      addMember(newuser)
      console.log(newuser)
      toast.success("Registeration Successful")
      navigate('/')
    }
  })

  async function addMember(newuser) {
    const member = {
      name: newuser.name,
      age: newuser.age,
      mobile: newuser.mobile,
      password: newuser.password,
      last_visit: today
    }
    try {
      const response = await fetch("https://64f036cc8a8b66ecf7794817.mockapi.io/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(member)
      })
      let data = await response.json();
      console.log(data, "new member")
    } catch (error) {
      console.log("adding new user", error)
    }
  }

  return (
    <PageLayout>
      <div className='register-form'>
        <form onSubmit={handleSubmit}>

          <TextField id="outlined-basic1" required label="MEMBER NAME" onBlur={handleBlur} variant="outlined" margin="normal" name="name" value={values.name} onChange={handleChange} /> <br />
          {touched.name && errors.name ? <p className='error-msg' style={{ color: "red" }}>{errors.name}</p> : <p className='error-msg'> </p>}

          <TextField id="outlined-basic1" required label="AGE" onBlur={handleBlur} variant="outlined" margin="normal" name="age" value={values.age} onChange={handleChange} /> <br />
          {touched.age && errors.age ? <p className='error-msg' style={{ color: "red" }}>{errors.age}</p> : <p className='error-msg'> </p>}

          <TextField id="outlined-basic3" required label="MOBILE NUMBER" variant="outlined" onBlur={handleBlur} margin="normal" name="mobile" value={values.mobile} onChange={handleChange} /> <br />
          {touched.mobile && errors.mobile ? <p className='error-msg' style={{ color: "red" }}>{errors.mobile}</p> : <p className='error-msg'> </p>}

          <TextField id="outlined-basic4" required label="PASSWORD" variant="outlined" onBlur={handleBlur} margin="normal" name="password" value={values.password} onChange={handleChange} /> <br />
          {touched.password && errors.password ? <p className='error-msg' style={{ color: "red" }}>{errors.password}</p> : <p className='error-msg'> </p>}

          <TextField id="outlined-basic5" required label="CONFIRM PASSWORD" variant="outlined" onBlur={handleBlur} margin="normal" name="confirmpassword" value={values.confirmpassword} onChange={handleChange} />
          {touched.confirmpassword && errors.confirmpassword ? <p className='error-msg' style={{ color: "red" }}>{errors.confirmpassword}</p> : <p className='error-msg'> </p>} <br />

          <div className='register-btn'> <button className='btn btn-primary mb-3' type='submit'>REGISTER</button>
          </div>
        </form>

      </div>

    </PageLayout>
  )
}

export default AddNew