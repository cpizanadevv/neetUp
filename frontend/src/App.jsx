
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation';
import LandingPage from './components/LandingPage/LandingPage'
import GroupsPage from './components/Groups/GroupsPage';
import GroupDetailsPage from './components/Groups/GroupDetailsPage';

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
        path: `/groups/${group.id}`,
        element: <GroupDetailsPage/>
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;