import React from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-connect';
import Helmet from 'react-helmet';

import {load as loadPage} from '../redux/modules/pages';
import NotFound from '../components/NotFound';

class SinglePage extends React.Component {
  static propTypes = {
    pages: React.PropTypes.object
  };

  render() {
    let page = this.props.pages[this.props.params.slug];

    if (!page || !page.data || page.error === 404) {
      return <NotFound/>;
    }

    page = page.data;

    return (
      <div>
        <Helmet
          title={page.title.rendered}
        />
        <h2>{page.title.rendered}</h2>
        <pre>
          {JSON.stringify(page, null, 4)}
        </pre>
      </div>
    );
  }
}

export default asyncConnect([
  {
    promise: ({store: {dispatch}, params: {slug}}) => dispatch(loadPage(slug)),
    deferred: true
  }
])(
  connect(({pages}) => ({pages}))(SinglePage)
);
