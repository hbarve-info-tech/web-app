"use strict";
import React        from 'react';
import { render }   from 'react-dom';

import App from "./App";

import "./style.css";

window.onload = () => {
  render(
    <App />,
    document.getElementById('app')
  );
};