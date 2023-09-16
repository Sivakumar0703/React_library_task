import React, { useState } from 'react'

const Modal = (data) => {

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [mobile, setMobile] = useState('')

    async function update() {
        data.name = name
        data.age = age
        data.mobile = mobile
    }


    return (
        <div>
            <button className='btn btn-success' data-toggle="modal" data-target="#updateModal" type="button">edit</button>

            {/* modal */}
            <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Update Details</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>UPDATE MEMBER DATA</p>
                            <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                            <input placeholder='Age' value={age} onChange={(e) => setAge(e.target.value)} />
                            <input placeholder='Mobile' value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary"  data-dismiss="modal" >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  
  )
}

export default Modal