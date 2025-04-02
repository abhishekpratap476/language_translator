const express = require("express");
const book = express.Router();
const bookData = require("../models/translate");

book.post("/trr", async (req, res) => {
  console.log(req.body);
  const { text, language, translatedText } = req.body; // Updated field names
  try {
    // Check if book with same title already exists
    

    // If book doesn't exist, create the book
    const bookAdded = await bookData.create({
      text: text,
      language: language,
      translatedText: translatedText,
    });
    res.status(201).json(bookAdded);
  } catch (error) {
    console.log(error);
    res.status(403).json({ error: error.message });
  }
});
book.get("/second-schema-data", async (req, res) => {
  try {
    // Fetch data from the second schema
    const secondSchemaData = await bookData.find();

    // Send the data as a response
    res.status(200).json(secondSchemaData);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data from second schema", message: error.message });
  }
});

module.exports = book;