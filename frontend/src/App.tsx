import React, { Fragment, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { publicRoutes } from "./routes";
import { routes } from "./config/routes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { getProfile } from "./redux/callApi";
import SnackbarCustom from "./components/Snackbar";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { access_token } = useSelector((state: RootState) => state.user);
  console.log(access_token);

  useEffect(() => {
    if (access_token) {
      dispatch(getProfile());
    }
  }, [access_token, dispatch]);

  return (
    <>
      <SnackbarCustom />
      <Router>
        <Routes>
          <Route
            path={routes.login}
            element={access_token ? <Navigate to={routes.home} /> : <Login />}
          />
          <Route
            path={routes.register}
            element={
              access_token ? <Navigate to={routes.home} /> : <Register />
            }
          />
          {publicRoutes.map((route, index) => {
            let Layout: any = MainLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  access_token ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <Navigate to={route.navigate} />
                  )
                }
              />
            );
          })}
        </Routes>
      </Router>
    </>
  );
};

export default App;
