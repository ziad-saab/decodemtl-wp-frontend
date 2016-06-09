import React from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import Helmet from 'react-helmet';

import {load as loadPosts} from '../redux/modules/blog';

class Blog extends React.Component {
  static propTypes = {
    posts: React.PropTypes.object
  };

  render() {
    return (
      <div>
        <Helmet
          title="Blog!"
        />
        <h2>Blog!</h2>
        <pre>
          {JSON.stringify(this.props.posts, null, 4)}
        </pre>
      </div>
    );
  }
}

export default asyncConnect([
  {
    promise: ({store: {dispatch}}) => dispatch(loadPosts()),
    deferred: true
  }
])(
  connect( ({blog}) => ({posts: blog}) )(Blog)
);
