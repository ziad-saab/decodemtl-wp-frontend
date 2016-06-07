import React from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import {Link} from 'react-router';
import Helmet from 'react-helmet';
import {injectIntl, intlShape} from 'react-intl';

import {load as loadStudents} from '../redux/modules/students';

/*
  This component uses asyncConnect to load data before displaying itself
  For the moment, this is dummy student data from the WordPress API

  The students prop is not coming from asyncConnect, but from the redux state "students"
  asyncConnect is mainly used to delay rendering the page until data has been fetched
*/
class Home extends React.Component {
  static propTypes = {
    students: React.PropTypes.object,
    intl: intlShape.isRequired
  };
  static defaultProps = {
    students: []
  };

  render() {
    const {intl} = this.props;
    return (
      <div>
        <Helmet title={intl.formatMessage({id: 'homePage.title', defaultMessage: 'Home!'})}/>
        <h1>Home</h1>
        <ul>
          {this.props.students.loaded &&
            this.props.students.data.map(student => (
              <li key={student.id}>
                {student.acf.first_name || 'Anonymous'}
                <pre>{JSON.stringify(student, null, 4)}</pre>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default asyncConnect([
  {
    /*
      Here, the promise we return to asyncConnect is the result of a dispatch of a thunk (see redux/modules/students.js).
      Since the dispatched thunk returns a Promise, it becomes the result of the dispatch call after going through the middleware.
    */

    promise: ({store: {dispatch}}) => dispatch(loadStudents()),
    deferred: true
  }
])(
  /*
    The loadStudents action will end up dropping student data under the students reducer.
    This is different from the recommended way to load data with redux-connect: in their
    documentation, they mention that the fulfillment value of the returned promise becomes
    available in the Redux state under state.reduxAsyncConnect.students. By omitting the "key"
    property in the parameters to asyncConnect, we avoid storing the information in two places.

    The reason for this deviation from the documentation is to better be able to control the
    data loading in Redux. The logic in the dispatched thunks checks if the data has already been
    loaded and avoids fetching the same data twice.
  */
  connect(state => ({students: state.students}) )(
    injectIntl(Home)
  )
);
