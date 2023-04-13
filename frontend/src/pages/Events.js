import EventsList from "../components/EventsList";
import { useLoaderData, json } from "react-router-dom";

function EventsPage() {
  const data = useLoaderData(); // grabs data returned by loader in App.js
  const myEvents = data.events;

  return <>{<EventsList events={myEvents} />}</>;
}

export default EventsPage;

export async function loader() {
  // could access local storage here, cookies, etc.; cannot use hooks in here though because this is just regular javascript, not react
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });
    // this will reach the errorElement attribute established in our myRouter var in App.js
    throw json({ message: "Could not fetch events." }, { status: 500 }); // easiest to write like this, and you won't have to parse it in your Error.js
  } else {
    return response; // whatever returned in loader will be made available for that page and any other components where you need it
  }
}
