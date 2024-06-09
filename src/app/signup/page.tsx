"use client";
// import { useState } from "react";
// import { api } from "~/trpc/react";

// const Signup = () => {
//   const [formValue, setFormValue] = useState<{
//     email: string;
//     password: string;
//   }>({
//     email: "",
//     password: "",
//   });
//   return (
//     <div>
//       <div>sign up</div>
//       <form
// onSubmit={async (e) => {
//   e.preventDefault();
//   await api.post.userSignup.query({
//     email: formValue.email,
//     password: formValue.password,
//   });
// }}
//       >
//         <input
//           type="email"
//           name="email"
//           onChange={(e) => {
//             setFormValue((prev) => {
//               return {
//                 ...prev,
//                 email: e.target.value,
//               };
//             });
//           }}
//         />
//         <input
//           type="password"
//           name="password"
//           onChange={(e) => {
//             setFormValue((prev) => {
//               return {
//                 ...prev,
//                 password: e.target.value,
//               };
//             });
//           }}
//         />
//         <button>sign up</button>
//       </form>
//       <div>
//         you have a previous account? login{" "}
//         <span style={{ color: "red" }}>here</span>
//       </div>
//     </div>
//   );
// };

// export default Signup;

"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/trpc/react";

const Signup = () => {
  const [message, setMessage] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
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
        Signup
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
              const res = await api.post.userSignup.query({
                email: formValue.email,
                password: formValue.password,
              });
              setMessage(res);
              setFormValue({
                email: "",
                password: "",
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
              Signup
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
        you have a previous account? login{" "}
        <Link href={"/login"} style={{ color: "red" }}>
          here
        </Link>
      </div>
    </div>
  );
};

export default Signup;
