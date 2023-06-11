import { FC, Suspense } from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import routes from "./routes";

const Router: FC<RouteObject> = () => {
  const buildRoutes = useRoutes(routes);

  return <Suspense fallback={<div>Loading...</div>}>{buildRoutes}</Suspense>;
};

export default Router;
