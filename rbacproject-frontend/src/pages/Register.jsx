import React, { useState } from 'react'
import { register } from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  
      const [user, setUser] = useState({name:"", email:"", password:"", role:""});
      const navigate = useNavigate();
  
      const handelInput = (e) =>{
          const {name, value} = e.target;
          setUser({...user, [name]:value});
      }
  
      const handelForm = async (e) => {
          e.preventDefault();
          const isRegister = await register(user);
  
          if(isRegister){
              alert("Register Successfull")
              navigate("/login");
          }
          else{
              alert("User already exist");
              navigate("/login")
          }

          setUser({name:"", email:"", password:"", role:""})
      }
  
    return (
      <>
  
      <form action="" onSubmit={handelForm}>
  
          <input type="text"  placeholder='Enetr Name' value={user.name} name='name' onChange={handelInput}/>
          <input type="email"  placeholder='Enetr email' value={user.email} name='email' onChange={handelInput}/>
          <input type="password"  placeholder='Enetr password' value={user.password} name='password' onChange={handelInput}/>
          <div>
              <label htmlFor="" id='id1'>
                 <input type="radio" id='id1' value={user.role} name='role' onChange={handelInput}  />
                 USER
              </label>
               <label htmlFor="" id='id2'>
                  <input type="radio" id='id2' value={user.role} name='role' onChange={handelInput}  />
                  ADMIN
              </label>
          </div>
  
          <button type='submit'>Register</button>
  
      </form>
  
  
      </>
    )
}

export default Register