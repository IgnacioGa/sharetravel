"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import DismissableModal from "./DismisableModal";
import LoginModal from "./modals/LoginModal";
import { useRouter } from "next/navigation";

const Nav = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [loginModal, setloginModal] = useState<boolean>(false);

  return (
    <>
      {loginModal && (
        <DismissableModal>
          <LoginModal onAccept={() => router.refresh()} onCancel={() => setloginModal(false)} />
        </DismissableModal>
      )}
      <nav className="flex-between w-full mb-12 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
          <Image src="/assets/images/logo.svg" width={30} height={30} alt="logo" className="object-coantain" />
          <p className="logo_text">Share Travel</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-3 sm:gap-5">
              <Link href="/post/create-post" className="black_btn">
                Create Post
              </Link>
              <button type="button" onClick={() => signOut()} className="outline_btn">
                Sign Out
              </button>
              <Link href={`/profile/${session?.user?.slug}`} className="black_btn">
                <Image
                  src={session?.user.image || "/assets/icons/profile.svg"}
                  width={37}
                  height={37}
                  alt="profile"
                  className="rounded-full"
                />
              </Link>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setloginModal(true);
                }}
                className="black_btn">
                Sign in
              </button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className="flex">
              <Image
                src={session?.user.image || "/assets/icons/profile.svg"}
                width={37}
                height={37}
                alt="profile"
                className="rounded-full"
                onClick={() => {
                  setToggleDropdown((prev) => !prev);
                }}
              />
              {toggleDropdown && (
                <div className="dropdown">
                  <Link href={`/profile/${session?.user?.slug}`} className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                    My profile
                  </Link>
                  <Link href="post/create-post" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                    Create Post
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className="mt-5 w-full black_btn">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setloginModal(true);
                }}
                className="black_btn">
                Sign in
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
