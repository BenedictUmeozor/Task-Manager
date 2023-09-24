import {
  useStateContext,
  useStateDispatchContext,
} from "../contexts/StateContext";
import Task from "./Task";

export default function TaskList() {
  const { tasks } = useStateContext();
  const dispatch = useStateDispatchContext();
  let sortedTasks = tasks.sort((a, b) => b.createdAt - a.createdAt);
  let taskNumber = tasks.length ?? 0;

  function filterTasks(el, parameter) {
    document
      .querySelectorAll(".filter-btn")
      .forEach((el) => el.classList.remove("active"));
    el.classList.add("active");
    dispatch({
      type: "filter",
      parameter: parameter,
    });
    
  }

  return (
    <div>
      <div id="tasklist" className="flex items-center justify-end gap-3 mb-7">
        <button
          id="all"
          type="button"
          className="filter-btn apply-hover hover:text-red-500 active"
          onClick={(e) => filterTasks(e.target, e.target.id)}
        >
          All
        </button>
        <button
          id="pending"
          type="button"
          className="filter-btn apply-hover hover:text-red-500"
          onClick={(e) => filterTasks(e.target, e.target.id)}
        >
          Pending
        </button>
        <button
          id="completed"
          type="button"
          className="filter-btn apply-hover hover:text-red-500"
          onClick={(e) => filterTasks(e.target, e.target.id)}
        >
          Completed
        </button>
      </div>

      <div className="my-6">
        <p className="font-bold text-xl">
          Showing {taskNumber} {taskNumber === 1 ? "task" : "tasks"}
        </p>
      </div>

      <div>
        {tasks.length ? (
          <div className="my-12 grid md:grid-cols-2 gap-6">
            {sortedTasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <p className="text-center my-8 font-semibold opacity-75 text-lg">
            No tasks to show
          </p>
        )}
      </div>
    </div>
  );
}
