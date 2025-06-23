const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./my-database.db');

console.log('🔍 VÉRIFICATION COMPLÈTE DE LA DB\n');

// Compter les utilisateurs
db.get('SELECT COUNT(*) as count FROM users', (err, result) => {
  if (err) {
    console.error('Erreur:', err);
    return;
  }
  
  console.log(`📊 Nombre total d'utilisateurs: ${result.count}\n`);
  
  // Lister TOUS les utilisateurs
  db.all('SELECT * FROM users ORDER BY id', (err, users) => {
    if (err) {
      console.error('Erreur:', err);
      return;
    }
    
    console.log('👥 LISTE COMPLÈTE DES UTILISATEURS:');
    users.forEach((user, index) => {
      console.log(`\n--- Utilisateur ${index + 1} ---`);
      console.log(`ID: ${user.id}`);
      console.log(`Username: "${user.username}"`);
      console.log(`Role: ${user.role}`);
      console.log(`Password hash: ${user.password}`);
      console.log(`Username length: ${user.username.length}`);
      
      // Test avec "admin"
      try {
        const testResult = bcrypt.compareSync('admin', user.password);
        console.log(`Test "admin": ${testResult ? '✅ OK' : '❌ ÉCHEC'}`);
      } catch (e) {
        console.log(`Test "admin": ❌ ERREUR (${e.message})`);
      }
    });
    
    // Test de création d'un utilisateur propre
    console.log('\n🧪 TEST: Création d\'un utilisateur test...');
    const testHash = bcrypt.hashSync('admin', 10);
    const testMatch = bcrypt.compareSync('admin', testHash);
    console.log(`Hash créé: ${testHash}`);
    console.log(`Test immédiat: ${testMatch ? '✅ OK' : '❌ ÉCHEC'}`);
    
    db.close();
  });
});