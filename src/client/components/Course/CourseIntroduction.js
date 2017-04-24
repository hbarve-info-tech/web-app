
import React from 'react';
import Component from 'react/lib/ReactComponent';
import PropTypes from 'react/lib/ReactPropTypes';

class CourseIntroduction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      description: props.description,
    };

    this.onClick = this.onClick.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.refs['courseName-dialog'].showModal();
  }
  onCancel(e) {
    e.preventDefault();
    this.refs['courseName-dialog'].close();
  }
  onSave(e) {
    e.preventDefault();
    const { courseName } = this.state;
    const { id, token, courseId } = this.props;
    const payload = { id, token, courseId, courseName };

    this.props.updateCourse(payload);

    this.refs['courseName-dialog'].close();
  }

  render() {
    return (
      <div>
        <p>{this.props.course.title}</p>
        <p>{this.props.course.description}</p>
      </div>
    );
  }
}

CourseIntroduction.propTypes = {
  id: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  course: PropTypes.object,
  updateCourse: PropTypes.func,
};

export default CourseIntroduction;
