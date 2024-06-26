import { useEffect, useState } from "react";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRoutes.js";
import axios from "axios";
import { Buffer } from "buffer";

const SetAvatar = () => {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/register");
    }
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar");
      return;
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      console.log("user", user);
      console.log(avatars[selectedAvatar]);
      //`${setAvatarRoute}${user._id}`
      try {
        const response = await fetch(`${setAvatarRoute}${user._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: avatars[selectedAvatar],
          }),
        });

        const data = await response.json();
        // console.log("Response Data:", data);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } catch (error) {
        if (error.response) {
          console.error("Server responded with error !!:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );

          const buffer = Buffer.from(image.data); // Use Buffer.from instead of new Buffer
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data!!!!:", error);
        setIsLoading(false);
      }
    };

    fetchData(); // Call the async function immediately
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>

          <button className="submit-btn" onClick={setProfilePicture}>
            Set as profile picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};

export default SetAvatar;

//---------------------------------------!!-----------------------
// css

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
