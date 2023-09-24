import {
  BriefcaseIcon,
  AcademicCapIcon,
  UserGroupIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useStateDispatchContext } from "../contexts/StateContext";

export default function Category({ name }) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
  const dispatch = useStateDispatchContext();

  const taskNumber = tasks.filter((task) => task.category === name).length ?? 0;
  let bgColor, lightBgColor;

  function filterTasks(parameter) {
    dispatch({
      type: "filter",
      parameter: parameter,
    });
  }

  switch (name) {
    case "Business": {
      bgColor = "bg-pink-500";
      lightBgColor = "bg-pink-300";
      break;
    }
    case "Personal": {
      bgColor = "bg-blue-500";
      lightBgColor = "bg-blue-300";
      break;
    }
    case "Family": {
      bgColor = "bg-purple-500";
      lightBgColor = "bg-purple-300";
      break;
    }
    case "School": {
      bgColor = "bg-emerald-500";
      lightBgColor = "bg-emerald-300";
      break;
    }
    default: {
      bgColor = "bg-pink-500";
      lightBgColor = "bg-pink-300";
      break;
    }
  }

  return (
    <div
      className={`${bgColor} pt-6 px-3 pb-3 cursor-pointer rounded-lg text-white apply-hover hover:scale-95 max-sm:px-2 max-sm:mb-2 max-sm:pt-3 bg`}
      onClick={() => filterTasks(name.toLowerCase())}
    >
      <div>
        <span className="opacity-60 max-sm:text-xs">
          {taskNumber} {taskNumber === 1 ? "task" : "tasks"}
        </span>
      </div>
      <h4 className="flex-center mt-2">
        {name === "Business" ? (
          <BriefcaseIcon width={20} />
        ) : name === "Personal" ? (
          <UserCircleIcon width={20} />
        ) : name === "Family" ? (
          <UserGroupIcon width={20} />
        ) : (
          <AcademicCapIcon width={20} />
        )}
        <span className="text-2xl font-semibold max-sm:text-lg">{name}</span>
      </h4>
      <div className={`w-full h-6 rounded-sm ${lightBgColor}`}></div>
    </div>
  );
}
