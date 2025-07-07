import styled from "styled-components"

export const Button = styled.button`
  background: ${(props) => {
    if (props.variant === "outline") return "transparent"
    if (props.variant === "danger") return "#e74c3c"
    return "#667eea"
  }};
  color: ${(props) => {
    if (props.variant === "outline") return "#667eea"
    return "white"
  }};
  border: ${(props) => {
    if (props.variant === "outline") return "2px solid #667eea"
    return "none"
  }};
  padding: ${(props) => {
    if (props.size === "large") return "1.5rem 3rem"
    if (props.size === "small") return "0.5rem 1rem"
    return "1rem 2rem"
  }};
  font-size: ${(props) => {
    if (props.size === "large") return "1.8rem"
    if (props.size === "small") return "1.2rem"
    return "1.4rem"
  }};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    background: ${(props) => {
      if (props.variant === "outline") return "#667eea"
      if (props.variant === "danger") return "#c0392b"
      return "#5a67d8"
    }};
    color: ${(props) => {
      if (props.variant === "outline") return "white"
      return "white"
    }};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  @media (max-width: 768px) {
    padding: ${(props) => {
      if (props.size === "large") return "1.2rem 2rem"
      if (props.size === "small") return "0.4rem 0.8rem"
      return "0.8rem 1.5rem"
    }};
    font-size: ${(props) => {
      if (props.size === "large") return "1.6rem"
      if (props.size === "small") return "1.1rem"
      return "1.3rem"
    }};
  }
`
