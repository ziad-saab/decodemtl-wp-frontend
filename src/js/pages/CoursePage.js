import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import Helmet from 'react-helmet';
import url from 'url';

import {load as loadCourse} from '../redux/modules/courses';
import {setLinks} from '../redux/modules/i18n';
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
          title={course.title}
        />
        <h2>{course.title}</h2>
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
  connect(
    ({courses}, {params: {slug}}) => ({course: courses[slug]})
  )(CoursePage)
);
