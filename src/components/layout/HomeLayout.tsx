import { Fragment, useEffect, useState } from "react";
import React from "react";

const navigation = [
  { name: "Register", href: "/register", current: false },
  { name: "List", href: "/discover", current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Header component
function Header() {
  return (
    <>
      <div className="mx-auto sm:px-6 z-50 lg:px-8 bg-black text-white w-full overflow-x-hidden fixed md:block hidden ">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center"></div>
            <div className=" sm:ml-6 block">
              <div className="flex space-x-1 md:space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* mobile responsive here */}

      <div className="relative  z-50">
        <div className="absolute top-[93vh]">
          <div className="mx-auto sm:px-6 lg:px-8 bg-black text-white w-full overflow-x-hidden md:hidden block fixed ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center"></div>
                <div className=" sm:ml-6 block">
                  <div className="flex space-x-1 md:space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function HomeLayout({ children }: any) {
  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="overflow-y-auto overflow-x-hidden max-h-full md:pb-0 pb-20 md:pt-20">
        {children}
        {/* Your content goes here */}
      </div>
    </div>
  );
}
