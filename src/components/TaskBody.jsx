import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/StateContext";
import Category from "./Category";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import TaskList from "./TaskList";

export default function TaskBody() {
  const { username } = useStateContext();

  return (
    <div className="my-6">
      <h2 className="text-3xl font-semibold">
        Hello,
        <span className="font-bold capitalize"> {username}</span>
      </h2>
      <div className="mt-5">
        <h4 className="mt-10 mb-7 uppercase tracking-wide font-semibold opacity-80">
          categories
        </h4>
      </div>

      <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
        <Category name="Business" />
        <Category name="Personal" />
        <Category name="Family" />
        <Category name="School" />
      </div>
      <Link
        to="/add"
        className="inline-flex items-center gap-2 my-6 apply-hover"
      >
        <PencilSquareIcon width={20} className="text-red-500" />
        <span className="hover:text-red-500">Add New Task</span>
      </Link>
      <TaskList />
    </div>
  );
}
