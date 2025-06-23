const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./my-database.db');

console.log('🔧 CORRECTION DE L\'UTILISATEUR ADMIN\n');

// Supprimer TOUS les utilisateurs
db.run('DELETE FROM users', (err) => {
  if (err) {
    console.error('Erreur suppression:', err);
    return;
  }
  
  console.log('✅ Tous les anciens utilisateurs supprimés');
  
  // Créer UN SEUL admin propre
  const cleanPassword = 'admin';
  const hashedPassword = bcrypt.hashSync(cleanPassword, 10);
  
  console.log(`🔐 Création de l'admin:`);
  console.log(`   Username: "admin"`);
  console.log(`   Password: "admin"`);
  console.log(`   Hash: ${hashedPassword}`);
  
  db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', 
    ['admin', hashedPassword, 'admin'], function(err) {
    if (err) {
      console.error('Erreur création:', err);
      return;
    }
    
    console.log(`✅ Admin créé avec ID: ${this.lastID}`);
    
    // Test immédiat
    db.get('SELECT * FROM users WHERE username = ?', ['admin'], (err, user) => {
      if (err) {
        console.error('Erreur test:', err);
        return;
      }
      
      const testResult = bcrypt.compareSync('admin', user.password);
      console.log(`\n🧪 Test de connexion: ${testResult ? '✅ SUCCÈS' : '❌ ÉCHEC'}`);
      
      if (testResult) {
        console.log('\n🎉 PRÊT! Vous pouvez maintenant vous connecter avec:');
        console.log('   Username: admin');
        console.log('   Password: admin');
      }
      
      db.close();
    });
  });
});
