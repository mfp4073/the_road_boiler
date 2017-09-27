import React, {PropTypes} from 'react';
import EventListRow from './EventListRow';

const EventList = ({events}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Length</th>
        </tr>
      </thead>
      <tbody>
      {events.map(event =>
        <EventListRow key={event.id} event={event}/>
      )}
      </tbody>
    </table>
  );
};

EventList.propTypes = {
  events: PropTypes.array.isRequired
};

export default EventList;
