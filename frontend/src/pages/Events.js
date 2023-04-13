import EventsList from "../components/EventsList";
import { useLoaderData } from "react-router-dom";

function EventsPage() {
  const myEvents = useLoaderData(); // grabs data returned by loader in App.js
  return <>{<EventsList events={myEvents} />}</>;
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
  } else {
    const resData = await response.json();
    return resData.events; // whatever returned in loader will be made available for that page and any other components where you need it
  }
}
