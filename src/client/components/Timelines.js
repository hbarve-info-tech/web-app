"use strict";
import React, { Component, PropTypes }  from "react";
import { Tabs, Tab } from "react-bootstrap";

import Timeline from "../components/Timeline";

const Timelines = ({tabs}) => (
  <Tabs
    defaultActiveKey ={1}
    id               ="timelines"
    class            ="nav-tabs-custom"
  >
    {tabs.map((tab, index) => {
      return (
        <Tab
          eventKey={index + 1}
          title   ={tab.title}
          key     ={index}
        >
          <Timeline tab={tab}/>
        </Tab>
      );
    })}
  </Tabs>
);

export default Timelines;
