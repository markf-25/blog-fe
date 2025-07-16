import App from "./App.jsx";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import LoginForm from "./components/AuthComponents/LoginForm/LoginForm.jsx";
import RegistrationForm from "./components/AuthComponents/RegistrationForm/RegistrationForm";

import MainLayout from "./components/MainLayout/MainLayout"

import Counter from "./Counter";

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
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            element: <LoginForm />,
          },
          {
            path: "registration",
            element: <RegistrationForm />,
          },
        ],
      }
    ],
  },
];
