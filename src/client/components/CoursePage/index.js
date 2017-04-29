
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

import HeaderRow from '../Header/HeaderRow';
import ErrorPage from '../ErrorPage';

import Introduction from './Introduction';
import Syllabus from './Syllabus';
import Modules from './Modules';
import Discussions from './Discussions';
import TestYourself from './TestYourself';
import Feedback from './Feedback';

class CoursePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { courseId } = this.props.routeParams;
    const course = this.props.courses.find(a => a.courseId === parseInt(courseId, 10));

    if (!course || course.statusCode !== 200) {
      return (<ErrorPage {...course} />);
    }

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-drawer-button">
        <header className="mdl-layout__header">
          <HeaderRow/>

          <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
            <a href="#scroll-tab-1" className="mdl-layout__tab is-active">Introduction</a>
            <a href="#scroll-tab-2" className="mdl-layout__tab">Syllabus</a>
            <a href="#scroll-tab-3" className="mdl-layout__tab">Modules</a>
            <a href="#scroll-tab-4" className="mdl-layout__tab">Discussion</a>
            <a href="#scroll-tab-5" className="mdl-layout__tab">Test Yourself</a>
            <a href="#scroll-tab-6" className="mdl-layout__tab">feedback</a>
          </div>
        </header>
        <main className="mdl-layout__content">
          <section className="mdl-layout__tab-panel is-active" id="scroll-tab-1">
            <div className="page-content">
              <Introduction course={course} {...this.props} />
            </div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-2">
            <div className="page-content">
              <Syllabus course={course} {...this.props} />
            </div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-3">
            <div className="page-content">
              <Modules course={course} {...this.props} />
            </div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-4">
            <div className="page-content">
              <Discussions {...this.props} />
            </div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-5">
            <div className="page-content">
              <TestYourself course={course} {...this.props} />
            </div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-6">
            <div className="page-content">
              <Feedback course={course} {...this.props} />
            </div>
          </section>
        </main>
      </div>
    );
  }
}

CoursePage.propTypes = {
  routeParams: PropTypes.shape({
    courseId: PropTypes.string.isRequired,
  }).isRequired,
  elements: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
