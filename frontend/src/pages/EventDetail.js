import { json, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailPage() {
  const data = useRouteLoaderData('event-detail');

  return (
  <EventItem event={data.event}></EventItem>
  );
}

export default EventDetailPage;

export async function loader({ request, params }) {
  // loader naturally has access to an object with these two pieces of info
  const id = params.eventId; // eventId refers the eventId param that exists as a possible event path in App.js
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      { status: 500 }
    )
  } else {
    return response;
  }
}
