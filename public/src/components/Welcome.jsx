import React from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'

function Welcome({currentUser}) {
  return (
	<Container>
		<img src={Robot} alt="robot" />
		<h1>Welcome <span>{currentUser.username}</span></h1>
		<h3>Please select a channel</h3>
	</Container>
  )
}


const Container = styled.div`
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	img{
		height: 20rem;
	}
	span{
		color: #4e00ff;
	}
`
export default Welcome