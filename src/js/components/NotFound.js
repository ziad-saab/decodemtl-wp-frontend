import React from 'react';
import {FormattedMessage} from 'react-intl';

export default class NotFound extends React.Component {
  render() {
    return (
      <div>
        <h1><FormattedMessage id="notFoundPage.title" defaultMessage="404 Not Found"/></h1>
      </div>
    )
  }
}
