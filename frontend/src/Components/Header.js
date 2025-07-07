"use client"

import { useState } from "react"
import styled from "styled-components"
import { useAppContext } from "./ContextAPI"
import { Button } from "../Styles/button"

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  color: #667eea;
  cursor: pointer;
`

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const AuthForm = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

const Input = styled.input`
  padding: 0.8rem 1.2rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1.4rem;
  width: 200px;

  @media (max-width: 768px) {
    width: 150px;
  }
`

const Header = () => {
  const { user, dispatch } = useAppContext()
  const [showAuth, setShowAuth] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      const url = isLogin ? "/api/auth/login" : "/api/auth/register"
      const response = await fetch(`http://localhost:5000${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        dispatch({ type: "SET_TOKEN", payload: data.token })
        dispatch({ type: "SET_USER", payload: data })
        setShowAuth(false)
        setFormData({ name: "", email: "", password: "" })
      } else {
        dispatch({ type: "SET_ERROR", payload: data.message })
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Something went wrong" })
    }
  }

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>NoteMaker Pro</Logo>

        <UserSection>
          {user ? (
            <>
              <span>Welcome, {user.name}!</span>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              {!showAuth ? (
                <Button onClick={() => setShowAuth(true)}>Login</Button>
              ) : (
                <AuthForm>
                  <form onSubmit={handleSubmit} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    {!isLogin && (
                      <Input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    )}
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <Button type="submit">{isLogin ? "Login" : "Register"}</Button>
                    <Button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      style={{ background: "transparent", color: "#667eea" }}
                    >
                      {isLogin ? "Register" : "Login"}
                    </Button>
                    <Button type="button" onClick={() => setShowAuth(false)} style={{ background: "#ff4757" }}>
                      Cancel
                    </Button>
                  </form>
                </AuthForm>
              )}
            </>
          )}
        </UserSection>
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header
