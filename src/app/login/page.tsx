"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [formValue, setFormValue] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  return (
    <div className="container">
      <div
        style={{
          textAlign: "center",
          fontSize: 32,
          marginTop: 16,
          fontWeight: "bold",
        }}
      >
        Login
      </div>
      <div className="login-wrapper">
        <Image
          src={
            "https://images.unsplash.com/photo-1529539795054-3c162aab037a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className="imgs"
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
        <div
          className="form-wrapper"
          style={{
            display: "flex",
            alignItems: "center",
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
              await signIn("credentials", {
                email: formValue.email,
                password: formValue.password,
                redirect: false,
              }).then(async (data) => {
                if (data?.ok === true) {
                  await signIn("credentials", {
                    email: formValue.email,
                    password: formValue.password,
                    redirect: true,
                    callbackUrl: "/",
                  });
                }
              });
            }}
          >
            <div>Email</div>
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
              type="email"
              name="email"
              placeholder="Please Enter Your Email"
              onChange={(e) => {
                setFormValue((prev) => {
                  return {
                    ...prev,
                    email: e.target.value,
                  };
                });
              }}
            />
            <div>Password</div>
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
              type="password"
              name="password"
              placeholder="Please enter your password"
              onChange={(e) => {
                setFormValue((prev) => {
                  return {
                    ...prev,
                    password: e.target.value,
                  };
                });
              }}
            />
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
              Login
            </button>
          </form>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: 8,
        }}
      >
        no account? sign up{" "}
        <Link href={"/signup"} style={{ color: "red" }}>
          here
        </Link>
      </div>
    </div>
  );
};

export default Login;
