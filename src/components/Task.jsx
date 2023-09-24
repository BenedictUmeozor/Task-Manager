import {
  BriefcaseIcon,
  AcademicCapIcon,
  UserGroupIcon,
  UserCircleIcon,
  TrashIcon,
  CheckIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useStateDispatchContext } from "../contexts/StateContext";
import { toast } from "react-toastify";

export default function Task({ task }) {
  const dispatch = useStateDispatchContext();
  let textColor, borderColor;

  function toggleComplete(id) {
    dispatch({
      type: "toggle_complete",
      id: id,
    });
  }

  function deleteTask(id) {
    dispatch({
      type: "delete_task",
      id: id,
    });
    return toast.success("Task deleted successfully");
  }

  switch (task.category) {
    case "Business": {
      textColor = "text-pink-500";
      borderColor = "border-pink-500";
      break;
    }
    case "Personal": {
      textColor = "text-blue-500";
      borderColor = "border-blue-500";
      break;
    }
    case "Family": {
      textColor = "text-purple-500";
      borderColor = "border-purple-500";
      break;
    }
    case "School": {
      textColor = "text-emerald-500";
      borderColor = "border-emerald-500";
      break;
    }
    default: {
      textColor = "text-pink-500";
      borderColor = "border-pink-500";
      break;
    }
  }

  return (
    <div
      className={`grid grid-cols-9 gap-2 element px-4 py-5 max-sm:px-2 rounded shadow apply-hover hover:shadow-lg ${
        task.completed ? "opacity-75" : ""
      }`}
    >
      <div className="col-span-1">
        <button
          className={`flex items-center justify-center border-2 rounded p-1 max-sm:p-0 ${
            task.completed ? "" : "p-3 max-sm:p-2"
          }`}
          onClick={() => toggleComplete(task.id)}
        >
          {task.completed ? <CheckIcon width={20} /> : ""}
        </button>
      </div>

      <div className="col-span-8">
        <h5
          className={`text-xl font-semibold mb-2 capitalize max-sm:text-lg break-words ${
            task.completed ? "line-through" : ""
          }`}
        >
          {task.title}
        </h5>
        <p className="mb-4 text-sm opacity-60">{task.date}</p>

        <div className="flex-between">
          <div
            className={`flex items-center gap-1 py-2 px-4 border-2 rounded max-sm:py-1 max-sm:px-2 max-sm:text-xs ${textColor} ${borderColor}`}
          >
            {task.category === "Business" ? (
              <>
                <BriefcaseIcon width={20} />
                <span>Business</span>
              </>
            ) : task.category === "Personal" ? (
              <>
                <UserCircleIcon width={20} />
                <span>Personal</span>
              </>
            ) : task.category === "Family" ? (
              <>
                <UserGroupIcon width={20} />
                <span>Family</span>
              </>
            ) : (
              <>
                <AcademicCapIcon width={20} />
                <span>School</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3 max-sm:text-xs">
            <Link
              to={`edit/${task.id}`}
              className="flex items-center gap-1 apply-hover hover:text-indigo-500"
              onClick={(e) => {
                if (task.completed) {
                  e.preventDefault();
                  toast.warning("You cannot edit a completed task");
                }
              }}
            >
              <PencilIcon width={20} />
              <span>Edit</span>
            </Link>
            <div
              className="flex items-center gap-1 cursor-pointer apply-hover, hover:text-red-500"
              onClick={() => deleteTask(task.id)}
            >
              <TrashIcon width={20} />
              <span>Delete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
