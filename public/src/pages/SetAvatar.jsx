import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from '../utils/APIRoutes'

function SetAvatar() {
	const api ="https://api.multiavatar.com/HaVSmxJDIBqnsT"
	const navigate = useNavigate()
	const [avatars, setAvatars] = useState([])
	const [isLoading, setisLoading] = useState(true)
	const [selectedAvatar, setselectedAvatar] = useState(undefined)
	const Toastoption = {
		position: "top-right",
		autoClose: 5000,
		theme: 'dark',
	}

	const setProfilePicture = async () => {
		if (selectedAvatar === undefined){
			toast.error("Choose a profile picture", Toastoption)
		}
		else{
			const user = await JSON.parse(localStorage.getItem("chat-app-user"))
			const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
				image: avatars[selectedAvatar]
			})

			if (data.isSet){
				user.isAvatarImageSet = true
				user.avatarImage = data.image
				localStorage.setItem("chat-app-user", JSON.stringify(user))
				navigate("/")
			}
			else{
				toast.error("Error setting avatar, Please try again", Toastoption)
			}
		}
	}
	useEffect(() => {
		if (!localStorage.getItem("chat-app-user")){
			navigate("/login")
		}
	}, [])
	useEffect(() => {
		const fetchData = async () => {
		  const data = [];
		  // foreach doesn't work with APIs
		  for (let i = 0; i < 4; i++) {
			const image = await axios.get(
			  `${api}/${Math.round(Math.random() * 1000)}`
			);
			const buffer = new Buffer(image.data);
			data.push(buffer.toString("base64"));
		  }
	
		  setAvatars(data);
		  setisLoading(false);
		};
	
		fetchData();
	  }, []);
  return (
	<>
		{
			isLoading ? <Container>
				<img src={loader} alt="loader" className="loader"/>
			</Container> : 
		(
			<Container>
			<div className="title-container">
				<h1>
					Pick an avatar as your profile picture
				</h1>
			</div>
			<div className="avatars">
				{
					avatars.map((avatar, index) => {
						return(
							
							<div className={`avatar ${selectedAvatar === index ? "selected" : ""}`} key={index}>
								<img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar"  onClick={() => setselectedAvatar(index)}/>
							</div>
						)
					})
				}
			</div>
			<button className="submit-btn" onClick={() => setProfilePicture()}>Set as Profile</button>
		</Container>)
		}
		<ToastContainer/>
	</>
  )
}


const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 3rem;
	background-color: #131324;
	height: 100vh;
	width: 100vw;
	.loader{
		max-inline-size: 100%;
	}

	.title-container{
		h1{
			color: white;
		}
	}

	.avatars{
		display: flex;
		gap: 2rem;
		.avatar{
			border: 0.4rem solid transparent;
			padding: 0.4rem;
			border-radius: 5rem;
			display: flex;
			justify-content: center;
			align-items: center;
			transition: 0.5s ease-in-out;
			img{
				height: 6rem;
			}
		}
		.selected{
			border: 0.4rem solid #4e0eff;
		}
	}	
	
	.submit-btn{
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

`
export default SetAvatar