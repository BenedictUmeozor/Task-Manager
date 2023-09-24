import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const StateContext = createContext(null);
const StateDispatchContext = createContext(null);

const username = JSON.parse(localStorage.getItem("username")) ?? null;
const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];

const initialState = {
  username: username,
  tasks: tasks,
};

function reducer(state, action) {
  switch (action.type) {
    case "add_username": {
      localStorage.setItem("username", JSON.stringify(action.username));
      return {
        ...state,
        username: action.username,
      };
    }
    case "add_task": {
      const newTask = {
        id: action.id,
        title: action.title,
        category: action.category,
        completed: false,
        date: action.date,
        createdAt: action.createdAt,
      };

      const updatedTasks = [...state.tasks, newTask];

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    case "edit_task": {
      const { id, title, category } = action;

      const updatedTasks = state.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, title: title, category: category };
        } else {
          return task;
        }
      });

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    case "toggle_complete": {
      const { id } = action;

      const updatedTasks = state.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      });

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    case "delete_task": {
      const { id } = action;
      const updatedTasks = state.tasks.filter((task) => task.id !== id);

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    case "filter": {
      switch (action.parameter) {
        case "all": {
          state.tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
          return { ...state };
        }
        case "pending": {
          state.tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
          const updatedTasks = state.tasks.filter(
            (task) => task.completed === false
          );
          return { ...state, tasks: updatedTasks };
        }
        case "completed": {
          state.tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
          const updatedTasks = state.tasks.filter(
            (task) => task.completed === true
          );
          return { ...state, tasks: updatedTasks };
        }
        case "business": {
          state.tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
          const updatedTasks = state.tasks.filter(
            (task) => task.category === "Business"
          );
          return { ...state, tasks: updatedTasks };
        }
        case "personal": {
          state.tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
          const updatedTasks = state.tasks.filter(
            (task) => task.category === "Personal"
          );
          return { ...state, tasks: updatedTasks };
        }
        case "family": {
          state.tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
          const updatedTasks = state.tasks.filter(
            (task) => task.category === "Family"
          );
          return { ...state, tasks: updatedTasks };
        }
        case "school": {
          state.tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
          const updatedTasks = state.tasks.filter(
            (task) => task.category === "School"
          );
          return { ...state, tasks: updatedTasks };
        }
        default: {
          state.tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
          return { ...state };
        }
      }
    }
    default: {
      return state;
    }
  }
}

export function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <StateDispatchContext.Provider value={dispatch}>
        {children}
      </StateDispatchContext.Provider>
    </StateContext.Provider>
  );
}

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useStateContext() {
  return useContext(StateContext);
}

export function useStateDispatchContext() {
  return useContext(StateDispatchContext);
}
