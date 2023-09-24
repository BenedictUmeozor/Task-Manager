import { toast } from "react-toastify";
import IntroForm from "../components/IntroForm";
import {
  useStateContext,
  useStateDispatchContext,
} from "../contexts/StateContext";
import TaskBody from "../components/TaskBody";

let dispatch;

export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { username } = Object.fromEntries(data);
  dispatch({
    type: "add_username",
    username: username,
  });
  return toast.success("Welcome " + username);
}

export default function Dashboard() {
  const { username } = useStateContext();
  dispatch = useStateDispatchContext();

  return <div className="h-full">{username ? <TaskBody /> : <IntroForm />}</div>;
}
