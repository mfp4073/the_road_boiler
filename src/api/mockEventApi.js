import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const events = [
  {
    id: "react-flux-building-applications",
    title: "Building Applications in React and Flux",
    watchHref: "http://www.pluralsight.com/courses/react-flux-building-applications",
    authorId: "cory-house",
    length: "5:08",
    category: "JavaScript"
  },
  {
    id: "clean-code",
    title: "Clean Code: Writing Code for Humans",
    watchHref: "http://www.pluralsight.com/courses/writing-clean-code-humans",
    authorId: "cory-house",
    length: "3:10",
    category: "Software Practices"
  },
  {
    id: "architecture",
    title: "Architecting Applications for the Real World",
    watchHref: "http://www.pluralsight.com/courses/architecting-applications-dotnet",
    authorId: "cory-house",
    length: "2:52",
    category: "Software Architecture"
  },
  {
    id: "career-reboot-for-developer-mind",
    title: "Becoming an Outlier: Reprogramming the Developer Mind",
    watchHref: "http://www.pluralsight.com/courses/career-reboot-for-developer-mind",
    authorId: "cory-house",
    length: "2:30",
    category: "Career"
  },
  {
    id: "web-components-shadow-dom",
    title: "Web Component Fundamentals",
    watchHref: "http://www.pluralsight.com/courses/web-components-shadow-dom",
    authorId: "cory-house",
    length: "5:10",
    category: "HTML5"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (event) => {
  return replaceAll(event.title, ' ', '-');
};

class EventApi {
  static getAllEvents() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], events));
      }, delay);
    });
  }

  static saveEvent(event) {
    event = Object.assign({}, event); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minEventTitleLength = 1;
        if (event.title.length < minEventTitleLength) {
          reject(`Title must be at least ${minEventTitleLength} characters.`);
        }

        if (event.id) {
          const existingEventIndex = events.findIndex(a => a.id == event.id);
          events.splice(existingEventIndex, 1, event);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new events in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          event.id = generateId(event);
          event.watchHref = `http://www.pluralsight.com/events/${event.id}`;
          events.push(event);
        }

        resolve(event);
      }, delay);
    });
  }

  static deleteEvent(eventId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfEventToDelete = events.findIndex(event => {
          event.id == eventId;
        });
        events.splice(indexOfEventToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default EventApi;
