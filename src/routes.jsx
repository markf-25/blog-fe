import App from "./App.jsx";
import MainLayout from "./components/MainLayout/MainLayout"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import ResetPasswordPage from "./components/UserComponents/ResetPasswordPage/ResetPasswordPage"

import Counter from "./Counter";
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
            element: <Counter />,
            path: "/",
          },
          {
            element: <ResetPasswordPage />,
            path: "reset-password/",
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
