const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./my-database.db');

console.log('🔍 Inspection de la base de données...\n');

// Voir toutes les tables
db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
  if (err) {
    console.error('Erreur:', err);
  } else {
    console.log('📋 Tables disponibles:');
    tables.forEach(table => {
      console.log(`  - ${table.name}`);
    });
  }
  
  console.log('\n👥 UTILISATEURS:');
  // Voir tous les utilisateurs
  db.all('SELECT * FROM users', (err, users) => {
    if (err) {
      console.error('Erreur:', err);
    } else {
      users.forEach(user => {
        console.log(`  ID: ${user.id}`);
        console.log(`  Username: ${user.username}`);
        console.log(`  Role: ${user.role}`);
        console.log(`  Password: ${user.password.substring(0, 20)}...`);
        
        // Test du mot de passe admin
        if (user.username === 'admin') {
          const isValid = bcrypt.compareSync('admin', user.password);
          console.log(`  ✅ Test login admin: ${isValid ? 'VALIDE' : 'INVALIDE'}`);
        }
        console.log('  ---');
      });
    }
    
    console.log('\n📁 PROJETS:');
    // Voir tous les projets
    db.all('SELECT * FROM projects', (err, projects) => {
      if (err) {
        console.error('Erreur:', err);
      } else {
        if (projects.length === 0) {
          console.log('  Aucun projet trouvé');
        } else {
          projects.forEach(project => {
            console.log(`  ID: ${project.id}, Titre: ${project.title}`);
          });
        }
      }
      
      db.close();
      console.log('\n✅ Inspection terminée !');
    });
  });
});