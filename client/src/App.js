import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./pages/ListPage";
import SinglePage from "./pages/SinglePage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./components/Login";
import Register from "./components/Register";
import NewPostPage from "./components/NewPostPage";
import ProfileUpdatePage from "./components/ProfileUpdatePage";
import { RequireAuth, Layout } from "./pages/Layout";
import Home from "./components/Home";
import { postLoader, profilePageLoader } from "./lib/loaders";
import FilteredPage from "./pages/FilteredPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: profilePageLoader,
        },
        {
          path: "/list",
          element: <ListPage />,
          // loader: profilePageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: postLoader,
        },
        {
          path: "/post/:id",
          element: <SinglePage />,
          loader: postLoader,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path:"/listPage",
          element:<ListPage/>
        },
        {
          path:"/filteredPage/:subgategory",
          element:<FilteredPage/>,
        }
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;