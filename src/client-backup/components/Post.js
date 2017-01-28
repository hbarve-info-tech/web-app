"use strict";
import React, { Component, PropTypes }  from "react";
import { Link }  from "react-router";
import { Grid, Row, Col, Button } from "react-bootstrap";

const UserInfo = ({name, username, profilePic}) => (
  <div class="user-block">
    <img
      class="img-circle img-bordered-sm"
      src={profilePic}
      alt={name}
    />
    <span class="username">
      <a
        href={'/' + username}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        {name}
      </a>
    </span>
  </div>
);

const CoursePost = ({courseId, courseName, description, level, standard}) => (
  <div>
    <h5>
      <Link to={'/courses/' + courseId}>
        {courseName}
      </Link>
    </h5>
    <p>{description}</p>
  </div>
);

const ArticlePost = ({articleId, articleName, description}) => (
  <div>
    <h5>
      <Link to={'/articles/' + articleId}>
        {articleName}
      </Link>
    </h5>
    <p>{description}</p>
  </div>
);

const Post = ({ user , postType, post}) => (
  <div class="box box-primary">
    <div class="box-body">
      {postType === "article" ? <ArticlePost {...post} /> : <CoursePost {...post}/>}
    </div>
  </div>
);


export default Post;