import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

/*
  This component displays the word Loading... whenever a page's data is being loaded through reduxAsyncConnect
*/
class Loading extends React.Component {
  state = {
    show: false
  };

  componentWillReceiveProps(nextProps) {
    // Show loading only ~1s after actual loading starts
    if (nextProps.show && !this.props.show) {
      this.timer = setTimeout(() => this.setState({show: true}), 750);
    }
    else if (!nextProps.show && this.props.show) {
      this.timer && clearTimeout(this.timer);
      this.setState({
        show: false
      });
    }
  }

  render() {
    const {show} = this.state;

    return (
      <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={150} transitionLeaveTimeout={150}>
        {show &&
          <div key="loading-box" className="loading-box">
            <FormattedMessage
              id="loadingBox.text"
              defaultMessage="Loading..."
            />
          </div>
        }
      </ReactCSSTransitionGroup>
    )
  }
}

export default connect(
  state => ({show: state.reduxAsyncConnect && state.reduxAsyncConnect.loaded === false})
)(Loading);
