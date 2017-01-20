
import React from 'react';

const IsClient = typeof document === 'object';

if (IsClient) {
  require('./Footer.scss');
}

export default () => (
  <footer className="mdl-mini-footer">
    <div className="mdl-mini-footer__left-section">
      <div className="mdl-logo">Mayash</div>
      <ul className="mdl-mini-footer__link-list">
        <li><a href="#">Help</a></li>
        <li><a href="#">Privacy & Terms</a></li>
      </ul>
    </div>
  </footer>
);
