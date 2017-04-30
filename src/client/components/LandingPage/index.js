
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';

import HeaderRow from '../Header/HeaderRow';

import style from './style';

const Introduction = () => (
  <div className="mdl-grid">
    <div className="mdl-cell mdl-cell--12-col">
      <div className="mdl-card mdl-shadow--4dp" style={style.card}>
        <div className="mdl-card__media" style={style.card.media}>
          <img
            src="https://storage.googleapis.com/mayash/website/mayash-title-2.png"
            alt=""
            style={style.card.media.image}
          />
        </div>
        <div className="mdl-card__title" style={style.card.title}>
          <h2 className="mdl-card__title-text" style={style.card.title.heading}>
            Introduction
          </h2>
        </div>
        <div className="mdl-card__supporting-text" style={style.card.description}>
          <p>
            <b>Mayash</b> is a team of enthusiastic younger of Bharath committed to solve the challenges of our
            society. As there are so many challenges are out there, problems in education system and media & Governance
            are the burning issue right now.
          </p>
          <p>
            We are attempting to solve two major problems in our society:
            1. Problems in Education system.
            2. Governance & Media.
          </p>

          <h4>First let Talk about <b>Education System:</b></h4>
          <article>
            <p>
              Education is considered the most important part of any human being and for us definition of Education is to
              bring the best of every human being. But our present education system does not focus on this, for now
              education system only focus on marks not in skill development.
            </p>
            <p>
              <b>Mayash</b> is formed to improve this education system and make it much more efficient so that every
              student can get the best of what they want to learn and grow.
            </p>
          </article>
        </div>
      </div>
    </div>
  </div>
);

