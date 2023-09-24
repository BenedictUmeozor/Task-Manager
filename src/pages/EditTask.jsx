import { redirect, useLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";
import { useStateDispatchContext } from "../contexts/StateContext";
import { toast } from "react-toastify";

let dispatch;

export function editTaskLoader({ params }) {
  const { taskId } = params;
  const allTasks = JSON.parse(localStorage.getItem("tasks"));
  const taskToEdit = allTasks.filter((task) => task.id === taskId);
  return { taskToEdit };
}

export async function editTaskAction({ request }) {
  const data = await request.formData();
  const { taskId, title, category } = Object.fromEntries(data);
  dispatch({
    type: "edit_task",
    id: taskId,
    title: title,
    category: category,
  });
  console.log(taskId, title, category);
  toast.success("Task edited successfully");
  return redirect("/");
}

export default function EditTask() {
  dispatch = useStateDispatchContext();
  const { taskToEdit } = useLoaderData();
  const [task] = taskToEdit;

  return (
    <>
      <header className="py-4">
        <h2 className="text-center font-semibold text-2xl">Edit Task</h2>
      </header>
      <section className="py-6">
        <div className="mx-auto w-full max-w-md element py-4 px-3 shadow">
          <Form method="post">
            <input type="hidden" name="taskId" value={task.id} />
            <div>
              <label
                htmlFor="title"
                className="block mb-3 font-semibold text-lg"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                defaultValue={task.title}
                className="block appearance-none h-12 w-full px-2 rounded border text-black dark:text-white text-base border-gray-400 bg-gray-100 dark:bg-zinc-800 focus:outline-none"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="category" className="block mb-4 font-semibold">
                Select Category
              </label>
              <select
                name="category"
                id="category"
                required
                className="block px-4 h-12 rounded border text-black dark:text-white text-base border-gray-400 bg-gray-100 dark:bg-zinc-800 focus:outline-none"
                defaultValue={task.category}
              >
                <option value="Business">Business</option>
                <option value="Personal">Personal</option>
                <option value="Family">Family</option>
                <option value="School">School</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 py-2 px-7 rounded bg-black text-white dark:bg-white dark:text-black apply-hover hover:scale-95"
            >
              Edit Task
            </button>
          </Form>
        </div>
      </section>
    </>
  );
}
