"use client";
import Image from "next/image";
import { api } from "~/trpc/react";
import AdminNavbar from "./AdminNavbar";

type Props = {
  allUsers: {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    image: string | null;
  }[];
};
const AdminPage = (props: Props) => {
  return (
    <div className="container2">
      <AdminNavbar />
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 26,
        }}
      >
        ADMIN PANEL
      </div>
      <div>ALL USERS</div>
      <div
        style={{
          marginTop: 12,
        }}
      >
        {props.allUsers.map((user) => {
          return (
            <div
              style={{
                maxWidth: 70,
                display: "flex",
                gap: 16,
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Image
                src={user.image || "/images/default.png"}
                alt="image"
                width={0}
                height={0}
                sizes="100vw"
                priority
                style={{
                  width: "100%",
                  height: "100%",
                  aspectRatio: 1,
                }}
              />
              <div>
                <div>{user.username}</div>
                <div>{user.email}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                }}
              >
                <div
                  onClick={async () => {
                    await api.post.deleteUser.query({
                      id: user.id,
                    });
                    window.location.reload();
                  }}
                  style={{
                    padding: 6,
                    background: "#CCC",
                    color: "white",
                    width: "fit-content",
                    cursor: "pointer",
                  }}
                >
                  delete
                </div>
                {user.role === "USER" ? (
                  <div
                    onClick={async () => {
                      await api.post.makeAdmin.query({
                        id: user.id,
                      });
                      window.location.reload();
                    }}
                    style={{
                      padding: 6,
                      background: "#CCC",
                      color: "white",
                      width: "fit-content",
                      cursor: "pointer",
                    }}
                  >
                    make admin
                  </div>
                ) : (
                  <div
                    onClick={async () => {
                      await api.post.removeAdmin.query({
                        id: user.id,
                      });
                      window.location.reload();
                    }}
                    style={{
                      padding: 6,
                      background: "#CCC",
                      color: "white",
                      width: "fit-content",
                      cursor: "pointer",
                    }}
                  >
                    remove admin
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPage;
