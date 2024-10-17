import React, { lazy, Suspense } from "react";
import ProfileData from "@/pages/ProfileDataPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProvider } from "./context";
import Loader from "@/components/Loader";
import HomeLayout from "@/pages/Layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const Loadable =
  <P extends object>(Component: React.ComponentType<P>) =>
  (props: P) => {
    return (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    );
  };

const DemoPage = Loadable(lazy(() => import("@/pages/demo")));
const CreateUserPage = Loadable(lazy(() => import("@/pages/CreateUserPage")));

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateUserPage />,
  },
  {
    path: "/profile-data",
    element: (
      <HomeLayout>
        <ProfileData />
      </HomeLayout>
    ),
  },
  {
    path: "/demo",
    element: (
      <HomeLayout>
        <DemoPage />
      </HomeLayout>
    ),
  },
  {
    path: "*",
    element: "404 page not found",
  },
]);
function App() {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppProvider>
  );
}

export default App;
