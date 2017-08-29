import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, Button } from 'semantic-ui-react';
import * as composeActions from '../../../actions/compose';

class MailPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="mail-preview">
        {
          this.props.mail.isFetching &&
          <div>
            <h1>Loading</h1>
          </div>
        }
        {
          !this.props.mail.isFetching &&
          this.props.mail.thread &&
          <div className="thread-wrapper">
            <div className="thread-actions">
              <Button
                primary
                basic
                content="Reply"
                icon="reply"
                onClick={() => this.props.openCompose({ type: 'reply' })}
              />
              <Button
                primary
                basic
                content="Forward"
                icon="mail forward"
                onClick={() => this.props.openCompose({ type: 'forward' })}
              />
            </div>
            {this.props.mail.thread.map((mail, index) => (
              <Card fluid className="mail-wrapper" key={mail.toString()}>
                <Card.Content>
                  <Card.Header>
                    <div className="mail-actions">
                      {/* Should also send thread and mail ID for openCompose */}
                      <Button icon="reply" onClick={() => this.props.openCompose({ type: 'reply', indexInThread: index })} />
                      <Button icon="mail forward" onClick={() => this.props.openCompose({ type: 'forward', indexInThread: index })} />
                    </div>
                    Title: {mail.title}
                  </Card.Header>
                  <Card.Description>
                    <p>From: {mail.from}</p>
                    <p>
                      {JSON.stringify(mail)}
                    </p>
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </div>
        }
        {
          !this.props.mail.isFetching &&
          !this.props.mail.thread &&
          this.props.mail.error &&
          <div className="error-wrapper">
            <h1>Error fetching mail</h1>
            <h2>{ JSON.stringify(this.props.mail.error) }</h2>
          </div>
        }
        {
          !this.props.mail.isFetching &&
          !this.props.mail.thread &&
          !this.props.mail.error &&
          <div className="empty-wrapper">
            <h1>:D</h1>
          </div>
        }
      </div>
    );
  }
}

MailPreview.propTypes = {
  mail: PropTypes.shape({
    isFetching: PropTypes.bool,
    thread: PropTypes.array,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
  openCompose: PropTypes.func.isRequired,
};

MailPreview.defaultProps = {
  mail: {},
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators({
  ...composeActions,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MailPreview);