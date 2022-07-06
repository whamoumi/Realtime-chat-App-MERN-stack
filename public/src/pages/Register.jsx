import {React, useEffect, useState} from 'react'
import styled from  'styled-components'
import { Link } from 'react-router-dom'
import Logo from "../assets/logo.svg"
import {ToastContainer, toast} from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css';
import "../index.css"
import axios from "axios"
import { RegisterRoute } from '../utils/APIRoutes'
import { useNavigate } from 'react-router-dom'
function Register() {
	const navigate = useNavigate()
	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
		confirmpassword: '',
	})

	const Toastoption = {
		position: "top-right",
		autoClose: 5000,
		theme: 'dark',
		}
	const handleSubmit = async (event) =>{
		event.preventDefault()
		if (verification()){
			const { password, username, email } = user
			const {data} = await axios.post(RegisterRoute, {
				username,
				email,
				password
			})
			if (data.status === false){
				toast.error(data.msg, Toastoption);
			}
			else{
				localStorage.setItem("chat-app-user", JSON.stringify(data.user))
				navigate("/")
			}
		}
	}
	const verification = () =>{
		const {username, email, password, confirmpassword} = user
		if (password !== confirmpassword){
			toast.error("password and confirm password should be the same", Toastoption);
			return false
		} else if ( username.length < 3){
			toast.error("Username should be greater than 3 characters", Toastoption);
			return false
		} else if ( password.length < 8){
			toast.error("Password should be greater than 8 characters", Toastoption);
			return false
		} else if ( email === ""){
			toast.error("email is required ", Toastoption);
			return false
		}
		return true

	}
	const handleChange = (event) =>{
		setUser({...user, [event.target.name]: event.target.value})
	}
  return (
	  <>
		<FormContainer>
			<form onSubmit={(event) => handleSubmit(event)}>
				<div className='brand'>
					<img src={Logo} alt="Logo" />
					<h1>snappy</h1>
				</div>
				<input type="text" placeholder='Username' name='username' onChange={e => handleChange(e)}/>
				<input type="text" placeholder='Email' name='email' onChange={e => handleChange(e)}/>
				<input type="password" placeholder='Password' name='password' onChange={e => handleChange(e)}/>
				<input type="password" placeholder='Confirm Password' name='confirmpassword' onChange={e => handleChange(e)}/>
				<button type='submit'>Create User</button>
				<span>Already have an account ? <Link to="/login">Login</Link></span>
			</form>
		</FormContainer>
		<ToastContainer
			position="top-right"
			autoClose={5000}
			hideProgressBar
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
	</>
  )
}

const FormContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	background-color: #131324;
	.brand {
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		img {
			height: 5rem;
		}
		h1{
			color: white;
			text-transform: uppercase;
		}
	}
	form{
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: #00000076;
		border-radius: 2rem;
		padding: 2rem 5rem;
		input {
			background-color: transparent;
			padding: 1rem;
			border: 0.1rem solid #4e0eff;
			border-radius: 0.4rem;
			color: white;
			font-size: 1rem;		
			&:focus{
				border: 0.1rem solid #997af0;
				outline: none;
			}
		}
		button{
			background-color: #997af0;
			text-transform: uppercase;
			border: none;
			padding: 1rem 2rem;
			border-radius: 0.4rem;
			color: white;
			font-weight: bold;
			font-size: 1rem;
			cursor: pointer;
			transition: 0.5s ease-in-out;
			&:hover{
				background: #4e0eff;
			}
		}
		span{
			color: white;
			text-transform: uppercase;
			a{
				color: #4e0eff;
				text-decoration: none;
				font-weight: bold;
			}
		}
		
	}
`
export default Register