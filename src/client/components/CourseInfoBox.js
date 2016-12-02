"use strict";
import React from "react";

const CourseInfoBox = ({courseName, level, standard, description}) => (
  <div class="box box-primary">
    <div class="box-header with-border">
      <h3 class="box-title">Course Info</h3>
    </div>
    <div class="box-body">
      <div class="course-name">
        <strong>Name:</strong> {courseName}
      </div>
      <div class="course-level">
        <strong>Difficulty Level:</strong> {level}
      </div>
      <div class="course-standard">
        <strong>Course Standard:</strong> {standard}
      </div>
      <div class="course-description">
        <strong>Description:</strong> {description}
      </div>
    </div>
  </div>
);

export default CourseInfoBox;
