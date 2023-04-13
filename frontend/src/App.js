// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import EventsPage from "./pages/Events";
import EventDetailPage from "./pages/EventDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import RouteLayout from "./pages/Root";
import EventsRootLayout from "./pages/EventsRoot";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <RouteLayout></RouteLayout>,
    children: [
      { index: true, element: <HomePage></HomePage> },
      {
        path: "events",
        element: <EventsRootLayout></EventsRootLayout>,
        children: [
          {
            index: true,
            element: <EventsPage></EventsPage>,
            loader: async () => {
              // loader function is triggered and executed just before the jsx code runs
              const response = await fetch("http://localhost:8080/events");

              if (!response.ok) {
              } else {
                const resData = await response.json();
                return resData.events; // whatever returned in loader will be made available for that page and any other components where you need it
              }
            },
          },
          {
            path: ":eventId",
            element: <EventDetailPage></EventDetailPage>,
          },
          { path: "new", element: <NewEventPage></NewEventPage> },
          {
            path: ":eventId/edit",
            element: <EditEventPage></EditEventPage>,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={myRouter}></RouterProvider>;
}

export default App;
