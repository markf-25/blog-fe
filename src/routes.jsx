import App from "./App.jsx";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import LoginForm from "./components/LoginForm/LoginForm";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";

export const routes = [
  {
    path: "/",
    element: <App />,
    /* errorElement: <ErrorPage/>, */
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <LoginForm />,
          },
          {
            path: "register",
            element: <RegistrationForm />,
          },
        ],
      },
    ],
  },
];