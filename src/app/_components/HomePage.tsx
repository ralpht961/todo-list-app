"use client";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { api } from "~/trpc/react";
type Props = {
  todos: Array<{
    id: string;
    content: string;
  }>;
};
const HomePage = (props: Props) => {
  const [todo, setTodo] = useState<string>("");
  const [allTodos, setallTodos] = useState<Props["todos"]>(props.todos);
  return (
    <div className="container">
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
      <div
        style={{
          textAlign: "center",
          fontSize: 26,
          fontWeight: "bold",
        }}
      >
        TODO APP
      </div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await api.post.addTodo.query({
            todo,
          });
          setallTodos((prev) => {
            return [...prev, res];
          });
          setTodo("");
        }}
      >
        <div>Enter Todo Here</div>
        <input
          value={todo}
          type="text"
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
          placeholder="Enter Todo"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button
          style={{
            paddingTop: 8,
            paddingBottom: 8,
            background: "#1a1a1a",
            color: "white",
            border: 0,
            borderRadius: 18,
          }}
        >
          save
        </button>
      </form>
      <div
        style={{
          marginTop: 8,
        }}
      >
        {allTodos.map((todo) => {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                background: "#1a1a1a",
                color: "white",
                padding: 8,
                marginBottom: 4,
              }}
              key={todo.id}
            >
              <div>{todo.content}</div>
              <div
                style={{
                  cursor: "pointer",
                }}
                onClick={async () => {
                  await api.post.deleteTodoById.query({
                    id: todo.id,
                  });
                  window.location.reload();
                }}
              >
                X
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
