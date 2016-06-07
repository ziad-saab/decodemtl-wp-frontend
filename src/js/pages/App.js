import React from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';

import config from '../config';
import Loading from '../components/Loading';

/*
  This component wraps the app in a react-intl provider
  It also reacts to changes in the current language and reconfigures the IntlProvider appropriately
  Finally, it displays the Loading bar, the base Helmet config for <head> and the router children
*/
class App extends React.Component {
  render() {
    const {intl} = this.props;
    return (
      <IntlProvider locale={intl.language} messages={intl.messages}>
        <main>
          <Loading/>
          <Helmet {...config.app.head[intl.language]}/>
          {this.props.children}
        </main>
      </IntlProvider>
    );
  }
}

export default connect( ({intl}) => ({intl}) )(App);
