
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation';
import LandingPage from './components/LandingPage/LandingPage'
import GroupsPage from './components/Groups/GroupsPage';
import GroupDetailsPage from './components/Groups/GroupDetailsPage';
import EventsPage from './components/Events/EventsPage'
import EventDetailsPage from './components/Events/EventDetailsPage'
import GroupFormPage from './components/Groups/GroupFormPage';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage/>
      },
      {
        path: '/groups',
        element: <GroupsPage/>
      },
      {
        path: `/groups/:groupId`,
        element: <GroupDetailsPage/>
      },
      {
        path: `/groups/new`,
        element: <GroupFormPage/>
      },
      {
        path: `/events`,
        element: <EventsPage/>
      },
      {
        path: `/events/:eventId`,
        element: <EventDetailsPage/>
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;