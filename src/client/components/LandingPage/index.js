
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';

import HeaderRow from '../Header/HeaderRow';
import SignIn from '../SignIn';
import SignUp from '../SignUp';

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
          <article>
            <p>
              Mayash is the leading service provider of various educational courses for undergraduates and post graduates.
              We are looking for the improvement in educational system, where we will be providing them with the updated
              knowledge and the latest technologies for students to upgrade their skills.
            </p>
            <p>
              The founder of this website is Mr. Himank Honey Barve. The website is concerned with the improvement of education system within the country
              and bringing awareness among the society.
            </p>
          </article>
        </div>
      </div>
    </div>
  </div>
);

const Vision = () => (
  <div className="mdl-grid">
    <div className="mdl-cell mdl-cell--12-col">
      <div className="mdl-card mdl-shadow--4dp" >
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">Vision</h2>
        </div>
        <div className="mdl-card__supporting-text">
          <p>
            Providing quality education to each and everyone.
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

const Services = () => {
  return (
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--12-col">
        <div className="mdl-card mdl-shadow--4dp">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">Services for Students</h2>
          </div>
          <div className="mdl-card__supporting-text">
            <h5>Services:</h5>
            <ul>
              <li>Subject Notes.</li>
              <li>Test Series.</li>
              <li>Discussion Channel.</li>
              <li>Career Guidance.</li>
            </ul>
            <h5>Pricing:</h5>
            <ul>
              <li>Registration: Free</li>
              <li>Basic Services: Free</li>
              <li>Specific Courses: Charged</li>
              <li>Test Series: Charged</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mdl-cell mdl-cell--12-col">
        <div className="mdl-card mdl-shadow--4dp">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">Services for Teachers & Professors</h2>
          </div>
          <div className="mdl-card__supporting-text">
            <h5>Services:</h5>
            <ul>
              <li>Create and Share knowledge is the form of courses.</li>
              <li>Direct interaction with students in single platform.</li>
            </ul>
            <h5>Pricing:</h5>
            <ul>
              <li>Registration: Free</li>
              <li>Basic Services: Free</li>
              <li>Premium Services: Charged</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mdl-cell mdl-cell--12-col">
        <div className="mdl-card mdl-shadow--4dp">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">Services for Educational Institutes</h2>
          </div>
          <div className="mdl-card__supporting-text">
            <h5>Services:</h5>
            <ul>
              <li>Institute will get a private virtual classroom network.</li>
              <li>Teacher can share their course, give assignment, take class test etc.</li>
              <li>Students can interact with their teachers in single platform.</li>
              <li>Students and teachers will get the updated technology to study, and improve the education.</li>
              <li>Campus placement study material and updates.</li>
              <li>Alumni connect.</li>
            </ul>
            <h5>Pricing:</h5>
            <ul>
              <li>Registration: Free</li>
              <li>Teacher's Registration: Free</li>
              <li>Student's Registration: 2000/- per head</li>
              <li>Basic Services: Free</li>
              <li>Premium Services: Charged</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mdl-cell mdl-cell--12-col">
        <div className="mdl-card mdl-shadow--4dp">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">Services for Organisations & Companies</h2>
          </div>
          <div className="mdl-card__supporting-text">
            <h5>Services:</h5>
            <ul>
              <li>Can post their job vacancy with details.</li>
              <li>Can guide people for preparation of jobs in your company.</li>
              <li>Sharing the specific knowledge and technology.</li>
              <li>If you are working on a new technology, you can create course for it and share with people.</li>
            </ul>
            <h5>Pricing:</h5>
            <ul>
              <li>Registration: Free</li>
              <li>Basic Services: Free</li>
              <li>Premium Services: Charged</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mdl-cell mdl-cell--12-col">
        <div className="mdl-card mdl-shadow--4dp">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">General Public</h2>
          </div>
          <div className="mdl-card__supporting-text">
            <h5>Services:</h5>
            <ul>
              <li>Posting and sharing their thoughts.</li>
              <li>Get updated knowledge in any field.</li>
            </ul>
            <h5>Pricing:</h5>
            <ul>
              <li>Registration: Free</li>
              <li>Basic Services: Free</li>
              <li>Premium Services: Charged</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Hiring = () => (
  <div className="mdl-grid">
    <div className="mdl-cell mdl-cell--12-col">
      <div className="mdl-card mdl-shadow--4dp">
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">
            Join our team to make a positive difference in society.
          </h2>
        </div>
        <div className="mdl-card__supporting-text">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfOhyNRRWtPzb0TEDYpcZ2HbdAhdF-54Wu49_gB9Io1ISM5kw/viewform?embedded=true"
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

const ContactUs = () => (
  <div className="mdl-grid">
    <div className="mdl-cell mdl-cell--12-col">
      <div className="mdl-card mdl-shadow--4dp">
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
          <p><b>Name: </b> Himank Honey Barve</p>
          <p><b>Email: </b> hbarve1592@gmail.com</p>
          <p><b>Mobile No.: </b> 9097535837</p>
          <p><b>Facebook: </b> https://facebook.com/hbarve1</p>
          <p><b>Twitter: </b> https://twitter.com/hbarve1</p>
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

const LandingPage = () => (
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-drawer-button">
    <header className="mdl-layout__header">
      <HeaderRow />
    </header>
    <main className="mdl-layout__content">
      <div className="page-content">
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col mdl-cell--8-col-desktop mdl-cell--5-col-tablet mdl-cell--4-col-mobile">
            <div className="mdl-card mdl-shadow--4dp">
              <div className="mdl-card__title">
                <h2 className="mdl-card__title-text">
                  Contact Us
                </h2>
              </div>
              <div className="mdl-card__supporting-text">
                <p><b>Name: </b> Himank Honey Barve</p>
                <p><b>Email: </b> hbarve1592@gmail.com</p>
                <p><b>Mobile No.: </b> 9097535837</p>
                <p><b>Facebook: </b> https://facebook.com/hbarve1</p>
                <p><b>Twitter: </b> https://twitter.com/hbarve1</p>
              </div>
            </div>
          </div>
          <div className="mdl-cell mdl-cell--12-col mdl-cell--4-col-desktop mdl-cell--3-col-tablet mdl-cell--4-col-mobile">
            <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect mdl-shadow--4dp">
              <div className="mdl-tabs__tab-bar">
                <a href="#signin" className="mdl-tabs__tab is-active">Sign In</a>
                <a href="#signup" className="mdl-tabs__tab">Sign Up</a>
              </div>

              <div className="mdl-tabs__panel is-active" id="signin">
                <SignIn/>
              </div>
              <div className="mdl-tabs__panel" id="signup">
                <SignUp/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default LandingPage;
