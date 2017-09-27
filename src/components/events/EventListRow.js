import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const EventListRow = ({event}) => {
  return (
    <tr>
      <td><a href={event.watchHref} targe="_blank">Watch</a></td>
      <td><Link to={'/event/' + event.id}>{event.title}</Link></td>
      <td>{event.authorID}</td>
      <td>{event.category}</td>
      <td>{event.length}</td>
    </tr>
  );
};

EventListRow.propTypes = {
  event: PropTypes.object.isRequired
};

export default EventListRow;
