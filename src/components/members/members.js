import React, { useState } from 'react'
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit'; // mui icon
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { MemberState } from '../context/membersProvider';

// from mui
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Members = () => {


    const [memberDetail, setMemberDetail] = useState([]);
    const [search, setsearch] = useState('');
    const [editId, setEditId] = useState(-1); // new
    

  //  let{member , setMember} = MemberState();

    const[name,setName] = useState('');
    const[age,setAge] = useState(0);
    const[borrowed,setBorrowed] = useState(0);
    const[books,setBooks] = useState('');
    const[lastvisit,setLastVisit] = useState('');
    const[contact,setContact] = useState(0);

    useEffect(() => {

        const memberData = async () => {
            try {
                const response = await fetch("https://64481e647bb84f5a3e52e498.mockapi.io/members", {
                    method: "GET"
                });

                let data = await response.json();
                setMemberDetail(data);
            } catch (error) {
                console.log(error);
            }
        }

        memberData();

    }, []);
    //new
   
    const editOperation = (id) => {
        setEditId(id)
        let edit = memberDetail.find((mem) => mem.id === id)

        useEffect(()=>{
            setName(edit.name),
            setAge(edit.age),
            setBorrowed(edit.borrowed),
            setBooks(edit.books),
            setLastVisit(edit.lastvisit),
            setContact(edit.contact)
        })

    }

const updateMembers = () => {
    axios.put('https://64481e647bb84f5a3e52e498.mockapi.io/members'+editId,{id:editId , name,age,borrowed,books,lastvisit,contact})
    .then(res => {
        console.log(res);
        setEditId(-1);
    }).catch( error => console.log(error));

}


    return (
        <div>

            <input type='text' placeholder='search for member' onChange={e => setsearch(e.target.value)} />



            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>S.NO</StyledTableCell>
                            <StyledTableCell>NAME</StyledTableCell>
                            <StyledTableCell>AGE</StyledTableCell>
                            <StyledTableCell>BORROWED</StyledTableCell>
                            <StyledTableCell>BOOKS</StyledTableCell>
                            <StyledTableCell>LAST VISIT</StyledTableCell>
                            <StyledTableCell>CONTACT</StyledTableCell>
                            <StyledTableCell>EDIT</StyledTableCell>
                            <StyledTableCell>DELETE</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {memberDetail.filter(item => {
                            if (search == '') {
                                return item
                            } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
                                return item
                            }

                        })
                            .map((item) => {
                               
                                return (

                                    item.id === editId ?
                                    <StyledTableRow>
                                        <StyledTableCell>{item.id}</StyledTableCell>
                                        
                                        <StyledTableCell><input type="text" value={item.name} onChange={e => setName(e.target.value) }/></StyledTableCell>
                                        <StyledTableCell><input type="number" value={item.age} onChange={e => setAge(e.target.value) }/></StyledTableCell>
                                        <StyledTableCell><input type="number" value={item.barrowed} onChange={e => setBorrowed(e.target.value) }/></StyledTableCell>
                                        <StyledTableCell><input type="text" value={item.books} onChange={e => setBooks(e.target.value) }/></StyledTableCell>
                                        <StyledTableCell><input type="text" value={item.lastvisit} onChange={e => setLastVisit(e.target.value) }/></StyledTableCell>
                                        <StyledTableCell><input type="number" value={item.contact} onChange={e => setContact(e.target.value) }/></StyledTableCell>
                                        <StyledTableCell><button onClick={updateMembers}>UPDATE</button></StyledTableCell>
                                    </StyledTableRow>
                                    :

                                    <StyledTableRow key={item.id}>

                                        <StyledTableCell>{item.id}</StyledTableCell>
                                        <StyledTableCell>{item.name}</StyledTableCell>
                                        <StyledTableCell>{item.age}</StyledTableCell>
                                        <StyledTableCell>{item.borrowed}</StyledTableCell>
                                        <StyledTableCell>{item.books}</StyledTableCell>
                                        <StyledTableCell>{item.lastvisit}</StyledTableCell>
                                        <StyledTableCell>{item.contact}</StyledTableCell>
                                        <StyledTableCell><EditIcon
                                            onClick={() => editOperation(item.id)}
                                        /></StyledTableCell>
                                        <StyledTableCell><DeleteIcon /></StyledTableCell>
                                    </StyledTableRow>
                                )
                            })}


                    </TableBody>
                </Table>
            </TableContainer>





        </div>
    )
}

export default Members