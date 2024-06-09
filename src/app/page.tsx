import { getServerAuthSession } from "~/server/auth";
import HomePage from "./_components/HomePage";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

const home = async () => {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    redirect("/login");
  }
  const todos = await api.post.getAllTodos();
  return <HomePage todos={todos} />;
};

export default home;
