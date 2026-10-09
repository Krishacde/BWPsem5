const Idea = require("../models/Idea");

// Fields the author is allowed to set
const ideaFields = [
  "title",
  "description",
  "category",
  "stage",
  "requiredSkills",
  "teamSize",
  "tags"
];


// GET ALL IDEAS
const getIdeas = async (req, res, next) => {
  try {
    const { search, category, stage, sort } = req.query;

    const filter = {};

    if (search) {
      // Escape special characters so the search is treated as plain text
      const text = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      filter.$or = [
        { title: { $regex: text, $options: "i" } },
        { description: { $regex: text, $options: "i" } },
        { tags: { $regex: text, $options: "i" } }
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (stage) {
      filter.stage = stage;
    }

    const sortOrder = sort === "oldest"
      ? { createdAt: 1 }
      : { createdAt: -1 };

    const ideas = await Idea.find(filter)
      .populate("author", "name email")
      .sort(sortOrder);

    res.json({
      success: true,
      count: ideas.length,
      ideas
    });

  } catch (error) {
    next(error);
  }
};


// GET SINGLE IDEA
const getIdeaById = async (req, res, next) => {
  try {
    const idea = await Idea.findById(req.params.id)
      .populate("author", "name email");

    if (!idea) {
      const error = new Error(
        "Idea not found"
      );

      error.statusCode = 404;

      throw error;
    }

    res.json({
      success: true,
      idea
    });

  } catch (error) {
    next(error);
  }
};


// CREATE IDEA
const createIdea = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      const error = new Error(
        "Title, description and category are required"
      );

      error.statusCode = 400;

      throw error;
    }

    const data = {};

    ideaFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        data[field] = req.body[field];
      }
    });

    data.author = req.user._id;

    const idea = await Idea.create(data);

    res.status(201).json({
      success: true,
      message: "Idea created successfully",
      idea
    });

  } catch (error) {
    next(error);
  }
};


// UPDATE IDEA
const updateIdea = async (req, res, next) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      const error = new Error(
        "Idea not found"
      );

      error.statusCode = 404;

      throw error;
    }

    if (idea.author.toString() !== req.user._id.toString()) {
      const error = new Error(
        "You can only edit your own ideas"
      );

      error.statusCode = 403;

      throw error;
    }

    ideaFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        idea[field] = req.body[field];
      }
    });

    await idea.save();

    res.json({
      success: true,
      message: "Idea updated successfully",
      idea
    });

  } catch (error) {
    next(error);
  }
};


// DELETE IDEA
const deleteIdea = async (req, res, next) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      const error = new Error(
        "Idea not found"
      );

      error.statusCode = 404;

      throw error;
    }

    if (idea.author.toString() !== req.user._id.toString()) {
      const error = new Error(
        "You can only delete your own ideas"
      );

      error.statusCode = 403;

      throw error;
    }

    await idea.deleteOne();

    res.json({
      success: true,
      message: "Idea deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  getIdeas,
  getIdeaById,
  createIdea,
  updateIdea,
  deleteIdea
};
