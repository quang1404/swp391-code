const db = require('../config/db');

// Get all news blogs
const getAllNewsBlogs = (callback) => {
  const query = `SELECT * FROM News_blog;`;
  db.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

// Get news blog by ID
const getNewsBlogById = (id, callback) => {
  const query = `SELECT * FROM News_blog WHERE id = ?;`;
  db.query(query, [id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    if (results.length > 0) {
      return callback(null, results[0]);
    } else {
      return callback(null,   
 null); // News blog not found
    }
  });
};

// Create news blog
const createNewsBlog = (image, title, content, date_published, user_id, callback) => {
  
  if (!image || !title || !content || !date_published || !user_id) {
    return callback(new Error('Invalid input data. Please check all fields.'), null);
  }

  const query = `
    INSERT INTO News_blog (image, title, content, date_published, user_id)
    VALUES (?, ?, ?, ?, ?);
  `;
  db.query(query, [image, title, content, date_published, user_id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results.affectedRows);
  });
};

// Update news blog by ID
const updateNewsBlogById = (id, image, title, content, date_published, user_id, callback) => {
  
  if (!image || !title || !content || !date_published || !user_id) {
    return callback(new Error('Invalid input data. Please check all fields.'), null);
  }

  const query = `
    UPDATE News_blog 
    SET image = ?, title = ?, content = ?, date_published = ?, user_id = ?
    WHERE id = ?;
  `;
  db.query(query, [image, title, content, date_published, user_id, id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results.affectedRows);
  });
};

// Delete news blog by ID
const deleteNewsBlogById = (id, callback) => {
  const query = `DELETE FROM News_blog WHERE id = ?;`;
  db.query(query, [id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results.affectedRows);
  });
};

module.exports = {
  getAllNewsBlogs,
  getNewsBlogById,
  createNewsBlog,
  updateNewsBlogById,
  deleteNewsBlogById
};