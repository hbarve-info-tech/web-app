
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

import ErrorPage from '../ErrorPage';


class CoursePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { courseId } = this.props.routeParams;
    const user = this.props.elements[0];
    const course = this.props.courses.find(a => a.courseId === parseInt(courseId, 10));

    if (course.statusCode !== 200) {
      return (<ErrorPage {...course} />);
    }

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
              <li
                className="mdl-menu__item"
              >
                Sign Out
              </li>
            </ul>
          </div>

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
            <div className="page-content">Tab 1</div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-2">
            <div className="page-content">Tab 2</div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-3">
            <div className="page-content">Tab 3</div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-4">
            <div className="page-content">Tab 3</div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-5">
            <div className="page-content">Tab 3</div>
          </section>
          <section className="mdl-layout__tab-panel" id="scroll-tab-6">
            <div className="page-content">Tab 3</div>
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
  // updateCourse: PropTypes.func.isRequired,
  getCourse: PropTypes.func.isRequired,
  // fetchModules: PropTypes.func.isRequired,
  // updateModule: PropTypes.func.isRequired,
  // createModule: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
