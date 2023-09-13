import React, { useState, useEffect } from 'react'
import PageLayout from '../pageLayout/PageLayout';
import Table from 'react-bootstrap/Table';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import Modal from '../table_modal/Modal';

const Member = () => {
    // https://64f036cc8a8b66ecf7794817.mockapi.io/members

    const [member, setMember] = useState([])
    const [search, setSearch] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [mobile, setMobile] = useState('')
    const [updateData, setUpdateData] = useState(null)
    const [trigger , setTrigger] = useState(false)
    const navigate = useNavigate()

    //  set value for modal
    function setUpdateModalValue(memberData) {
        setName(memberData.name)
        setAge(memberData.age)
        setMobile(memberData.mobile)
        setUpdateData(memberData)
    }

    // update member data
    async function update() {
        updateData.name = name
        updateData.age = age
        updateData.mobile = mobile
        // console.log("updated", updateData)
        const id = updateData.id
        console.log("member" , member)
        try {
            const response = await fetch(`https://64f036cc8a8b66ecf7794817.mockapi.io/members/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(updateData)
            })
            let data = await response.json()
            console.log("updated on db", data)
            console.log("member" , member)
            setTrigger(!trigger)
        } catch (error) {
            console.log("error in finding member", error)
        }
    }



    useEffect(() => {

        const memberData = async () => {
            try {
                const response = await fetch("https://64f036cc8a8b66ecf7794817.mockapi.io/members", {
                    method: "GET"
                });

                let data = await response.json();
                setMember(data);
                // console.log(data[0].books)
                console.log(data)
                // if(data.borrowed_books.filter((i) => {
                //     const a = "UNNAI"
                //     i.toLowerCase().includes(search.toLowerCase()) 
                //     console.log(i.toLowerCase()) 
                //     console.log(a.toLowerCase()) 
                //     console.log(i.toLowerCase().includes(a.toLowerCase()) )
                // })){
                //     console.log(search , 'match')
                // }
            } catch (error) {
                console.log(error);
            }
        }

        memberData();

    }, [trigger]);

    return (
        
        <PageLayout>
            <div className='member-page'>


            <div className='search-bar'>
                <input type='search' placeholder='Search here...' value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            <div className='add-new-member'>
                {/* <button className='btn btn-success' onClick={(data)=>addMember(data)}>ADD</button> */}
            </div>

            <div className='return-book'>
                <button className='btn btn-success' onClick={() => navigate('/return_books')}>Return</button>
            </div>

            <div className='get-book'>
                <button className='btn btn-danger' onClick={() => navigate('/get_books')}>Get</button>
            </div>


            <div className='member-list'>
{/*  
                {
                    member ? (
                        <Table striped responsive className='mb-3 mt-3 '>
                            <thead>
                                <tr>
                                    <th>SI.NO</th>
                                    <th>NAME</th>
                                    <th>AGE</th>
                                    <th>CONTACT</th>
                                    <th>BORROWED BOOKS COUNT</th>
                                    <th>BORROWED BOOKS</th>
                                    <th>LAST VISIT</th>
                                    <th>EDIT</th>
                                </tr>
                            </thead>
                            <tbody>{ member && member.filter(item => {
                                if (search === '') {
                                    return item
                                } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
                                    return item
                                }
                                // else if (item.books.filter((i) => {
                                //     i.toLowerCase().includes(search.toLowerCase())  
                                //     if(i.toLowerCase().includes(search.toLowerCase())){
                                //         return item  
                                //     }  
                                // })) {
                                //     return item
                                // }
                                else if (item.contact.includes(search)) {
                                    return item
                                }
                            })

                            .map((item, index) => {
                                    return (
                                        <tr key={item._id}>
                                            <td> {index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.age}</td>
                                            <td>{item.mobile}</td>
                                            <td>{item.borrowed_books?.length}</td>
                                            <td>{item.borrowed_books.map((i, index) => {
                                                return index + 1 + ") " + i.book + " "
                                                // return index + 1 + ") " + i + " "
                                            })}</td>
                                            <td>{item.last_visit}</td>
                                            <td> <button className='btn btn-warning' data-toggle="modal" data-target="#updateModal" type="button" onClick={() => setUpdateModalValue(item)}> edit </button>  </td>
                                        </tr>

                                    )
                                })}


                            </tbody>
                        </Table>) : "Loading..."} */}

                {/* modal to update member data */}

                <div className="modal fade" id="updateModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Update Details</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>UPDATE MEMBER DATA</p>
                                <input placeholder='Name' type='text'   className='mb-2' value={name} onChange={(e) => setName(e.target.value)} /> <br />
                                <input placeholder='Age' type='number' className='mb-2' value={age} onChange={(e) => setAge(e.target.value)} /> <br />
                                <input placeholder='Mobile' type='number' className='mb-2' value={mobile} onChange={(e) => setMobile(e.target.value)} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={update} >Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
            </div>
        </PageLayout>
      
    )
}

export default Member