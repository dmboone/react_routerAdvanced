import {
  json,
  useRouteLoaderData,
  redirect,
  defer,
  Await,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  // could access local storage here, cookies, etc.; cannot use hooks in here though because this is just regular javascript, not react
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });
    // this will reach the errorElement attribute established in our myRouter var in App.js
    throw json({ message: "Could not fetch events." }, { status: 500 }); // easiest to write like this, and you won't have to parse it in your Error.js
  } else {
    const resData = await response.json();
    return resData.events; // whatever returned in loader will be made available for that page and any other components where you need it
  }
}

export async function loader({ request, params }) {
  // loader naturally has access to an object with these two pieces of info
  const id = params.eventId; // eventId refers the eventId param that exists as a possible event path in App.js

  return defer({
    event: await loadEvent(id), // the await is so that the page won't display at all until at least loadEvent has finished
    events: loadEvents(),
  });
}

export async function action({ params, request }) {
  // this action is for deletion
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Could not delete event." }, { status: 500 });
  }

  return redirect("/events"); // redirects back to event page after deletion
}
