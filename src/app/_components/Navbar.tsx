"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: 32,
        justifyContent: "center",
        paddingTop: 12,
        paddingBottom: 12,
        background: "#ccc",
      }}
    >
      <Link href="/">home</Link>

      <Link href="/addpost">add Post</Link>
      <Link href={"/profile/"}>Profile</Link>
      <div
        style={{
          cursor: "pointer",
        }}
        onClick={async () => {
          await signOut();
        }}
      >
        LOGOUT
      </div>
    </div>
  );
};

export default Navbar;
