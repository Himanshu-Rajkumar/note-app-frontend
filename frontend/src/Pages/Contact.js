"use client"

import { useState } from "react"
import styled from "styled-components"
import { Container, Card, Flex } from "../Components/GlobalStyle"
import { Button } from "../Styles/button"

const ContactContainer = styled.div`
  min-height: 100vh;
  padding: 4rem 0;
`

const ContactHero = styled.section`
  text-align: center;
  margin-bottom: 6rem;
`

const ContactTitle = styled.h1`
  font-size: 4rem;
  color: white;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`

const ContactSubtitle = styled.p`
  font-size: 1.8rem;
  color: rgba(255,255,255,0.9);
  max-width: 600px;
  margin: 0 auto;
`

const ContactForm = styled.form`
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  margin-bottom: 4rem;
`

const FormGroup = styled.div`
  margin-bottom: 2rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
  font-size: 1.4rem;
`

const Input = styled.input`
  width: 100%;
  padding: 1.2rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1.4rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: #667eea;
    outline: none;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 1.2rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1.4rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: #667eea;
    outline: none;
  }
`

const ContactInfo = styled(Card)`
  text-align: center;
  margin-bottom: 2rem;
  
  .icon {
    font-size: 3rem;
    color: #667eea;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }
  
  p {
    color: #7f8c8d;
    font-size: 1.4rem;
  }
`

const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 500;
`

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: "📧",
      title: "Email Us",
      info: "support@notemakerPro.com",
      description: "Get in touch for support or inquiries",
    },
    {
      icon: "📱",
      title: "Call Us",
      info: "+91 98765 43210",
      description: "Available Mon-Fri, 9AM-6PM IST",
    },
    {
      icon: "🏢",
      title: "Visit Us",
      info: "Bangalore, Karnataka, India",
      description: "Our headquarters in the Silicon Valley of India",
    },
    {
      icon: "💬",
      title: "Live Chat",
      info: "Available 24/7",
      description: "Chat with our support team anytime",
    },
  ]

  return (
    <ContactContainer>
      <Container>
        <ContactHero>
          <ContactTitle>Get In Touch</ContactTitle>
          <ContactSubtitle>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </ContactSubtitle>
        </ContactHero>

        <Flex gap="4rem" direction="row" mobileDirection="column">
          <div style={{ flex: 1 }}>
            <ContactForm onSubmit={handleSubmit}>
              <h2 style={{ marginBottom: "2rem", color: "#2c3e50" }}>Send us a Message</h2>

              {showSuccess && <SuccessMessage>Thank you for your message! We'll get back to you soon.</SuccessMessage>}

              <Flex gap="2rem" direction="row" mobileDirection="column">
                <FormGroup style={{ flex: 1 }}>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </FormGroup>

                <FormGroup style={{ flex: 1 }}>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                  />
                </FormGroup>
              </Flex>

              <FormGroup>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="What's this about?"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Message</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us more about your inquiry..."
                />
              </FormGroup>

              <Button type="submit" disabled={isSubmitting} size="large">
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </ContactForm>
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{ marginBottom: "2rem", color: "white", textAlign: "center" }}>Other Ways to Reach Us</h2>
            {contactInfo.map((info, index) => (
              <ContactInfo key={index}>
                <div className="icon">{info.icon}</div>
                <h3>{info.title}</h3>
                <p style={{ fontWeight: "bold", color: "#2c3e50" }}>{info.info}</p>
                <p>{info.description}</p>
              </ContactInfo>
            ))}
          </div>
        </Flex>

        <section style={{ marginTop: "6rem", textAlign: "center" }}>
          <h2 style={{ color: "white", marginBottom: "2rem" }}>Follow Us</h2>
          <Flex justify="center" gap="2rem">
            <a href="#" style={{ color: "white", fontSize: "2rem" }}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" style={{ color: "white", fontSize: "2rem" }}>
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" style={{ color: "white", fontSize: "2rem" }}>
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" style={{ color: "white", fontSize: "2rem" }}>
              <i className="fab fa-instagram"></i>
            </a>
          </Flex>
        </section>
      </Container>
    </ContactContainer>
  )
}

export default Contact
