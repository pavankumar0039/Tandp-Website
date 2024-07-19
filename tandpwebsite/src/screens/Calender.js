import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CLIENT_ID = '190883205690-n615h55tok5s5gdcm9lb56namuj3mm3c.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDULWNiRV-b1JLMGv02Q1NUiHpw4DtDk98';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

function Calendar() {
  const [eventDetails, setEventDetails] = useState({
    summary: '',
    location: '',
    description: '',
    start: '',
    end: '',
  });

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      }).catch(error => {
        console.error("Error during gapi.client.init: ", error);
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      listUpcomingEvents();
    } else {
      handleAuthClick();
    }
  };

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn({
      ux_mode: 'popup',
    });
  };

  const listUpcomingEvents = () => {
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(response => {
      const events = response.result.items;
      if (events.length > 0) {
        console.log('Upcoming events:');
        events.forEach((event) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log('No upcoming events found.');
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value
    });
  };

  const handleDateChange = (date, name) => {
    setEventDetails({
      ...eventDetails,
      [name]: date
    });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();

    const startDateTime = new Date(eventDetails.start).toISOString();
    const endDateTime = new Date(eventDetails.end).toISOString();

    const event = {
      'summary': eventDetails.summary,
      'location': eventDetails.location,
      'description': eventDetails.description,
      'start': {
        'dateTime': startDateTime,
        'timeZone': 'America/Los_Angeles'
      },
      'end': {
        'dateTime': endDateTime,
        'timeZone': 'America/Los_Angeles'
      },
    };

    gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    }).then(response => {
      console.log('Event created: ', response);
      alert('Event created!');
    }).catch(error => {
      console.error('Error creating event: ', error);
      alert('Error creating event');
    });
  };

  return (
    <div className='main1'>
      <h2>Google Calendar</h2>
      <button onClick={handleAuthClick}>Sign in with Google</button>

      <table>
        <thead>
          <tr>
            <th>Summary</th>
            <th>Location</th>
            <th>Description</th>
            <th>Start</th>
            <th>End</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                name="summary"
                placeholder="Event Summary"
                value={eventDetails.summary}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="location"
                placeholder="Event Location"
                value={eventDetails.location}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="description"
                placeholder="Event Description"
                value={eventDetails.description}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <DatePicker
                selected={eventDetails.start}
                onChange={(date) => handleDateChange(date, 'start')}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Start Date"
              />
            </td>
            <td>
              <DatePicker
                selected={eventDetails.end}
                onChange={(date) => handleDateChange(date, 'end')}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="End Date"
              />
            </td>
            <td>
              <button onClick={handleAddEvent}>Add Event</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
      <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FKolkata&bgcolor=%23ffffff&src=dGh1bWF0aXBhdmFuY2hvd2RhcnlAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb205YWYyODdkMkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4tZ2IuaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb20xZjQ2OWExZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y2xhc3Nyb29tMTE2OTA5NjAwMTMzMzQwMDcwMTQ0QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%2333B679&color=%230047a8&color=%230B8043&color=%23137333&color=%23c26401" style={{border:'solid 1px #777',width:"100%",height:"50rem",frameborder:"0",scrolling:'no'}}></iframe>
      </div>
    </div>
  );
}

export default Calendar;
