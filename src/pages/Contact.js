import React from 'react';
import { Link } from 'react-router-dom';
import CreateUserForm from '../components/Template/NewUserSubmit';
import Main from '../layouts/Main';
import EmailLink from '../components/Contact/EmailLink';
import ContactIcons from '../components/Contact/ContactIcons';

const Contact = () => (
  <Main
    title="Contact"
    description="Contact Mohamed Hassanin via email @ hassanin@udel.edu"
  >
    <article className="post" id="contact">
      <header>
        <div className="title">
          <h2><Link to="/contact">Contact</Link></h2>
        </div>
      </header>
      <div className="email-at">
        <p>Feel free to get in touch. You can email me at: </p>
        <EmailLink />
      </div>
      <ContactIcons />
      <CreateUserForm />
    </article>
  </Main>
);

export default Contact;
