import { FaPowerOff } from "react-icons/fa6";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <StyledButton onClick={handleClick}>
      <FaPowerOff />
    </StyledButton>
  );
};
const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;

  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

export default Logout;
