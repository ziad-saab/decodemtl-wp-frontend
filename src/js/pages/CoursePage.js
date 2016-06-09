import React from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import Helmet from 'react-helmet';

import {load as loadCourse} from '../redux/modules/courses';
import NotFound from '../components/NotFound';

class CoursePage extends React.Component {
  static propTypes = {
    course: React.PropTypes.object
  };

  render() {
    let {course} = this.props;

    if (!course || !course.data || course.error === 404) {
      return <NotFound/>;
    }

    course = course.data;

    return (
      <div>
        <Helmet
          title={course.title.rendered}
        />
        <h2>{course.title.rendered}</h2>
        <pre>
          {JSON.stringify(course, null, 4)}
        </pre>
      </div>
    );
  }
}

export default asyncConnect([
  {
    promise: ({store: {dispatch}, params: {slug}}) => dispatch(loadCourse(slug)),
    deferred: true
  }
])(
  connect(({courses}, {params: {slug}}) => ({course: courses[slug]}))(CoursePage)
);
