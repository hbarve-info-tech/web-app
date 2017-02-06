
import React from 'react';

import style from './style';

const ContactUs = () => {
  return (
    <div style={style}>
      <div className="mdl-card mdl-shadow--4dp" style={style.introduction}>
        <div className="mdl-card__media">
          <img
            src="https://storage.googleapis.com/mayash/website/mayash-contact-us.jpg"
            alt=""
            style={{ width: '100%', minHeight: '100px' }}
          />
        </div>
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text" style={style.introduction.title.heading}>
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
  );
};

export default ContactUs;
