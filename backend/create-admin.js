const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./my-database.db');

// Créer la table users si elle n'existe pas
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  role TEXT
)`);

// Supprimer l'ancien admin et créer un nouveau
db.run('DELETE FROM users WHERE username = ?', ['admin'], function(err) {
  if (err) {
    console.error('Erreur suppression:', err);
    return;
  }
  
  const hashedPassword = bcrypt.hashSync('admin', 10);
  
  db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', 
    ['admin', hashedPassword, 'admin'], function(err) {
    if (err) {
      console.error('Erreur création admin:', err);
      return;
    }
    
    console.log('✅ Utilisateur admin créé!');
    console.log('Username: admin');
    console.log('Password: admin');
    
    // Vérifier la création
    db.get('SELECT * FROM users WHERE username = ?', ['admin'], (err, user) => {
      if (err) {
        console.error('Erreur vérification:', err);
        return;
      }
      
      const isValid = bcrypt.compareSync('admin', user.password);
      console.log('🧪 Test password:', isValid ? '✅ OK' : '❌ FAIL');
      
      db.close();
    });
  });
});
