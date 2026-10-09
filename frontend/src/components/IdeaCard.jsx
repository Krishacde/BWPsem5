import { Link } from "react-router-dom";
import { Calendar, User, Users } from "lucide-react";

const IdeaCard = ({ idea }) => {
  return (
    <Link to={`/ideas/${idea._id}`} className="idea-card">

      <div className="idea-badges">
        <span className="badge">
          {idea.category}
        </span>

        <span className="badge badge-stage">
          {idea.stage}
        </span>
      </div>

      <h3>{idea.title}</h3>

      <p>{idea.description}</p>

      {idea.requiredSkills.length > 0 && (
        <div className="idea-skills">
          {idea.requiredSkills.map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      )}

      <div className="idea-card-footer">
        <span>
          <User size={14} />
          {idea.author ? idea.author.name : "Unknown"}
        </span>

        <span>
          <Users size={14} />
          {idea.teamSize}
        </span>

        <span>
          <Calendar size={14} />
          {new Date(idea.createdAt).toLocaleDateString()}
        </span>
      </div>

    </Link>
  );
};

export default IdeaCard;
