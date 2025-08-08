import App from "./App.jsx";
import MainLayout from "./components/MainLayout/MainLayout"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import ResetPasswordPage from "./components/UserComponents/ResetPasswordPage/ResetPasswordPage"
import PostDetails from "./components/Content/PostDetails/PostDetails"

import ContentPage from "./components/Content/ContentPage/ContentPage"
import UserProfilePage from "./components/UserComponents/UserProfilePage/UserProfilePage.jsx"

export const routes = [
  {
    path: "/",
    element: <App />,
    /* errorElement: <ErrorPage/>, */
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <ContentPage />,
            path: "/",
          },
          {
            element: <ResetPasswordPage />,
            path: "reset-password/",
          },
          {
            element: <PostDetails />,
            path: "posts/:id",
          },
          {
        element: <ProtectedRoute />,
        children: [
          {
            element: <UserProfilePage/>,
            path: "user/",
          }
        ]
      }
        ],
      },
    ]
  }
];
