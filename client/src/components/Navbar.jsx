import { Disclosure, Menu, Transition } from "@headlessui/react";
import { HomeModernIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from "./Form/Button";
import Logo from "./Logo";
import Spinner from "./Spinner";

const navigation = [
  { name: "Movies", href: "/", current: true },
  { name: "Search", href: "/search", current: false },
];

const adminNavigation = [
  { name: "Home", href: "/admin", current: true },
  { name: "Movies", href: "/admin/movies", current: false },
  { name: "Reviews", href: "#", current: false },
  { name: "Users", href: "#", current: false },
];

const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ({
  user,
  userLoading,
  isError,
  adminNav,
  setTmdbSlide,
  tmdbSlide,
}) {
  const { logOut } = useAuth();

  const { pathname } = useLocation();

  return (
    <Disclosure as="nav" className="bg-white border-b border-gray-200">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/">
                    <div className="block lg:hidden ">
                      <Logo />
                    </div>
                    <div className="hidden lg:block ">
                      <Logo type="full" />
                    </div>
                  </Link>
                </div>

                {adminNav ? (
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    {adminNavigation.map((item) => (
                      <Link
                        to={item.href}
                        key={item.name}
                        current={item.current ? "page" : undefined}
                        className={classNames(
                          item.current
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                          "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          pathname === item.href
                            ? "border-brand-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                          "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {pathname.startsWith("/admin") ? (
                  <>
                    <Button onClick={() => setTmdbSlide(true)} size="xs">
                      Add New Movie
                    </Button>
                  </>
                ) : (
                  <>
                    {user && !userLoading && user.role === "ADMIN" && (
                      <div className="mr-2">
                        <Link to="/admin">
                          <Button size="xs">Open Admin Dashboard</Button>
                        </Link>
                      </div>
                    )}{" "}
                  </>
                )}

                {userLoading && <Spinner />}

                {/* Profile dropdown */}
                {user && !userLoading && (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://randomuser.me/api/portraits/men/32.jpg"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <Link
                                to={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => logOut()}
                              className={classNames(
                                active ? "bg-gray-100 cursor-pointer" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
                {!user && isError && (
                  <Link to="/auth/login">
                    <Button size="xs">Login</Button>
                  </Link>
                )}
              </div>

              {/* Mobile menu button */}
              {/* <div className="-mr-2 flex items-center sm:hidden">
               
                <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <HomeModernIcon
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <HomeModernIcon
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div> */}
            </div>
          </div>

          {/* <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
                    "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.imageUrl}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto bg-white flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  <HomeModernIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel> */}
        </>
      )}
    </Disclosure>
  );
}