const Motivation = () => (
  <div className="mdl-grid">
    <div className="mdl-cell mdl-cell--12-col">
      <div className="mdl-card mdl-shadow--4dp" style={style.card}>
        <div className="mdl-card__media" style={style.card.media}>
          <img
            src="https://storage.googleapis.com/mayash/website/Mayash%20Motivation%20(1).jpg"
            alt=""
            style={style.card.media.image}
          />
        </div>
        <div className="mdl-card__title" style={style.card.title}>
          <h2 className="mdl-card__title-text">Motivation</h2>
        </div>
        <div className="mdl-card__supporting-text" style={style.card.description}>
          <p>
            <b>Bharath</b> as 'The land of knowledge' has known for centuries but in last 800 years we
            have gone through lot of suffering and changes which has pulled us backward. We
            are committed to return that glories.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Team = () => {
  const members = [
    {
      id: 1,
      name: 'Himank Honey Barve',
      role: 'Founder & CEO @Mayash',
    },
    {
      id: 2,
      name: 'Gaurav Goyal',
      role: 'Mentor',
    },
    {
      id: 3,
      name: 'Avinash Yadav',
      role: 'Mentor',
    },
    {
      id: 4,
      name: 'Shreya Sinha',
      role: 'Management Team',
    },
    {
      id: 5,
      name: 'Aditya Gangwar',
      role: 'Management Head',
    },
    {
      id: 6,
      name: 'Apoorv Varhney',
      role: 'Promotion Head',
    },
    {
      id: 7,
      name: 'Manu Garg',
      role: 'Promotion Team',
    },
    {
      id: 8,
      name: 'Aman Singh',
      role: 'Promotion Event Head',
    },
    {
      id: 9,
      name: 'Niyati Chouhan',
      role: 'Promotion & Content Writing',
    },
    {
      id: 10,
      name: 'Mansi Saini',
      role: 'Content Writing',
    },
    {
      id: 11,
      name: 'Shubham Maurya',
      role: 'Developer',
    },
  ];

  return (
    <div className="mdl-grid">
      {members.map(member => (
        <div className="mdl-cell mdl-cell--3-col" key={member.id}>
          <div className="mdl-card mdl-shadow--4dp" style={{width: '100%', minHeight: '50px'}}>
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">{member.name}</h2>
            </div>
            <div className="mdl-card__supporting-text">
              {member.role}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ProductAndServices = () => {
  const members = [
    {
      id: 1,
      title: 'World Class Education at your door step.',
      description: '',
    },
    {
      id: 2,
      title: 'Language Independence.',
      description: 'We are working on to make education free from language restriction.',
    },
    {
      id: 3,
      title: 'Practical knowledge.',
      description: 'Focus on Practical understanding rather then just theoretical knowledge.',
    },
    {
      id: 4,
      title: 'Connect with other educational institutes.',
      description: 'We are making this platform to connect all educational institute.',
    },
    {
      id: 5,
      title: 'All fields of education are covered.',
      description: 'We are covering all fields of education, not just academic but music, dance, sports etc.',
    },
  ];

  return (
    <div className="mdl-grid">
      {members.map(member => (
        <div className="mdl-cell mdl-cell--3-col" key={member.id}>
          <div className="mdl-card mdl-shadow--4dp" style={{width: '100%', minHeight: '50px'}}>
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">{member.title}</h2>
            </div>
            <div className="mdl-card__supporting-text">
              {member.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const MayashMedia = () => (
  <div className="mdl-grid">
    <div className="mdl-cell mdl-cell--12-col">
      <div className="mdl-card mdl-shadow--4dp" style={{width: '100%', minHeight: '50px'}}>
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">Mayash Media</h2>
        </div>
        <div className="mdl-card__supporting-text">
          <article>
            <p>
              We are working on a second project also, which is to improve media and governance in our country.
            </p>
            <p>
              We are regularly getting fake news or some biased prospective of any incident.
            </p>
            <p>
              Here are Mayash Media, we are trying to create news channel for every single locality. Here people can see
              news from any locality and can report news also.
            </p>
            <p>
              We are looking for enthusiastic people who are wants to make world a better place to live. If you are
              interested in joining us. Contact us <a href="https://www.facebook.com/mayashmedia" target="_blank">
              Mayash Media</a>
            </p>
          </article>
        </div>
      </div>
    </div>
  </div>
);

const ContactUs = () => (
  <div className="mdl-grid">
    <div className="mdl-cell mdl-cell--12-col">
      <div className="mdl-card mdl-shadow--4dp" style={{width: '100%', minHeight: '50px'}}>
        <div className="mdl-card__media">
          <img
            src="https://storage.googleapis.com/mayash/website/mayash-contact-us.jpg"
            alt=""
            style={{ width: '100%', minHeight: '100px' }}
          />
        </div>
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">
            Contact Us
          </h2>
        </div>
        <div className="mdl-card__supporting-text">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScmtajc-7hLPbuaihOpZcRtT8aUah02vrfKsvY1ohsZ4gvatQ/viewform?embedded=true"
            width="100%"
            height="750px"
            frameBorder={0}
            marginHeight={0}
            marginWidth={0}
          >
            Loading...
          </iframe>
        </div>
      </div>
    </div>
  </div>
);

const LandingPage = () => {
  return (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-drawer-button">
      <header className="mdl-layout__header">
        <HeaderRow />

        <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
          <a href="#introduction" className="mdl-layout__tab is-active">Introduction</a>
          <a href="#motivation" className="mdl-layout__tab">Motivation</a>
          <a href="#team" className="mdl-layout__tab">Team</a>
          <a href="#product-and-services" className="mdl-layout__tab">Product & Services</a>
          <a href="#mayash-media" className="mdl-layout__tab">Mayash Media</a>
          <a href="#contact-us" className="mdl-layout__tab">Contact Us</a>
        </div>
      </header>
      <main className="mdl-layout__content">
        <p style={{textAlign: 'center', position: 'fixed', bottom: '0', zIndex: 999, }}>
          <b>Note:</b> We are in Beta stage right now, our website is in active development. If you are having any trouble feel free
          to contact us.
        </p>
        <section className="mdl-layout__tab-panel is-active" id="introduction">
          <div className="page-content">
            <Introduction/>
          </div>
        </section>
        <section className="mdl-layout__tab-panel" id="motivation">
          <div className="page-content">
            <Motivation/>
          </div>
        </section>
        <section className="mdl-layout__tab-panel" id="team">
          <div className="page-content">
            <Team/>
          </div>
        </section>
        <section className="mdl-layout__tab-panel" id="product-and-services">
          <div className="page-content">
            <ProductAndServices/>
          </div>
        </section>
        <section className="mdl-layout__tab-panel" id="mayash-media">
          <div className="page-content">
            <MayashMedia/>
          </div>
        </section>
        <section className="mdl-layout__tab-panel" id="contact-us">
          <div className="page-content">
            <ContactUs/>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
