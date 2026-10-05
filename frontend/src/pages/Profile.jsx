import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          localStorage.removeItem("token");

          setError(data.message);

          setTimeout(() => {
            navigate("/login");
          }, 1200);

          return;
        }

        setUser(data.user);

      } catch (error) {
        setError(
          "Unable to connect to the server"
        );
      }
    };

    getProfile();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (error) {
    return (
      <main className="auth-page">
        <div className="auth-card">
          <div className="form-message">
            {error}
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="auth-page">
        <p>Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="profile-page">

      <div className="profile-container">

        <div className="profile-card">

          <div className="profile-header">

            <div className="profile-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1>{user.name}</h1>

              <p>
                Welcome to VicharManthan
              </p>
            </div>

          </div>


          <div className="profile-info">

            <div className="info-box">
              <small>Name</small>
              <strong>{user.name}</strong>
            </div>

            <div className="info-box">
              <small>Email</small>
              <strong>{user.email}</strong>
            </div>

            <div className="info-box">
              <small>Account ID</small>
              <strong>{user._id}</strong>
            </div>

            <div className="info-box">
              <small>Account Created</small>
              <strong>
                {new Date(
                  user.createdAt
                ).toLocaleDateString()}
              </strong>
            </div>

          </div>


          <button
            className="btn btn-danger"
            onClick={logout}
          >
            <LogOut size={17} />
            Logout
          </button>

        </div>

      </div>

    </main>
  );
};

export default Profile;