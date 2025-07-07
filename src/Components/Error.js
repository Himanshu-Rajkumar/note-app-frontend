"use client"
import styled from "styled-components"
import { Button } from "../Styles/button"

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 2rem;
`

const ErrorIcon = styled.div`
  font-size: 6rem;
  margin-bottom: 2rem;
`

const ErrorTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`

const ErrorMessage = styled.p`
  font-size: 1.6rem;
  margin-bottom: 3rem;
  opacity: 0.9;
`

const Error = ({ message = "Something went wrong" }) => {
  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorTitle>Oops!</ErrorTitle>
      <ErrorMessage>{message}</ErrorMessage>
      <Button onClick={handleRetry}>Try Again</Button>
    </ErrorContainer>
  )
}

export default Error
