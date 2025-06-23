const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('./my-database.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database');
    
    // Drop the existing projects table if it exists
    db.run(`DROP TABLE IF EXISTS projects`, (err) => {
      if (err) {
        console.error('Error dropping projects table', err.message);
      } else {
        console.log('Projects table dropped');

        // Create the projects table with the images column
        db.run(`CREATE TABLE projects (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          category TEXT,
          title TEXT,
          description TEXT,
          languages TEXT,
          images TEXT
        )`, (err) => {
          if (err) {
            console.error('Error creating projects table', err.message);
          } else {
            console.log('Projects table created');
          }
        });
      }
    });

    // Create the users table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )`, (err) => {
      if (err) {
        console.error('Error creating users table', err.message);
      } else {
        console.log('Users table created');
        
        // Optionally, insert a default admin user
        db.run(`INSERT OR IGNORE INTO users (username, password, role)
          VALUES ('admin', 'admin', 'admin')`, (err) => {
          if (err) {
            console.error('Error inserting default admin user', err.message);
          } else {
            console.log('Default admin user inserted');
          }
        });
      }
    });
  }
});
