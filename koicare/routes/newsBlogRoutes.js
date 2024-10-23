const express = require('express');
const router = express.Router();
const NewsBlog = require('../models/newsBlog');

// Get all news blogs
router.get('/', (req, res) => {
  NewsBlog.getAllNewsBlogs((error, newsBlogs) => {
    if (error) {
      console.error('Error fetching news blogs:', error);
      return res.status(500).json({ error: error.toString() });;
    }
    res.json(newsBlogs);
  });
});

// Get news blog by ID
router.get('/:id', (req, res) => {
  const newsBlogId = req.params.id;
  NewsBlog.getNewsBlogById(newsBlogId, (error, newsBlog) => {
    if (error) {
      console.error('Error fetching news blog:', error);
      return res.status(500).json({ error: error.toString() });;
    }
    if (!newsBlog) {
      return res.status(404).json({ message: 'News blog not found' });
    }
    res.json(newsBlog);
  });
});

// Create news blog
router.post('/', (req, res) => {
  const { image, title, content, date_published, user_id } = req.body;

  if (!image || !title || !content || !date_published || !user_id) {
    return res.status(400).json({ message: 'Invalid input data. Please check all fields.' });
  }

  NewsBlog.createNewsBlog(image, title, content, date_published, user_id, (error, result) => {
    if (error) {
      console.error('Error creating news blog:', error);
      return res.status(500).json({ error: error.toString() });;
    }
    res.status(201).json({ message: 'News blog created successfully' });
  });
});

// Update news blog by ID
router.put('/:id', (req, res) => {
  const newsBlogId = req.params.id;
  const { image, title, content, date_published, user_id } = req.body;

  NewsBlog.updateNewsBlogById(newsBlogId, image, title, content, date_published, user_id, (error, result) => {
    if (error) {
      console.error('Error updating news blog:', error);
      if (error.message === 'No fields to update.') {
        return res.status(400).json({ message: error.message });
      } else if (error.message.startsWith('Invalid input data')) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ error: error.toString() });
      }
    }
    if (result === 1) {
      res.json({ message: 'News blog updated successfully' });
    } else {
      res.status(404).json({ message: 'News blog not found' });
    }
  });
});

// Delete news blog by ID
router.delete('/:id', (req, res) => {
  const newsBlogId = req.params.id;
  NewsBlog.deleteNewsBlogById(newsBlogId, (error, result) => {
    if (error) {
      console.error('Error deleting news blog:', error);
      return res.status(500).json({ error: error.toString() });;
    }
    if (result === 1) {
      res.json({ message: 'News blog deleted successfully' });
    } else {
      res.status(404).json({ message: 'News blog not found' });
    }
  });
});

module.exports = router;