import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout, { getTheme } from "./Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard, { dashboardAction } from "./pages/Dashboard";
import AddTask, { addTaskAction } from "./pages/AddTask";
import EditTask, { editTaskAction, editTaskLoader } from "./pages/EditTask";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      loader={getTheme}
      errorElement={<ErrorPage />}
    >
      <Route index element={<Dashboard />} action={dashboardAction} />
      <Route path="add" element={<AddTask />} action={addTaskAction} />
      <Route
        path="edit/:taskId"
        element={<EditTask />}
        loader={editTaskLoader}
        action={editTaskAction}
      />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
