"use strict";
import React, { Component, PropTypes }  from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from "react-router";

import actions from '../../actions';
import { Grid, Row, Col, Button, Well,
  Image, Thumbnail, Panel, Modal, Clearfix } from "react-bootstrap";

// import SignIn from "./SignIn";

class Head extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showModel: false
    };
  }

  close = () => {
    this.setState({
      showModal: false
    });
  };

  open  = () => {
    this.setState({
      showModal: true
    });
  };

  render() {
    return (
      <div class="head">
        <div class="head-container">
          <div class="head-tagline">
            <h1>Mayash</h1>
            <h4>Transforming Education.</h4>
            <Button
              bsSize="large"
              bsStyle="primary"
              onClick={(e) => {
                e.preventDefault();
                this.open();
              }}
            >
              Sign In
            </Button>
          </div>
        </div>
        <Modal
          show={this.state.showModal}
        >
          <Modal.Body>
            <div
              style={{
                position : 'absolute',
                top      : '10%',
                right    : '6%'
              }}
              onClick={this.close.bind(this)}
            >
              <i class="fa fa-times" aria-hidden="true"/>
            </div>
            <div style={{padding: '3%'}}>
              {/*<SignIn*/}
                {/*signIn={this.props.signIn}*/}
                {/*user={this.props.user}*/}
              {/*/>*/}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const Introduction = () => (
  <div class="introduction">
    <div class="introduction-header">
      <h2>Introduction</h2>
    </div>
    <div class="introduction-body">
      <Row>
        <Col
          xs={12}
          sm={6}
          md={6}
          lg={6}
        >
          <Image src="https://s3-ap-southeast-1.amazonaws.com/mayash/web-contents/banner-2.jpg" responsive/>
        </Col>
        <Col
          xs={12}
          sm={6}
          md={6}
          lg={6}
        >
          <p>
            <strong>Mayash</strong> is a team of IITians committed to solve the challenges of the
            society. As there are so many challenges are out there, quality education is one of the core
            problem.
          </p>
          <p>Our First services to solve education are as follows:</p>
          <ul>
            <li>Providing it for free or as cheap as possible.</li>
            <li>Courses will be available for all the fields of education.</li>
            <li>Courses will be language independent, this will provide freedom for both teacher
              and student by removing the barrier of language.</li>
            <li>Courses will be available for all age groups.</li>
            <li>Knowledgeable people can contribute here.</li>
            <li>Quality education will be made available to every corner of the country.</li>
          </ul>
        </Col>
      </Row>
    </div>
  </div>
);

const Motivation = () => (
  <div class="motivation">
    <div class="motivation-header">
      <h2>Mayash Motivation</h2>
    </div>
    <div class="motivation-body">
      <Row>
        <Col
          xs={12}
          sm={6}
          md={6}
          lg={6}
        >
          <Image
            src="https://s3-ap-southeast-1.amazonaws.com/mayash/web-contents/banner-3.png"
            responsive
            style={{width:"100%"}}
          />
        </Col>
        <Col
          xs={12}
          sm={6}
          md={6}
          lg={6}
        >
          <p>
            <strong>Bharath</strong> as 'The land of knowledge' has known for centuries but in last few
            centuries we have gone through lot of suffering and changes which has pulled us backward.
          </p>
          <p>
            But it doesn't mean that we are not capable of achieving the greatness. We still have that
            strength and capability for leading world in the successful and peaceful direction and this is only
            possible when every people in this country is empowered with all the skills needed.
          </p>
        </Col>
      </Row>
    </div>
    <div class="aim-footer">

    </div>
  </div>
);

const AboutUs = () => (
  <div class="about-us">
    <div class="about-us-header">
      <h2>About Us</h2>
    </div>
    <div class="about-us-body">
      <Row>
        <Col
          xs={12}
          sm={6}
          md={6}
          lg={6}
        >
          <Image src="https://s3-ap-southeast-1.amazonaws.com/mayash/web-contents/mayash.svg" responsive/>
        </Col>
        <Col
          xs={12}
          sm={6}
          md={6}
          lg={6}
        >
          <p>
            <strong>IITs</strong> are considered as most reputed educational institute in <strong>India</strong> and
            all around the globe. Mayash is a platform for bringing all the knowledgeable brain in one platform
            where people can share what they have learned and learn what ever they want to learn.
          </p>
          <p><strong>Mayash</strong> is a team of experts developing and providing world class learning
            resources at your door step free of cost.</p>
        </Col>
      </Row>
    </div>
    <div class="about-us-footer">

    </div>
  </div>
);

const ProductAndServices = ({list}) => (
  <div class="product-services">
    <div class="product-services-header">
      <h2>Product & Services</h2>
    </div>
    <div class="product-services-body">
      <Row>
        {list.map((item, index) => {
          return (
            <Col xs={6} sm={3} md={3} lg={3} key={index + 1}>
              <span><i class={item.icon} aria-hidden="true"/></span>
              <h4>{item.heading}</h4>
              <p>{item.body}</p>
            </Col>
          );
        })}
      </Row>
    </div>
    <div class="product-services-footer"></div>
  </div>
);

class Partners extends Component {
  constructor () {
    super();
  }

  render() {

    return (
      <div class="partners">
        <div class="partners-container">
          <div class="partners-header">
            <h1>Mayash</h1>
            <h4>Transforming Education.</h4>
          </div>
          <div class="partners-body">

          </div>
          <div class="partners-footer">

          </div>
        </div>
      </div>
    );
  }
}

const Team = ({members}) => (
  <div class="team">
    <div class="team-header">
      <h2>Team</h2>
    </div>
    <div class="team-body">
      <Row class="show-grid">
        {members.map((member, index) => {
          if(member.type === "clearfix") {
            return (
              <Clearfix visibleXsBlock key={index}/>
            );
          }
          else {
            return (
              <Col
                xs={6}
                sm={3}
                md={3}
                lg={3}
                key={index}
              >
                <Panel>
                  <Image src={member.profilePicUrl} responsive circle style={{width: '100%', height: '100%'}}/>
                  <h4>{member.name}</h4>
                  <div>{member.post}</div>
                </Panel>
              </Col>
            );
          }
        })}
      </Row>
    </div>
    <div class="team-footer">

    </div>
  </div>
);

class Foot extends Component {
  constructor () {
    super();
  }

  render() {

    return (
      <div class="foot">
        <div class="foot-container">
          <div class="foot-header">

          </div>
          <div class="foot-body">

          </div>
          <div class="foot-footer">

          </div>
        </div>
      </div>
    );
  }
}


class LandingPage extends Component {
  constructor (props) {
    super(props);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user.isSignedIn) {
      location.reload();
    }
  }

  render() {
    //List of Product and Services.
    let list = [
      {
        icon   : "fa fa-graduation-cap",
        heading: "Gain Knowledge",
        body   : "Mayash contains all the fields of education, you are free to choose your " +
        "subjects of your interest."
      },
      {
        icon   : "fa fa-book",
        heading: "Best Study Material",
        body   : "Mayash contains best study materials from top universities and professors."
      },
      {
        icon   : "fa fa-users",
        heading: "Connect with experts",
        body   : "Mayash is making a platform of experts and professionals where you can " +
        "easily connect with them."
      },
      {
        icon   : "fa fa-question-circle",
        heading: "Clear your Doubts",
        body   : "Mayash's team of experts from top collages are hear to clear your doubts"
      }
    ];

    //List of team members.
    let members = [
      {
        name: 'Himank Barve',
        post: 'Founder & CEO',
        profilePicUrl: 'https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-9/11218932_964370493606541_2838091133337545054_n.jpg?oh=9f7e055307d65c5c7adbbaa3b230c4f4&oe=58754634'
      },
      {
        name: 'Gourav Goyal',
        post: 'Mentor',
        profilePicUrl: 'https://scontent.fdel1-1.fna.fbcdn.net/v/t1.0-9/1908161_10204280787432450_684942185007451458_n.jpg?oh=4874fdd277e819b1dff1e7fab705a09e&oe=5875EE38'
      },
      {
        type: "clearfix"
      },
      {
        name: 'Shreya Sinha',
        post: 'Manager',
        profilePicUrl: 'https://s3-ap-southeast-1.amazonaws.com/mayash/web-contents/team-shreya.jpg'
      },
      {
        name: 'Avinash Yadav',
        post: 'Mentor',
        profilePicUrl: 'https://scontent.fdel1-1.fna.fbcdn.net/v/t1.0-9/13423882_10209658537125159_48122255777249865_n.jpg?oh=ea061403c472eb1817a1e67938cd62df&oe=587C6C11'
      }
    ];

    return (
      <section class="landing-page">

        <Head {...this.props}/>

        <hr/>
        <Introduction/>

        <hr/>
        <Motivation/>

        <hr/>
        <AboutUs/>

        <hr/>
        <ProductAndServices list={list}/>

        {/*<hr/>*/}
        {/*<Partners/>*/}

        <hr/>
        <Team members={members}/>

        <hr/>
        <Foot/>

      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {signIn: actions.signIn},
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);