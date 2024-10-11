import React from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";

const Container = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const SignIn = () => {
  return (
    <Container>
      <div>
        <Title>Welcome to Fittrack 👋</Title>
        <Span> please login with your details here</Span>
      </div>
      <div style={{
        display:"flex",
        gap:"20px",
        flexDirection: "column"

      }}>
        <TextInput
          label="Email address"
          placeholder="enter your email address "
        />
        <TextInput
          label="password "
          placeholder="enter your password"
          password
        />
        <Button text="SignIn" />
      </div>
    </Container>
  );
};

export default SignIn;
