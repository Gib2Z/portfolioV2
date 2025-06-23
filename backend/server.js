const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const port = 5000;

const SECRET_KEY = 'your_secret_key';

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Connect to SQLite database
const db = new sqlite3.Database('./my-database.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database');
  }
});

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Route de test
app.get('/test', (req, res) => {
  res.json({ message: 'CORS is working!' });
});


// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Route to handle login
app.post('/login', (req, res) => {
  console.log('🔍 Requête de login reçue !'); // AJOUTEZ CETTE LIGNE

  const { username, password } = req.body;
  console.log('Body:', req.body); 

  console.log('=== DEBUG LOGIN ===');
  console.log('1. Body reçu:', req.body);
  console.log('2. Username:', `"${username}"` + ` (length: ${username?.length})`);
  console.log('3. Password:', `"${password}"` + ` (length: ${password?.length})`);
  
  const sql = 'SELECT * FROM users WHERE username = ?';
  const params = [username];

  db.get(sql, params, (err, user) => {
    if (err) {
      console.log('4. DB Error:', err);
      res.status(400).json({ error: err.message });
      return;
    }
    
    console.log('5. User trouvé:', user);
    
    if (!user) {
      console.log('6. ÉCHEC: Aucun utilisateur trouvé');
      return res.status(401).json({ error: 'Invalid credentials - User not found' });
    }

    console.log('7. Comparaison mot de passe...');
    console.log('   Password saisi:', `"${password}"`);
    console.log('   Hash en DB:', user.password);
    
    try {
      const isMatch = bcrypt.compareSync(password, user.password);
      console.log('8. Résultat bcrypt:', isMatch);
      
      if (!isMatch) {
        console.log('9. ÉCHEC: Mot de passe incorrect');
        return res.status(401).json({ error: 'Invalid credentials - Wrong password' });
      }

      console.log('10. SUCCÈS: Login réussi!');
      const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token, role: user.role });
    } catch (bcryptError) {
      console.log('9. Erreur bcrypt:', bcryptError);
      return res.status(500).json({ error: 'Server error' });
    }
  });
});



// Route to add a new project
app.post('/projects', authenticateToken, upload.array('images'), (req, res) => {
  const { category, title, description, languages } = req.body;
  const images = req.files.map(file => file.buffer.toString('base64'));

  if (!category || !title || !description || !languages || !images.length) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'INSERT INTO projects (category, title, description, languages, images) VALUES (?, ?, ?, ?, ?)';
  const params = [category, title, description, languages, JSON.stringify(images)];
  db.run(sql, params, function(err) {
    if (err) {
      console.error('Error running SQL:', err.message);
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Route to get all projects
app.get('/projects', (req, res) => {
  const sql = 'SELECT id, category, title, description, languages, images FROM projects';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    rows.forEach(row => {
      if (row.images) {
        row.images = JSON.parse(row.images);
      }
    });
    res.json(rows);
  });
});

// Route to get a specific project by ID
app.get('/projects/:id', (req, res) => {
  const sql = 'SELECT * FROM projects WHERE id = ?';
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (row && row.images) {
      row.images = JSON.parse(row.images);
    }
    res.json(row);
  });
});

// Route to delete a project
// Route to delete a project (dans votre server.js)
app.delete('/projects/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  
  console.log('🗑️ Demande de suppression pour ID:', id);
  console.log('👤 Utilisateur:', req.user);

  // Vérifier si l'utilisateur est admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Accès interdit - Admin requis' });
  }

  const sql = 'DELETE FROM projects WHERE id = ?';
  db.run(sql, [id], function(err) { // ✅ Passer [id] au lieu de id
    if (err) {
      console.error('❌ Erreur SQL:', err.message);
      return res.status(500).json({ error: 'Erreur serveur lors de la suppression' });
    }
    
    console.log('📊 Nombre de lignes supprimées:', this.changes);
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Projet non trouvé' });
    }
    
    console.log('✅ Projet supprimé avec succès');
    res.json({ 
      message: 'Projet supprimé avec succès',
      deletedId: id,
      changes: this.changes
    });
  });
});


// Route to get categories - Updated categories
app.get('/categories', (req, res) => {
  const categories = [
    'Réseau & Cybersécurité',
    'Développement (Web, Mobile, Logiciel)'
  ];
  res.json(categories);
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
