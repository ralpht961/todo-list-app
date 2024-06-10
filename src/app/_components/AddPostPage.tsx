"use client";
import { useState } from "react";
import { api } from "~/trpc/react";
import { UploadButton } from "~/utils/uploadthing";
import Navbar from "./Navbar";

const AddpostPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [formValue, setFormValue] = useState<{
    title: string;
    description: string;
    price: string;
    image: string;
  }>({
    title: "",
    description: "",
    price: "",
    image: "",
  });
  return (
    <div className="container2">
      <Navbar />
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 28,
        }}
      >
        Add Post
      </div>
      <div
        className=""
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
          onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true);
            const res = await api.post.addPost.query({
              ...formValue,
            });
            setMessage(res);
            setIsLoading(false);
          }}
        >
          <div>Title</div>
          <input
            style={{
              outline: "none",
              border: 0,
              marginTop: 8,
              marginBottom: 8,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 8,
              paddingBottom: 8,
              background: "#ccc",
              borderRadius: 18,
            }}
            type="text"
            name="Title"
            placeholder="Title"
            onChange={(e) => {
              setFormValue((prev) => {
                return {
                  ...prev,
                  title: e.target.value,
                };
              });
            }}
          />
          <div>Description</div>
          <input
            style={{
              outline: "none",
              border: 0,
              marginTop: 8,
              marginBottom: 8,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 8,
              paddingBottom: 8,
              background: "#ccc",
              borderRadius: 18,
            }}
            type="text"
            name="description"
            placeholder="Description"
            onChange={(e) => {
              setFormValue((prev) => {
                return {
                  ...prev,
                  description: e.target.value,
                };
              });
            }}
          />
          <div>price</div>
          <input
            style={{
              outline: "none",
              border: 0,
              marginTop: 8,
              marginBottom: 8,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 8,
              paddingBottom: 8,
              background: "#ccc",
              borderRadius: 18,
            }}
            type="text"
            name="price"
            placeholder="Price"
            onChange={(e) => {
              setFormValue((prev) => {
                return {
                  ...prev,
                  price: e.target.value,
                };
              });
            }}
          />
          <div>Upload image</div>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const firstres = res[0];
              if (firstres != null) {
                setFormValue((prev) => {
                  return {
                    ...prev,
                    image: firstres.url,
                  };
                });
              }
            }}
          />
          {message != null && (
            <div
              style={{
                textAlign: "center",
                color: message.success === false ? "red" : "green",
              }}
            >
              {message.message}
            </div>
          )}
          <button
            type="submit"
            style={{
              paddingTop: 8,
              paddingBottom: 8,
              background: "#1a1a1a",
              color: "white",
              border: 0,
              borderRadius: 18,
            }}
          >
            {isLoading === true ? "Loading..." : "Add Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddpostPage;
