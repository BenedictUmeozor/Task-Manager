import { Form, redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useStateDispatchContext } from "../contexts/StateContext";
import { formatDate } from "../helpers";
import { toast } from "react-toastify";

let dispatch;

export async function addTaskAction({ request }) {
  const data = await request.formData();
  const { title, category } = Object.fromEntries(data);
  dispatch({
    type: "add_task",
    id: uuidv4(),
    title: title,
    category: category,
    createdAt: Date.now(),
    date: formatDate(new Date()),
  });
  toast.success("New task added successfully");
  return redirect("/");
}

export default function AddTask() {
  dispatch = useStateDispatchContext();

  return (
    <div className="h-full">
      <header className="py-4">
        <h2 className="text-center font-semibold text-2xl">Add New Task</h2>
      </header>
      <section className="py-6">
        <div className="mx-auto w-full max-w-md element py-4 px-3 shadow">
          <Form method="post">
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
                defaultValue="Business"
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
              Add Task
            </button>
          </Form>
        </div>
      </section>
    </div>
  );
}
