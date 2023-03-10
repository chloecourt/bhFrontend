"use client";

import Image from "next/image";
import { navigation } from "../utils/constants";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import AvatarMenu from "./Navigation/AvatarMenu";
import { classNames } from "../lib/styling";
import { useState } from "react";
import { unsetToken } from "../lib/auth";
import { fetchAPI } from "../lib/api";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useFetchUser } from "../context/UserContext";

export function Navbar() {
  console.log("navbar mounted");
  const { user: contextUser, loading } = useFetchUser();
  console.log("useFetchUser: contextUser", contextUser);
  console.log("useFetchUser: loading", loading);
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Disclosure
      as="nav"
      className="bg-red-600 shadow-lg w-full top-0 z-10 max-h-[10vh]"
    >
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8 max-w-[854px]">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <Image
                      className="hidden h-8 w-auto lg:block"
                      height={32}
                      width={32}
                      src="/../public/images/BH-favicon-white.png"
                      alt="logo"
                    />
                  </Link>
                  <Link href="/">
                    <Image
                      className="block h-8 w-auto lg:hidden"
                      height={32}
                      width={32}
                      src="/../public/images/BH-favicon-white.png"
                      alt="logo"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-800 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link href="/cart">
                  <button
                    type="button"
                    className="rounded-full bg-transparent p-1 mx-3 text-gray-800 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-0.5 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <ShoppingBagIcon
                      className="h-6 w-6 bg-transparent"
                      aria-hidden="true"
                    />
                  </button>
                </Link>

                {/* Profile dropdown */}
                {session?.user ? (
                  <>
                    <AvatarMenu session={session?.user} />
                    {/* <h1>{session.user.email}</h1> */}
                    <button
                      className="ml-3 py-2 px-3 text-base border border-black"
                      onClick={() => {
                        unsetToken();
                        signOut();
                        router.refresh();
                      }}
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="text-gray-900 hover:text-white hover:bg-gray-700
                    px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-800 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
