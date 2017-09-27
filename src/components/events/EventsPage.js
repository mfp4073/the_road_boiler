import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventActions from '../../actions/eventActions';
import EventList from './EventList';
import {browserHistory} from 'react-router';

class EventsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddEventPage = this.redirectToAddEventPage.bind(this);
  }

  eventRow(event, index) {
    return <div key={index}>{event.title}</div>;
  }

  redirectToAddEventPage() {
    console.log("clicked");
    browserHistory.push('/event');
  }

  render() {
    const {events} = this.props;
    return (
      <div>
        <h1>Events and Readings</h1>
        <input type="submit"
               value="Add Event"
               className="btn btn-primary"
               onClick={this.redirectToAddEventPage}
        />
        <EventList events={events}/>
      </div>
    );
  }
}

EventsPage.propTypes = {
  events: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// takes 2 params. returns properties we want exposed in our component above
// state.events refers to the name declared in the root reducer

function mapStateToProps(state, ownProps) {
  return {
    events: state.events
  };
}

// what actions you want to expose to fire off

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
