"use client"

import React from "react"
import styled from "styled-components"
import { Container, Card, Grid } from "../Components/GlobalStyle"
import { Button } from "../Styles/button"

const ServiceContainer = styled.div`
  min-height: 100vh;
  padding: 4rem 0;
`

const ServiceHero = styled.section`
  text-align: center;
  margin-bottom: 6rem;
`

const ServiceTitle = styled.h1`
  font-size: 4rem;
  color: white;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`

const ServiceSubtitle = styled.p`
  font-size: 1.8rem;
  color: rgba(255,255,255,0.9);
  max-width: 600px;
  margin: 0 auto;
`

const ServiceCard = styled(Card)`
  text-align: center;
  height: 100%;
  position: relative;
  
  .icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: #667eea;
    margin-bottom: 1rem;
    font-size: 2.4rem;
  }
  
  .price {
    font-size: 3rem;
    color: #27ae60;
    font-weight: bold;
    margin: 1rem 0;
  }
  
  .features {
    text-align: left;
    margin: 2rem 0;
  }
  
  .features li {
    margin-bottom: 0.5rem;
    padding-left: 1rem;
    position: relative;
  }
  
  .features li:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #27ae60;
    font-weight: bold;
  }
`

const PricingSection = styled.section`
  background: rgba(255,255,255,0.1);
  padding: 6rem 0;
  margin: 6rem 0;
  border-radius: 20px;
`

const FAQSection = styled.section`
  margin: 6rem 0;
`

const FAQItem = styled(Card)`
  margin-bottom: 2rem;
  cursor: pointer;
  
  h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .answer {
    color: #7f8c8d;
    line-height: 1.6;
    display: ${(props) => (props.isOpen ? "block" : "none")};
  }
`

const Service = () => {
  const [openFAQ, setOpenFAQ] = React.useState(null)

  const services = [
    {
      icon: "📝",
      title: "Smart Note Taking",
      description: "Advanced note-taking with rich text editing, categorization, and intelligent search.",
      features: [
        "Rich text editor with formatting",
        "Smart categorization system",
        "Advanced search and filtering",
        "Note templates and shortcuts",
        "Collaboration features",
      ],
    },
    {
      icon: "💰",
      title: "Budget Management",
      description: "Comprehensive financial tracking with expense categorization and budget planning.",
      features: [
        "Expense and income tracking",
        "Budget planning and alerts",
        "Financial reporting and analytics",
        "Multi-currency support",
        "Bank account integration",
      ],
    },
    {
      icon: "🔐",
      title: "Security & Privacy",
      description: "Enterprise-grade security with end-to-end encryption and privacy controls.",
      features: [
        "End-to-end encryption",
        "Two-factor authentication",
        "Privacy controls and settings",
        "Regular security audits",
        "GDPR compliance",
      ],
    },
    {
      icon: "📊",
      title: "Analytics & Insights",
      description: "Powerful analytics to understand your note-taking patterns and financial habits.",
      features: [
        "Usage analytics and insights",
        "Financial trend analysis",
        "Productivity metrics",
        "Custom reports and dashboards",
        "Export and sharing options",
      ],
    },
  ]

  const pricingPlans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      features: [
        "Up to 100 notes",
        "Basic categorization",
        "Simple expense tracking",
        "Mobile app access",
        "Email support",
      ],
      recommended: false,
    },
    {
      name: "Pro",
      price: "₹299",
      period: "per month",
      features: [
        "Unlimited notes",
        "Advanced search and filtering",
        "Comprehensive budget tracking",
        "Priority support",
        "Data export options",
        "Team collaboration",
      ],
      recommended: true,
    },
    {
      name: "Enterprise",
      price: "₹999",
      period: "per month",
      features: [
        "Everything in Pro",
        "Advanced security features",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantees",
        "Custom training",
      ],
      recommended: false,
    },
  ]

  const faqs = [
    {
      question: "How secure is my data?",
      answer:
        "We use enterprise-grade security with end-to-end encryption. Your data is encrypted both in transit and at rest, and we never have access to your unencrypted information.",
    },
    {
      question: "Can I access my notes offline?",
      answer:
        "Yes, our mobile apps support offline access. You can create, edit, and view your notes without an internet connection. Changes will sync automatically when you reconnect.",
    },
    {
      question: "Is there a limit to how many notes I can create?",
      answer:
        "Free users can create up to 100 notes. Pro and Enterprise users have unlimited notes with additional features for organization and management.",
    },
    {
      question: "How does the budget tracking work?",
      answer:
        "You can add financial information to your notes, categorize expenses and income, and get comprehensive reports. The system supports multiple currencies and provides insights into your spending patterns.",
    },
    {
      question: "Can I collaborate with others?",
      answer:
        "Yes, Pro and Enterprise plans include collaboration features. You can share notes, create team workspaces, and work together on projects.",
    },
  ]

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <ServiceContainer>
      <Container>
        <ServiceHero>
          <ServiceTitle>Our Services</ServiceTitle>
          <ServiceSubtitle>
            Comprehensive digital solutions for note-taking, financial management, and productivity enhancement.
          </ServiceSubtitle>
        </ServiceHero>

        <section>
          <h2 style={{ textAlign: "center", fontSize: "3rem", color: "white", marginBottom: "3rem" }}>What We Offer</h2>
          <Grid>
            {services.map((service, index) => (
              <ServiceCard key={index}>
                <div className="icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="features">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex}>{feature}</li>
                  ))}
                </ul>
              </ServiceCard>
            ))}
          </Grid>
        </section>

        <PricingSection>
          <Container>
            <h2 style={{ textAlign: "center", fontSize: "3rem", color: "white", marginBottom: "3rem" }}>
              Choose Your Plan
            </h2>
            <Grid>
              {pricingPlans.map((plan, index) => (
                <ServiceCard
                  key={index}
                  style={{
                    border: plan.recommended ? "3px solid #667eea" : "none",
                    position: "relative",
                  }}
                >
                  {plan.recommended && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#667eea",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "20px",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                    >
                      Recommended
                    </div>
                  )}
                  <h3>{plan.name}</h3>
                  <div className="price">{plan.price}</div>
                  <p>per {plan.period}</p>
                  <ul className="features">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex}>{feature}</li>
                    ))}
                  </ul>
                  <Button style={{ marginTop: "2rem" }}>{plan.name === "Free" ? "Get Started" : "Choose Plan"}</Button>
                </ServiceCard>
              ))}
            </Grid>
          </Container>
        </PricingSection>

        <FAQSection>
          <h2 style={{ textAlign: "center", fontSize: "3rem", color: "white", marginBottom: "3rem" }}>
            Frequently Asked Questions
          </h2>
          {faqs.map((faq, index) => (
            <FAQItem key={index} isOpen={openFAQ === index} onClick={() => toggleFAQ(index)}>
              <h3>
                {faq.question}
                <span>{openFAQ === index ? "−" : "+"}</span>
              </h3>
              <div className="answer">
                <p>{faq.answer}</p>
              </div>
            </FAQItem>
          ))}
        </FAQSection>
      </Container>
    </ServiceContainer>
  )
}

export default Service
