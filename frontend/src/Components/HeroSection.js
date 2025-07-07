import styled from "styled-components"
import { Button } from "../Styles/button"

const HeroContainer = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
`

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`

const HeroTitle = styled.h1`
  font-size: 4.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 3.2rem;
  }
`

const HeroSubtitle = styled.p`
  font-size: 2rem;
  margin-bottom: 3rem;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`

const HeroButtons = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 6rem;
`

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 3rem 2rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
`

const FeatureIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`

const FeatureTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
`

const FeatureDescription = styled.p`
  font-size: 1.4rem;
  opacity: 0.8;
`

const HeroSection = () => {
  const features = [
    {
      icon: "📝",
      title: "Smart Notes",
      description: "Create, organize, and manage your notes with intelligent categorization",
    },
    {
      icon: "💰",
      title: "Budget Tracking",
      description: "Track your expenses and income with financial note-taking",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Your notes are protected with JWT authentication and encryption",
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      description: "Access your notes anywhere with responsive design",
    },
  ]

  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle>Your Digital Note-Taking Companion</HeroTitle>
        <HeroSubtitle>Organize your thoughts, track your finances, and boost your productivity</HeroSubtitle>
        <HeroButtons>
          <Button size="large">Get Started Free</Button>
          <Button variant="outline" size="large">
            Learn More
          </Button>
        </HeroButtons>

        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </HeroContent>
    </HeroContainer>
  )
}

export default HeroSection
