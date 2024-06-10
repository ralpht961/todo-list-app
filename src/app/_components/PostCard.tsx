"use client";

import Image from "next/image";
import Link from "next/link";
import { api } from "~/trpc/react";

type Props = {
  userId: string;
  createdById: string;
  title: string;
  id: number;
  profileimage: string | null;
  image: string | null;
  username: string;
  price: string;
};
const PostCard = (props: Props) => {
  return (
    <Link
      href={`post/${props.id}`}
      key={props.id}
      style={{
        background: "#cccccc80",

        borderRadius: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          padding: 8,
        }}
      >
        <Image
          src={props.profileimage ?? "/images/default.png"}
          alt="image"
          width={0}
          height={0}
          sizes="100vw"
          priority
          style={{
            width: "100%",
            height: "100%",
            aspectRatio: 1,
            maxWidth: "30px",
            borderRadius: "50%",
          }}
        />
        <div>{props.username}</div>
        {props.createdById === props.userId && (
          <div
            style={{
              padding: 4,
              cursor: "pointer",
              color: "white",
              background: "#ccc",
            }}
            onClick={async () => {
              await api.post.deletePost.query({
                id: props.id,
              });
              window.location.reload();
            }}
          >
            delete
          </div>
        )}
      </div>
      <Image
        src={props.image ?? "/images/default.png"}
        alt="image"
        width={0}
        height={0}
        sizes="100vw"
        priority
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <div>{props.title}</div>
      <div>{props.price} $</div>
    </Link>
  );
};

export default PostCard;
