import EventsList from "../components/EventsList";
import { useLoaderData } from "react-router-dom";

function EventsPage() {
  const myEvents = useLoaderData(); // grabs data returned by loader in App.js
  return (
    <>{<EventsList events={myEvents} />}</>
  );
}

export default EventsPage;
