import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Pencil,
  Trash2,
  User,
  Users
} from "lucide-react";

import "./Ideas.css";

const IdeaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [idea, setIdea] = useState(null);
  const [userId, setUserId] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const getIdea = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/ideas/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Could not load idea");
          return;
        }

        setIdea(data.idea);

      } catch (error) {
        setError(
          "Unable to connect to the server"
        );
      }
    };

    // logged-in user, to show edit/delete to the author
    const getUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

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

        if (response.ok) {
          setUserId(data.user._id);
        }

      } catch (error) {
        setUserId("");
      }
    };

    getIdea();
    getUser();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this idea?")) return;

    setMessage("");
    setDeleting(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/ideas/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Could not delete idea");
        return;
      }

      navigate("/ideas");

    } catch (error) {
      setMessage(
        "Unable to connect to the server"
      );
    } finally {
      setDeleting(false);
    }
  };

  if (error) {
    return (
      <main className="ideas-page">
        <div className="ideas-container idea-details">
          <Link to="/ideas" className="back-link">
            <ArrowLeft size={16} />
            Back to ideas
          </Link>

          <div className="form-message">
            {error}
          </div>
        </div>
      </main>
    );
  }

  if (!idea) {
    return (
      <main className="ideas-page">
        <div className="ideas-status">
          Loading idea...
        </div>
      </main>
    );
  }

  const isAuthor = idea.author && idea.author._id === userId;

  return (
    <main className="ideas-page">

      <div className="ideas-container idea-details">

        <Link to="/ideas" className="back-link">
          <ArrowLeft size={16} />
          Back to ideas
        </Link>


        <div className="idea-details-card">

          <div className="idea-badges">
            <span className="badge">
              {idea.category}
            </span>

            <span className="badge badge-stage">
              {idea.stage}
            </span>
          </div>

          <h1>{idea.title}</h1>

          <div className="idea-meta">
            <span>
              <User size={15} />
              {idea.author ? idea.author.name : "Unknown"}
            </span>

            <span>
              <Users size={15} />
              Team of {idea.teamSize}
            </span>

            <span>
              <Calendar size={15} />
              {new Date(idea.createdAt).toLocaleDateString()}
            </span>
          </div>

          <p className="idea-description">
            {idea.description}
          </p>


          {idea.requiredSkills.length > 0 && (
            <div className="idea-section">
              <h4>Required Skills</h4>

              <div className="idea-skills">
                {idea.requiredSkills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}


          {idea.tags.length > 0 && (
            <div className="idea-section">
              <h4>Tags</h4>

              <div className="idea-skills">
                {idea.tags.map((tag) => (
                  <span key={tag} className="skill-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}


          {message && (
            <div className="form-message">
              {message}
            </div>
          )}


          {isAuthor && (
            <div className="idea-actions">
              <Link
                to={`/ideas/${idea._id}/edit`}
                className="btn btn-secondary"
              >
                <Pencil size={16} />
                Edit
              </Link>

              <button
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                <Trash2 size={16} />
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}

        </div>

      </div>

    </main>
  );
};

export default IdeaDetails;
