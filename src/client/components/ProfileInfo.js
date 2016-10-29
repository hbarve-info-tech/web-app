"use strict";
import React from "react";
import { browserHistory } from "react-router";
import { Image, Button } from "react-bootstrap";

const ProfileInfo = ({user}) => {
  return (
    <div class="box box-primary">
      <div class="box-body box-profile">
        <Image class="profile-user-img img-responsive img-circle" src={user.profilePic}/>
        <h3 class="profile-username text-center">@{user.username}</h3>
        <p class="profile-name text-center">{user.name}</p>
      </div>
      {
        user.classroom ? (
          <div class="box-footer text-center">
            <Button
              bsStyle="primary"
              bsSize="small"
              onClick={(e)=>{
                e.preventDefault();
                 browserHistory.push('/' + user.username + '/classroom')
              }}
            >
              Classroom
            </Button>
          </div>
        ): null
      }
    </div>
  );
};

export default ProfileInfo;
