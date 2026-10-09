const express = require("express");

const {
  getIdeas,
  getIdeaById,
  createIdea,
  updateIdea,
  deleteIdea
} = require("../controllers/ideaController");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", getIdeas);

router.get("/:id", getIdeaById);

router.post("/", protect, createIdea);

router.put("/:id", protect, updateIdea);

router.delete("/:id", protect, deleteIdea);

module.exports = router;
