import EmojiPicker from "emoji-picker-react";
import styled from "styled-components";
import { LuSendHorizonal } from "react-icons/lu";
import { BsEmojiSmile } from "react-icons/bs";
import { useState } from "react";
import PropTypes from "prop-types";
// import { Axios } from "axios";

const ChatInput = ({handleSendMsg}) => {
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  

  const handleEmojiHideShow = () => {
    setshowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if(msg.length > 0){
        handleSendMsg(msg);
        setMsg('');
    }
}

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmile onClick={handleEmojiHideShow} />

          <div className="picker">
            {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
          </div>
        </div>
      </div>
      <form className="input-container" onSubmit={(e)=>sendChat(e)}>
        <input
          type="text"
          placeholder="type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <LuSendHorizonal />
        </button>
      </form>
    </Container>
  );
};
ChatInput.propTypes = {
    handleSendMsg: PropTypes.func.isRequired,
  };

export default ChatInput;
const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .picker {
        position: absolute;
        top: -35rem;
        background-color: black;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
      }
      
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
