import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

/*
  This component displays an EN/FR language switcher.
*/
class LanguageSwitcher extends React.Component {
  render() {

    const {i18n} = this.props;
    const currentLanguage = i18n.language;
    const enLink = <Link to={i18n.enLink}>EN</Link>;
    const frLink = <Link to={i18n.frLink}>FR</Link>;

    return (
      <div className="language-switcher">
        <ul className="language-switcher__list">
          <li className={currentLanguage === 'en' ? 'language-switcher__current' : null}>
            {enLink}
          </li>
          <li className={currentLanguage === 'fr' ? 'language-switcher__current' : null}>
            {frLink}
          </li>
        </ul>
      </div>
    )
  }
}

export default connect(
  ({i18n}) => ({i18n})
)(LanguageSwitcher);
