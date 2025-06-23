const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./my-database.db');

console.log('🧹 Nettoyage de la base de données...\n');

// Supprimer tous les utilisateurs admin en double
db.run('DELETE FROM users WHERE id > 1', (err) => {
  if (err) {
    console.error('Erreur lors de la suppression:', err);
  } else {
    console.log('✅ Utilisateurs en double supprimés');
    
    // Vérifier qu'il ne reste qu'un seul admin
    db.all('SELECT * FROM users', (err, users) => {
      if (err) {
        console.error('Erreur:', err);
      } else {
        console.log(`\n👥 Utilisateurs restants: ${users.length}`);
        users.forEach(user => {
          console.log(`  - ID: ${user.id}, Username: ${user.username}`);
          
          // Test du mot de passe
          const isValid = bcrypt.compareSync('admin', user.password);
          console.log(`  - Login test: ${isValid ? '✅ VALIDE' : '❌ INVALIDE'}`);
        });
      }
      
      db.close();
      console.log('\n✅ Nettoyage terminé !');
    });
  }
});