// import { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import PropTypes from "prop-types";



export default function Welcome({currentUser}) {
  // console.log("12",currentUser.username);
  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{currentUser && currentUser.username ? currentUser.username : "Guest"}</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}
Welcome.propTypes = {
  currentUser: PropTypes.shape({
    avatarImage: PropTypes.string,
    username: PropTypes.string,
    _id: PropTypes.string,
    isAvatarImageSet: PropTypes.bool,
  }),
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
