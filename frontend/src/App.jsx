import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "./context/Modal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/Navigation";
import LandingPage from "./components/LandingPage/LandingPage";
import GroupsPage from "./components/Groups/GroupsPage";
import GroupDetailsPage from "./components/Groups/GroupDetailsPage";
import GroupDetails from "./components/Groups/GroupDetails";
import EventsPage from "./components/Events/EventsPage";
import EventDetailsPage from "./components/Events/EventDetailsPage";
import GroupFormPage from "./components/Groups/GroupFormPage";
import GroupUpdatePage from "./components/Groups/GroupUpdatePage";
import EventFormPage from "./components/Events/EventFormPage";

const Layout = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Modal />
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/groups",
        element: <GroupsPage />,
      },
      {
        path: `/groups/:groupId`,
        element: <GroupDetails/>,
      },
      {
        path: `/groups/:groupId/edit`,
        element: <GroupUpdatePage />,
      },
      {
        path: `/groups/new`,
        element: <GroupFormPage />,
      },
      {
        path: `/events`,
        element: <EventsPage />,
      },
      {
        path: `/events/:eventId`,
        element: <EventDetailsPage />,
      },
      {
        path: `/:groupId/events/new`,
        element: <EventFormPage />,
      },
      {
        path: `/:groupId/events/new`,
        element: <EventFormPage />,
      },
      {
        path: `/groups/details/:groupId`,
        element: <GroupDetails />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
