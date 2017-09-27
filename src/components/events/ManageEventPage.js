import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventActions from '../../actions/eventActions';
import EventForm from './EventForm';
import toastr from 'toastr';

export class ManageEventPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      event: Object.assign({}, props.event),
      errors: {},
      saving: false
    };

    this.updateEventState = this.updateEventState.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.event.id != nextProps.event.id) {
      // Necessary to populate form when existiing event is loaded directly.
      this.setState({ event: Object.assign({}, nextProps.event)});
    }
  }

  updateEventState(e) {
    const field = e.target.name;
    let event = Object.assign({}, this.state.event);
    event[field] = e.target.value;
    return this.setState({event: event});
  }

  saveEvent(e) {
    e.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveEvent(this.state.event)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Event Saved');
    this.context.router.push('/events');
  }

  render() {
    return (
      <EventForm
        allAuthors={this.props.authors}
        onChange={this.updateEventState}
        onSave={this.saveEvent}
        event={this.state.event}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageEventPage.propTypes = {
  event: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageEventPage.contextTypes = {
  router: PropTypes.object
};

function getEventById(events, id) {
  const event = events.filter(event => event.id == id);
  if (event) return event[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const eventId = ownProps.params.id; // from the path  '/course/:id'

  let event = {id: '', watchHref: '', title: '', authorID: '', length: '', category: ''};

  if (eventId && state.events.length > 0) {
    event = getEventById(state.events, eventId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    event: event,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageEventPage);
