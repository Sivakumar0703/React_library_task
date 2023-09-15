import React, { useEffect, useState } from 'react'
import PageLayout from '../components/pageLayout/PageLayout'
import dayjs from 'dayjs'
import { Table } from 'react-bootstrap'
import "../App.css"
import { useNavigate } from 'react-router-dom'

const Penalty = () => {

    const [members, setMembers] = useState([])
    const date = new Date()
    const today = dayjs(date).format("YYYY-MM-DD")
    const [memberId, setMemberId] = useState('')
    const [user, setUser] = useState(null)
    const [total, setTotal] = useState([])
    const navigate = useNavigate()

    function calculateDays(date) {
        const d1 = dayjs(date);
        const d2 = dayjs(today);
        const time = d2.diff(d1)
        const days = Math.ceil(time / (1000 * 60 * 60 * 24)) // converting milliSecond to days
        if (days > 15) {
            total.push((days - 15) * 5)
            return (days - 15) * 5
        }
        return "Nil"
    }


    function getMember() {
        if (memberId === '') {
            return alert("Please Enter Valid Id")
        }

        const data = members.filter((i) => i.id === memberId)
        console.log(data)
        setUser(...data)
        setTotal([])

    }



    async function payment(user) {
        console.log(user)
        localStorage.setItem('userId', JSON.stringify(user.id))
        navigate('/return_books')
    }

    useEffect(() => {
        async function getMember() {

            try {
                const response = await fetch(`https://64f036cc8a8b66ecf7794817.mockapi.io/members`, {
                    method: "GET",
                })

                let data = await response.json()
                console.log("members", data)
                setMembers(data)


            } catch (error) {
                console.log("error in fetching available books", error)
            }
        }
        getMember()

    }, [])
    return (
        <div>
            <PageLayout>


                <div>
                    <input placeholder='Enter Member ID' value={memberId} onChange={e => setMemberId(e.target.value)} />
                    {/* <button onClick={getMember}>show detail</button> */}
                </div>




                {
                    members ? (
                        <Table variant="dark" hover responsive >
                            <thead>
                                <tr>
                                    <td>SI.NO</td>
                                    <td>Name</td>
                                    <td>BOOK</td>
                                    <td>DATE</td>
                                    <td>PANALTY</td>
                                    <td>PAYMENT</td>
                                </tr>

                            </thead>
                            <tbody>
                                {members && members.filter(item => {
                                    if (memberId === '') {
                                        return item
                                    } else if (item.name.toLowerCase().includes(memberId.toLowerCase())) {
                                        return item
                                    } else if (item.id.includes(memberId)) {
                                        return item
                                    }
                                })

                                    .map((i, index) => (
                                        <tr key={i.name + i.id}>
                                            <td>{index + 1}</td>
                                            <td>{i.name.toUpperCase()}</td>

                                            <td>{i.borrowed_books?.map((book) => (
                                                <Table key={book.book} variant="dark" responsive >
                                                    <tbody>
                                                        <tr>
                                                            <td>{book.book.toUpperCase()}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            ))}</td>

                                            <td>{i.borrowed_books?.map((book) => (
                                                <Table key={book.date + book.book} variant="dark" responsive>
                                                    <tbody>
                                                        <tr>
                                                            <td>{book.date}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            ))}</td>

                                            <td>{i.borrowed_books?.map((book, index) => (
                                                <Table key={book.book + index} variant="dark" responsive>
                                                    <tbody>
                                                        <tr>
                                                            <td>{calculateDays(book.date)}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            ))}</td>

                                            <td>
                                                <button className='btn btn-success' onClick={() => payment(i)}>Pay</button>
                                            </td>

                                        </tr>
                                    ))
                                }

                            </tbody>
                        </Table>

                    ) : (
                        " "
                    )
                }

            </PageLayout>
        </div>
    )
}

export default Penalty