"use client";
import Image from "next/image";
import { useState } from "react";
import { api } from "~/trpc/react";
import { UploadButton } from "~/utils/uploadthing";
import PostCard from "./PostCard";
import Navbar from "./Navbar";

type Props = {
  userData: {
    UserPost: {
      id: number;
      title: string;
      description: string;
      price: string;
      image: string | null;
      createdAt: Date;
      updatedAt: Date;
      createdById: string;
    }[];
  } & {
    id: string;
    username: string;
    email: string;
    password: string;
    image: string | null;
  };
};

const ProfilePage = (props: Props) => {
  const [profilePic, setProfilePic] = useState<string>(
    props.userData.image || "/images/default.png"
  );
  return (
    <div className="container2">
      <Navbar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginTop: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Image
            src={profilePic}
            alt="image"
            width={0}
            height={0}
            sizes="100vw"
            priority
            style={{
              width: "100%",
              height: "100%",
              aspectRatio: 1,
              maxWidth: "100px",
              borderRadius: "50%",
            }}
          />
          <div>
            <div>{props.userData.username}</div>
            <div>{props.userData.email}</div>
          </div>
        </div>
        <div>
          <div>change profile picture</div>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={async (res) => {
              const imageUrl = res[0]?.url;
              if (imageUrl == null) return;
              setProfilePic(imageUrl);
              await api.post.changeProfileImage.query({
                image: imageUrl,
              });
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 16,
          marginTop: 12,
        }}
      >
        {props.userData.UserPost.map((post) => {
          return (
            <PostCard
              userId={props.userData.id}
              createdById={post.createdById}
              title={post.title}
              id={post.id}
              image={post.image}
              price={post.price}
              profileimage={props.userData.image}
              username={props.userData.username}
              key={post.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePage;
