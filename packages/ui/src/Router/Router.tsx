import { Route, Routes } from "react-router-dom";

import { authRoutes } from "./routes";

type RouteProp = {
  path: string;
  component: React.ReactNode;
};

type AppRouterProp = {
  moduleRoutes: RouteProp[];
  AuthGuard: React.ReactNode;
  UserGuard: React.ReactNode;
};

const AppRouter = ({ moduleRoutes, AuthGuard, UserGuard }: AppRouterProp) => {
  return (
    <Routes>
      <Route element={AuthGuard}>
        {moduleRoutes.map((route) => {
          return (
            <Route
              key={route?.path}
              path={route?.path}
              element={route?.component}
            />
          );
        })}
      </Route>
      <Route element={UserGuard}>
        {authRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRouter;
