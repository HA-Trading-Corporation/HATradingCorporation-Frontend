import { React, useState, useEffect } from "react";
import axios from "axios";
import ProfileSidebar from "../profileSidebar/ProfileSidebar";
import { useNavigate } from "react-router-dom";
import Spinner from "../../spinner/Spinner";

const MyProfile = ({ headers }) => {
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPhone, setUserPhone] = useState(null);
  const [Loading, setLoading] = useState(true);

  document.title = "My account";

  useEffect(() => {
    const fetchData = async () => {
      const url = `${import.meta.env.VITE_BASE_URL}/api/v1/get-user-info`;

      try {
        const res = await axios.get(url, headers);
        setUserName(res.data.name);
        setUserEmail(res.data.username);
        setUserPhone(res.data.phone);
        sessionStorage.setItem("user", JSON.stringify(res.data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <div className="profile">
        <ProfileSidebar />
        <main className="my-profile">
          <header>
            <span>My profile</span>
          </header>
          {Loading ? (
            <Spinner />
          ) : (
            <div>
              {/* inputs */}
              <div className="inputs">
                <div className="name">
                  <label>Name</label>
                  <span>{userName}</span>
                </div>
                <div className="email">
                  <label>Email</label>
                  <span>{userEmail}</span>
                </div>
                <div className="phone">
                  <label>Phone</label>
                  {userPhone ? (
                    <span>{userPhone}</span>
                  ) : (
                    <span style={{ color: "red" }}>no number added</span>
                  )}
                </div>
                <div className="password">
                  <label>Password</label>
                  <span>***********</span>
                </div>
              </div>
              {/* inputs */}
              {/* buttons */}
              <div className="buttons">
                <button
                  onClick={() => navigate("/account/profile/edit")}
                  className="btn"
                >
                  Edit profile
                </button>
                <span>or</span>
                <input
                  onClick={() => navigate("/account/profile/edit/password")}
                  className="btn"
                  type="button"
                  value={"Change password"}
                />
              </div>
              {/* buttons */}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default MyProfile;
