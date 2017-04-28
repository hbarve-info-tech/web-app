
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';


import style from './style';

const temp = () => (
  <div style={style.landingPage}>
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

    <div className="mdl-card mdl-shadow--4dp" style={style.card}>
      <div className="mdl-card__media" style={style.card.media}>
        <img
          src="https://storage.googleapis.com/mayash/website/Mayash-product-and-services.jpg"
          alt=""
          style={style.card.media.image}
        />
      </div>
      <div className="mdl-card__title" style={style.card.title}>
        <h2 className="mdl-card__title-text">Products And Services</h2>
      </div>
      <div className="mdl-card__supporting-text" style={style.card.description}>
        <p>
          We are connecting all educational institutes in one platform to make a healthy environment for
          learning and sharing.
        </p>
        <p>Here we are covering all fields of education, for all age groups with the independence of language.</p>
      </div>
    </div>

    <div className="mdl-card mdl-shadow--4dp" style={style.card}>
      <div className="mdl-card__media" style={style.card.media}>
        <img
          src="https://storage.googleapis.com/mayash/website/mayash-team.jpg"
          alt=""
          style={style.card.media.image}
        />
      </div>
      <div className="mdl-card__title" style={style.card.title}>
        <h2 className="mdl-card__title-text">Team</h2>
      </div>
      <div className="mdl-card__supporting-text" style={style.card.description}>
        Team plays a vital role in every great project. Our team is not less than any one.

        <ul>
          <li>Himank Barve, Founder & CEO</li>
          <li>Gaurav Goyal, Mentor</li>
          <li>Shreya Sinha, Manager</li>
          <li>Avinash Yadav, Mentor</li>
          <li>Apoorva Varhney, Marketing & Promotion</li>
          <li>Aditya Gangwar, Manager</li>
          <li>Shubham Maurya, Developer</li>
          <li>Niyati Chouhan, Promotion</li>
          <li>Manu Garg, Promotion</li>
          <li>Aman Singh, Promotion</li>
        </ul>
      </div>
    </div>
  </div>
);

class LandingPage extends Component {

  render() {
    const user = this.props.elements[0];

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-drawer-button">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Mayash</span>

            <div className="mdl-layout-spacer" />

            <button
              id="sign-in-dropdown"
              className="mdl-button mdl-js-button mdl-button--icon"
            >
              <i className="material-icons">more_vert</i>
            </button>
            <ul
              className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
              htmlFor="sign-in-dropdown"
            >
              {user.isSignedIn ? (
                <li
                  className="mdl-menu__item"
                  onClick={this.props.signOut}
                >
                  Sign Out
                </li>
              ) : (
                <li className="mdl-menu__item" onClick={(e) => {
                  // e.preventDefault();
                  browserHistory.push('/signin');
                }}>
                  Sign In
                </li>
              )}
            </ul>
          </div>

          <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
            <a href="#scroll-tab-1" className="mdl-layout__tab is-active">Introduction</a>
            <a href="#scroll-tab-2" className="mdl-layout__tab">Motivation</a>
            <a href="#scroll-tab-3" className="mdl-layout__tab">Team</a>
            <a href="#scroll-tab-4" className="mdl-layout__tab">Product & Features</a>
            <a href="#scroll-tab-5" className="mdl-layout__tab">Contact Us</a>
          </div>
        </header>
        <main className="mdl-layout__content">
          <section className="mdl-layout__tab-panel is-active" id="scroll-tab-1">
            <div className="page-content">Tab 1</div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-2">
            <div className="page-content">Tab2</div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-3">
            <div className="page-content">Tab3</div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-4">
            <div className="page-content">Tab4</div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-5">
            <div className="page-content">Tab5</div>
          </section>
        </main>
      </div>
    );
  }
}

LandingPage.propTypes = {
  elements: PropTypes.array,
  signIn: PropTypes.func,
  signOut: PropTypes.func,
};

const mapStateToProps = state => state;
const mapDispatchToProps = (dispatch) => {
  const { signIn, signOut } = actions;
  return bindActionCreators({ signIn, signOut }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
