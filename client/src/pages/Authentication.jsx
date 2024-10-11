import React,{useState} from 'react'
import styled from "styled-components"
import LogoImage from "../utils/images/logo.png"
import AuthImage from "../utils/images/authImage.jpg"
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';

const Container = styled.div`

height:100%;
display:flex;
background:${({theme})=> theme.bg}
@media (max-width:700px){
  flex-direction:column
}`;

const Left = styled.div`
flex:1;
position:relative;
@media (max-width:700px){
  display:none ;
}`;


const Right = styled.div`
flex:1;
position:relative;
top:100px;
display:flex ;
flex-direction:column;
padding:40px;
gap:16px;
align-items:center
`;

  const Logo = styled.img`
  position:absolute;
  width:70px;
  top:40px;
  left:60px;
  z-index:10;
  `;
  const Image = styled.img`
  position:relative;
  height:100%;
  width:100%;
  object-fit:cover;
  `;
const Text = styled.div`
color:${({theme})=> theme.text_secondary};
margin-top: 16px;
@media (max-width:400px){
  font-size:14px;
}
`;

const TextButton = styled.span`
color: ${({theme})=> theme.primary};
cursor:pointer;
transition: all 0.3s ease;
font-wright: 600;
`

const Authentication = () => {
  const [login,setLogin]= useState(false);
  return (
    <Container>
      <Left>
        <Logo src={LogoImage} />
        <Image src = {AuthImage} />

      </Left>
      <Right>
        {/* if the current login status is true,
        we will be showing the the loing form, and if the loing status is falses ,
         we will be showing the signup page */}
         {login ?(
          <>
          <SignUp />
         <Text>Already have an account? <TextButton onClick={()=>setLogin(false)}>SignIn</TextButton></Text>
         </>) :
         (<>
         <SignIn />
          <Text>
            Don't have an account ? <TextButton onClick={()=>setLogin(true)}>SignUp</TextButton>
            </Text>
         </>)}

      </Right>
    </Container>
  )
}

export default Authentication