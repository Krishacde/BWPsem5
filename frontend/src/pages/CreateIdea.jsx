import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lightbulb } from "lucide-react";

import { categories, stages } from "../ideaOptions";
import "./Ideas.css";

const emptyForm = {
  title: "",
  description: "",
  category: "",
  stage: "Idea",
  requiredSkills: "",
  teamSize: 1,
  tags: ""
};

// "React, Node" -> ["React", "Node"]
const toList = (text) => {
  return text
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "");
};

const CreateIdea = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Only logged-in users can post ideas
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/ideas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            title: form.title,
            description: form.description,
            category: form.category,
            stage: form.stage,
            requiredSkills: toList(form.requiredSkills),
            teamSize: Number(form.teamSize),
            tags: toList(form.tags)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Could not post idea");
        return;
      }

      setSuccess("Idea posted successfully!");

      setForm(emptyForm);

    } catch (error) {
      setMessage(
        "Unable to connect to the server"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">

      <div className="auth-card idea-form-card">

        <div className="auth-header">

          <div className="auth-header-icon">
            <Lightbulb size={23} />
          </div>

          <h1>Post your idea</h1>

          <p>
            Share what you want to build and find your team.
          </p>

        </div>


        {message && (
          <div className="form-message">
            {message}
          </div>
        )}

        {success && (
          <div className="form-success">
            {success}
          </div>
        )}


        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label className="form-label">
              Title
            </label>

            <input
              className="form-input"
              type="text"
              name="title"
              placeholder="Give your idea a short name"
              value={form.title}
              onChange={handleChange}
              required
              maxLength={100}
            />
          </div>


          <div className="form-group">
            <label className="form-label">
              Description
            </label>

            <textarea
              className="form-input"
              name="description"
              placeholder="What problem does it solve and how?"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>


          <div className="form-row">

            <div className="form-group">
              <label className="form-label">
                Category
              </label>

              <select
                className="form-input"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select category
                </option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>


            <div className="form-group">
              <label className="form-label">
                Stage
              </label>

              <select
                className="form-input"
                name="stage"
                value={form.stage}
                onChange={handleChange}
              >
                {stages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </div>

          </div>


          <div className="form-row">

            <div className="form-group">
              <label className="form-label">
                Required Skills
              </label>

              <input
                className="form-input"
                type="text"
                name="requiredSkills"
                placeholder="React, Node, Design"
                value={form.requiredSkills}
                onChange={handleChange}
              />

              <small className="form-hint">
                Separate with commas
              </small>
            </div>


            <div className="form-group">
              <label className="form-label">
                Team Size
              </label>

              <input
                className="form-input"
                type="number"
                name="teamSize"
                min={1}
                value={form.teamSize}
                onChange={handleChange}
              />
            </div>

          </div>


          <div className="form-group">
            <label className="form-label">
              Tags
            </label>

            <input
              className="form-input"
              type="text"
              name="tags"
              placeholder="food, campus, students"
              value={form.tags}
              onChange={handleChange}
            />

            <small className="form-hint">
              Separate with commas
            </small>
          </div>


          <button
            className="btn btn-primary form-button"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Posting..."
              : "Post Idea"}
          </button>

        </form>

      </div>

    </main>
  );
};

export default CreateIdea;
