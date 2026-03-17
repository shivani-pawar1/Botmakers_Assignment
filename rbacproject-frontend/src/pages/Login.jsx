import React, { useState } from 'react'
import { login } from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [user, setUser] = useState({email:"", password:""});
    const navigate = useNavigate();

    const handelInput = (e) =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value});
    }

    const handelForm = async (e) => {
        e.preventDefault();
        const res = await login(user);

        if(!res.data === null){
            alert("User not exist, Please register");
            navigate("/register");
        }else{
            alert("Login successfull");
            navigate("/dashboard", {state: res.data.role});
        }

        setUser({email:"", password:""});
    }

  return (
    <>

    <form action="" onSubmit={handelForm}>

        
        <input type="email"  placeholder='Enetr email' value={user.email} name='email' onChange={handelInput}/>
        <input type="password"  placeholder='Enetr password' value={user.password} name='password' onChange={handelInput}/>
        <button type='submit'>Login</button>

    </form>


    </>
  )
}

export default Login