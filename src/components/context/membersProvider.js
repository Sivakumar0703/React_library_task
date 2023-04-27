import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react';


const MemberContext = createContext();

export default function MembersProvider({children}) {

let[member , setMember] = useState([]);

useEffect ( ()=> {
    let getMemberDetail = async() => {
        try{
            let response = await fetch("https://64481e647bb84f5a3e52e498.mockapi.io/members" , {
                method:"GET" });

                let data = await response.json();
                console.log(data);
                setMember(data);
            
        } catch (error){
             console.log(error);
        }
    }
    getMemberDetail();
},[])


  return (
    <MemberContext.Provider>
        value = {{member,setMember}}
        {children}
    </MemberContext.Provider>
  )
}

export const MemberState = () => {
    return useContext(MemberContext)
}
