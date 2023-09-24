import { Form } from "react-router-dom";
import { FaceSmileIcon } from "@heroicons/react/24/solid";

export default function IntroForm() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="element py-4 px-3 rounded shadow w-5/6 max-w-md">
        <Form method="post">
          <label htmlFor="username" className="flex-center mb-3">
            <span>Please enter a username</span>
            <FaceSmileIcon width={25} color="#ffde34" />
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="input"
            required
          />
          <button
            type="submit"
            className="mt-4 py-2 px-4 rounded bg-black text-white dark:bg-white dark:text-black apply-hover hover:scale-95"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
}
