"use client";

import Image from "next/image";
import { api } from "~/trpc/react";
import AdminNavbar from "./AdminNavbar";

type Props = {
  allPosts: ({
    createdBy: {
      id: string;
      username: string;
      email: string;
      password: string;
      role: string;
      image: string | null;
    };
  } & {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    createdById: string;
  })[];
};

const AdminAllPosts = (props: Props) => {
  return (
    <div className="container2">
      <AdminNavbar />
      <div
        style={{
          marginTop: 12,
        }}
      >
        {props.allPosts.map((post) => {
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
                src={post.image}
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
                <div>{post.title}</div>
                <div>{post.price}</div>
              </div>
              <div
                onClick={async () => {
                  await api.post.deletePost.query({
                    id: post.id,
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminAllPosts;
