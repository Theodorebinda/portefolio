import React, { useRef, FormEvent } from 'react';
import emailjs, { init } from '@emailjs/browser'; // Utilisation de 'emailjs-com' pour simplifier la configuration

init('VCyUVQhmgVW3VDFiv'); // Initialisation avec votre user_id

export const ContactForm: React.FC = () => {
  const form = useRef<HTMLFormElement>(null); // Utilisation de useRef avec HTMLFormElement

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm('service_4p5in7e', 'template_8dz8bpg', form.current)
        .then(
          (result) => {
            console.log("message envoyer avec succes")
            console.log('SUCCESS!', result.text);
          },
          (error) => {
            console.log('FAILED...', error.text);
          }
        );
    }
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="name" placeholder='Votre nom'/>
      <label>Email</label>
      <input type="email" name="email" placeholder='votre email' />
      <label>Message</label>
      <textarea name="message" placeholder='votre message'/>
      <input type="submit" value="Send" />
    </form>
  );
};
