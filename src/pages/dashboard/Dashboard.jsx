import React, { useEffect, useState } from "react";
import { Banner, Navbar, UserBox } from "../../components";
import { Header } from "../../components";
import { checkUserStatus } from "../../utils/checkUserStatus";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { state } = useAuth();
  const [currentUser, setCurrentUser] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  const [greeting, setGreeting] = useState("Welcome");

  useEffect(() => {
    const getCurrentTime = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 6 && currentHour < 12) {
        setGreeting("Good morning");
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting("Good afternoon");
      } else {
        setGreeting("Good evening");
      }
    };

    // Call the function once to set the initial greeting
    getCurrentTime();

    // Update the greeting every minute
    const intervalId = setInterval(getCurrentTime, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that useEffect runs only once

  useEffect(() => {
    // Call function getUsers()
    getUsers();

    // Function to handle user interaction or click
    const handleUserInteraction = async () => {
      await checkUserStatus(state, logout, navigate);
    };

    // Attach event listeners to document or specific elements
    window.addEventListener("click", handleUserInteraction);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleUserInteraction);
    };
  }, [state, logout, navigate]);

  const getUsers = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8888/petproject/users",
        state.user
      );

      if (response.data.success) {
        setCurrentUser(response.data.currentUser);
        setOtherUsers(response.data.otherUsers);

        console.log(response.data.message);
      } else {
        setCurrentUser(response.data.currentUser);
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Failed getting all users:", error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      if (!state.user.id) {
        console.error("state.user.id is undefined");
        return;
      }

      const response = await axios.delete(
        `http://localhost:8888/petproject/user/${id}/delete`,
        id
      );

      console.log(response.data);

      if (response.data.success) {
        // If the deleted user is the current user, navigate to login
        if (id === state.user.id) {
          logout();
          navigate("/login");
        } else {
          // Remove the deleted user from otherUsers state
          setOtherUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== id)
          );
        }
      } else {
        console.log(`Failed to delete User ${id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="py-4">
      <Header />
      <Banner user={currentUser} greeting={greeting} />

      {/* current_user */}
      <main className="row py-5">
        <div className="col-sm-6 col-lg-4 col-xxl-3">
          <UserBox
            user={currentUser}
            isCurrentUser={true}
            deleteUser={deleteUser}
          />
        </div>
      </main>

      <div className="border-top my-1 mt-2"></div>

      <Navbar page={"dashboard"} usersCount={otherUsers.length} />

      {/* other_users */}
      <section className="pb-5 row row-gap-4">
        {otherUsers.map((user, key) => (
          <div key={key} className="col-sm-6 col-lg-4 col-xxl-3">
            <UserBox
              key={user.id}
              user={user}
              isCurrentUser={false}
              deleteUser={deleteUser}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
