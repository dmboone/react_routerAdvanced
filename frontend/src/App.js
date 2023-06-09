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
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction
} from "./pages/EventDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import RouteLayout from "./pages/Root";
import EventsRootLayout from "./pages/EventsRoot";
import ErrorPage from "./pages/Error";
import {action as manipulateEventAction} from './components/EventForm';
import NewsletterPage from "./pages/Newsletter";
import {action as newsletterAction } from './pages/Newsletter';

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <RouteLayout></RouteLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { index: true, element: <HomePage></HomePage> },
      {
        path: "events",
        element: <EventsRootLayout></EventsRootLayout>,
        children: [
          {
            index: true,
            element: <EventsPage></EventsPage>,
            loader: eventsLoader, // loader function is triggered and executed just before the jsx code runs
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage></EventDetailPage>,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage></EditEventPage>,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage></NewEventPage>,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage></NewsletterPage>,
        action: newsletterAction
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={myRouter}></RouterProvider>;
}

export default App;
