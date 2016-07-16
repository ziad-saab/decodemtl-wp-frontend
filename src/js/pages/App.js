import React from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';

import config from '../config';
import Loading from '../components/Loading';
import LanguageSwitcher from '../components/LanguageSwitcher';

/*
  This component wraps the app in a react-intl provider
  It also reacts to changes in the current language and reconfigures the IntlProvider appropriately
  Finally, it displays the Loading bar, the base Helmet config for <head> and the router children
*/
class App extends React.Component {
  static propTypes = {
    i18n: React.PropTypes.object
  };

  render() {
    const {i18n} = this.props;
    return (
      <IntlProvider locale={i18n.language} messages={i18n.messages}>
        <main>
          <Loading/>
          <Helmet {...config.app.head[i18n.language]}/>
          <LanguageSwitcher/>
          {this.props.children}
        </main>
      </IntlProvider>
    );
  }
}

export default connect( ({i18n}) => ({i18n}) )(App);
