import React from 'react';
import '../style/Contact.css';

function Contact() {
  return (
    <section className="contact-section">
      <div className="contact-content">
        <h2 className="contact-title">Contactez Moi</h2>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" className="contact-btn">Envoyer</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
