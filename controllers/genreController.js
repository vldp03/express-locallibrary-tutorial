const Genre = require("../models/genre");
const asyncHandler = require("express-async-handler");
const Book = require("../models/book");
const { body, validationResult } = require("express-validator");

exports.genre_list = asyncHandler(async (req, res) => {
  const list_genres = await Genre.find().sort([["name", "ascending"]]);
  res.json({ genre_list: list_genres });
});

exports.genre_detail = asyncHandler(async (req, res, next) => {
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, "title summary").exec(),
  ]);
  if (genre === null) {
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }
  res.json({ genre: genre, genre_books: booksInGenre });
});

exports.genre_create_get = (req, res, next) => {
  res.render("genre_form", { title: "Create Genre" });
};

exports.genre_create_post = [
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const genre = new Genre({ name: req.body.name });
    if (!errors.isEmpty()) {
      res.json({ genre: genre, errors: errors.array() });
      return;
    } else {
      const genreExists = await Genre.findOne({ name: req.body.name }).exec();
      if (genreExists) {
        res.json({ message: "Genre already exists" });
      } else {
        await genre.save();
        res.json({ genre: genre });
      }
    }
  }),
];

exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, "title summary").exec(),
  ]);
  if (booksInGenre.length > 0) {
    res.json({ message: "Genre has books. Delete them first" });
    return;
  } else {
    await Genre.findByIdAndDelete(req.body.id);
    res.json({ genre: genre });
  }
});

exports.genre_update_get = asyncHandler(async (req, res, next) => {
  const genre = await Genre.findById(req.params.id).exec();
  if (genre === null) {
    const err = new Error("Genre not found");
    err.status = 404;
    return next(err);
  }
  res.json({ genre: genre });
});

exports.genre_update_post = [
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const genre = new Genre({
      name: req.body.name,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.json({ genre: genre, errors: errors.array() });
      return;
    } else {
      await Genre.findByIdAndUpdate(req.params.id, genre);
      res.json({ genre: genre });
    }
  }),
];
