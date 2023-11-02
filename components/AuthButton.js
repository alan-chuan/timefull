"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import { Menu } from "@headlessui/react";

const AuthButton = () => {
  const { data: session, status } = useSession();
  const blankProfilePic = "/blank_profile_pic.png";
  if (session) {
    return (
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <Menu.Button>
              <img
                src={`${session?.user?.image}`}
                alt="profile picture"
                className="w-12 h-12 rounded-full border border-gray-200 object-cover cursor-pointer"
              />
            </Menu.Button>
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => signOut()}
                    className={`${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } block px-4 py-2 text-sm`}
                  >
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </>
        )}
      </Menu>
    );
  } else {
    return (
      <div className="flex flex-row-reverse">
        <img
          src={blankProfilePic}
          alt="profile picture"
          className="w-12 h-12 rounded-full border border-gray-200 object-cover"
        />
        <button onClick={() => signIn("google")}>Sign In</button>
      </div>
    );
  }
};

export default AuthButton;
