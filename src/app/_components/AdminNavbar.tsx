"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

const AdminNavbar = () => {
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
      <Link href="/admin">home</Link>

      <Link href="/admin/deletePosts">delete Posts</Link>
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

export default AdminNavbar;
