import {
  WrenchScrewdriverIcon,
  MoonIcon,
  SunIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import { StateProvider } from "./contexts/StateContext";

// Getting the user's default theme
export const getTheme = () => {
  let theme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  theme = JSON.parse(localStorage.getItem("theme")) ?? theme;
  return theme;
};

export default function Layout() {
  const [theme, setTheme] = useState(useLoaderData());
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);

  // Changing the theme anytime the user changes his theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  function changeTheme(theme) {
    setTheme(theme);
    setShowThemeSwitcher((prev) => !prev);
  }

  function useSystemTheme() {
    let theme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    setTheme(theme);
    setShowThemeSwitcher((prev) => !prev);
  }

  return (
    <>
      <main className="app">
        <header className="py-4">
          <div className="center flex items-center justify-between">
            <Link to="/" className="flex-center cursor-pointer select-none">
              <WrenchScrewdriverIcon width={25} className="text-red-500" />
              <h1 className="text-2xl font-bold apply-hover hover:text-red-500">
                Task Manager
              </h1>
            </Link>

            <div className="relative">
              {theme === "light" ? (
                <MoonIcon
                  width={20}
                  className="apply-hover hover:text-red-500 cursor-pointer"
                  onClick={() => setShowThemeSwitcher((prev) => !prev)}
                />
              ) : (
                <SunIcon
                  width={20}
                  className="apply-hover hover:text-red-500 cursor-pointer"
                  onClick={() => setShowThemeSwitcher((prev) => !prev)}
                />
              )}
              {showThemeSwitcher && (
                <div className="theme-switcher absolute right-0 top-8 w-40 shadow rounded apply-hover element">
                  <div
                    className="flex-center p-3 apply-hover cursor-pointer z-30 overflow-hidden hover:bg-gray-200 dark:hover:text-black"
                    onClick={() => changeTheme("light")}
                  >
                    <SunIcon width={20} />
                    <span>Light Mode</span>
                  </div>
                  <div
                    className="flex-center p-3 apply-hover cursor-pointer z-30 overflow-hidden hover:bg-gray-200 dark:hover:text-black"
                    onClick={() => changeTheme("dark")}
                  >
                    <MoonIcon width={20} />
                    <span>Dark Mode</span>
                  </div>
                  <div
                    className="flex-center p-3 apply-hover cursor-pointer z-30 overflow-hidden hover:bg-gray-200 dark:hover:text-black"
                    onClick={() => useSystemTheme()}
                  >
                    <Cog8ToothIcon width={20} />
                    <span>System</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        <main>
          <StateProvider>
            <div className="center h-full">
              <Outlet />
            </div>
          </StateProvider>
        </main>
        <footer>
          <div className="center text-center text-xs my-4">
            <p>
              &copy; 2023, All rights reserved|{" "}
              <a
                href="https://benedictumeozor.vercel.app"
                target="_blank"
                rel=" noreferrer"
                className="underline"
              >
                Benedict
              </a>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
