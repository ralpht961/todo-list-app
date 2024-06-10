import { Session } from "next-auth";
import { redirect } from "next/navigation";
import AdminAllPosts from "~/app/_components/AdminAllPosts";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

type NewSession =
  | (Session & {
      user:
        | (Session["user"] & {
            role: "ADMIN" | "USER";
          })
        | null;
    })
  | null;
const AdminDeletePosts = async () => {
  const session = (await getServerAuthSession()) as unknown as NewSession;
  console.log(session?.user);

  if (session?.user == null) {
    redirect("/login");
  } else if (session.user.role != "ADMIN") {
    redirect(`/profile`);
  }
  const allPosts = await api.post.getAllPosts();
  return <AdminAllPosts allPosts={allPosts} />;
};

export default AdminDeletePosts;
