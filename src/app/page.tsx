import { getServerAuthSession } from "~/server/auth";
import HomePage from "./_components/HomePage";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

const home = async () => {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    redirect("/login");
  }
  const allPosts = await api.post.getAllPosts();
  return <HomePage userId={session.user.id} allPosts={allPosts} />;
};

export default home;
