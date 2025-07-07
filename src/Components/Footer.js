import styled from "styled-components"

const FooterContainer = styled.footer`
  background: #2c3e50;
  color: white;
  padding: 4rem 0 2rem;
  margin-top: 6rem;
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
`

const FooterSection = styled.div`
  h3 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #667eea;
  }

  p, li {
    font-size: 1.4rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
  }

  a {
    color: #bdc3c7;
    transition: color 0.3s ease;

    &:hover {
      color: #667eea;
    }
  }
`

const FooterBottom = styled.div`
  border-top: 1px solid #34495e;
  margin-top: 3rem;
  padding-top: 2rem;
  text-align: center;
  color: #bdc3c7;
`

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>NoteMaker Pro</h3>
          <p>
            Your ultimate digital note-taking companion with budget tracking capabilities. Organize your thoughts and
            finances in one place.
          </p>
        </FooterSection>

        <FooterSection>
          <h3>Features</h3>
          <ul>
            <li>
              <a href="#notes">Smart Notes</a>
            </li>
            <li>
              <a href="#budget">Budget Tracking</a>
            </li>
            <li>
              <a href="#security">Secure Storage</a>
            </li>
            <li>
              <a href="#mobile">Mobile Access</a>
            </li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Support</h3>
          <ul>
            <li>
              <a href="#help">Help Center</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="#terms">Terms of Service</a>
            </li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Connect</h3>
          <ul>
            <li>
              <a href="#twitter">Twitter</a>
            </li>
            <li>
              <a href="#facebook">Facebook</a>
            </li>
            <li>
              <a href="#linkedin">LinkedIn</a>
            </li>
            <li>
              <a href="#github">GitHub</a>
            </li>
          </ul>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>&copy; 2024 NoteMaker Pro. All rights reserved. Made with ❤️ in India</p>
      </FooterBottom>
    </FooterContainer>
  )
}

export default Footer
