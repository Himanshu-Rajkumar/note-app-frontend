import styled from "styled-components"
import { Container, Card, Grid } from "../Components/GlobalStyle"

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 4rem 0;
`

const AboutHero = styled.section`
  text-align: center;
  margin-bottom: 6rem;
`

const AboutTitle = styled.h1`
  font-size: 4rem;
  color: white;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`

const AboutSubtitle = styled.p`
  font-size: 1.8rem;
  color: rgba(255,255,255,0.9);
  max-width: 600px;
  margin: 0 auto;
`

const FeatureCard = styled(Card)`
  text-align: center;
  height: 100%;
  
  h3 {
    color: #667eea;
    margin-bottom: 1rem;
  }
  
  .icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
`

const TeamSection = styled.section`
  background: rgba(255,255,255,0.1);
  padding: 6rem 0;
  margin: 6rem 0;
  border-radius: 20px;
`

const TeamMember = styled(Card)`
  text-align: center;
  
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #7f8c8d;
    font-style: italic;
  }
`

const About = () => {
  const features = [
    {
      icon: "🚀",
      title: "Fast & Efficient",
      description: "Lightning-fast performance with modern React architecture and optimized backend APIs.",
    },
    {
      icon: "🔐",
      title: "Secure by Design",
      description: "Enterprise-grade security with JWT authentication and encrypted data storage.",
    },
    {
      icon: "💡",
      title: "Smart Organization",
      description: "Intelligent categorization and tagging system to keep your notes organized.",
    },
    {
      icon: "💰",
      title: "Financial Integration",
      description: "Built-in expense tracking and budget management with Indian Rupee support.",
    },
    {
      icon: "📱",
      title: "Cross-Platform",
      description: "Responsive design that works seamlessly across all devices and screen sizes.",
    },
    {
      icon: "🎨",
      title: "Customizable",
      description: "Personalize your experience with custom colors, themes, and layout options.",
    },
  ]

  const teamMembers = [
    {
      name: "Priya Sharma",
      role: "Full Stack Developer",
      image: "/placeholder.svg?height=150&width=150",
      bio: "Expert in MERN stack development with 5+ years of experience.",
    },
    {
      name: "Rahul Kumar",
      role: "UI/UX Designer",
      image: "/placeholder.svg?height=150&width=150",
      bio: "Creative designer passionate about creating intuitive user experiences.",
    },
    {
      name: "Anita Patel",
      role: "Backend Engineer",
      image: "/placeholder.svg?height=150&width=150",
      bio: "Database optimization expert with focus on scalable Node.js applications.",
    },
  ]

  return (
    <AboutContainer>
      <Container>
        <AboutHero>
          <AboutTitle>About NoteMaker Pro</AboutTitle>
          <AboutSubtitle>
            We're building the future of digital note-taking, combining powerful organization tools with intelligent
            financial tracking to help you stay productive and organized.
          </AboutSubtitle>
        </AboutHero>

        <section>
          <h2 style={{ textAlign: "center", fontSize: "3rem", color: "white", marginBottom: "3rem" }}>
            Why Choose NoteMaker Pro?
          </h2>
          <Grid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <div className="icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </FeatureCard>
            ))}
          </Grid>
        </section>

        <TeamSection>
          <Container>
            <h2 style={{ textAlign: "center", fontSize: "3rem", color: "white", marginBottom: "3rem" }}>
              Meet Our Team
            </h2>
            <Grid>
              {teamMembers.map((member, index) => (
                <TeamMember key={index}>
                  <img src={member.image || "/placeholder.svg"} alt={member.name} />
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                  <p>{member.bio}</p>
                </TeamMember>
              ))}
            </Grid>
          </Container>
        </TeamSection>

        <section style={{ textAlign: "center", padding: "4rem 0" }}>
          <h2 style={{ color: "white", marginBottom: "2rem" }}>Our Mission</h2>
          <p
            style={{
              fontSize: "1.6rem",
              color: "rgba(255,255,255,0.9)",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.8",
            }}
          >
            At NoteMaker Pro, we believe that everyone deserves access to powerful, intuitive tools that help them
            organize their thoughts and manage their finances. Our mission is to create a seamless digital experience
            that combines the best of note-taking with smart financial tracking, all while maintaining the highest
            standards of security and user privacy.
          </p>
        </section>
      </Container>
    </AboutContainer>
  )
}

export default About
