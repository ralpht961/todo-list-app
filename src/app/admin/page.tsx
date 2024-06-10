import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import AdminPage from "../_components/AdminPage";

type NewSession =
  | (Session & {
      user:
        | (Session["user"] & {
            role: "ADMIN" | "USER";
          })
        | null;
    })
  | null;
const AdminPanel = async () => {
  const session = (await getServerAuthSession()) as unknown as NewSession;
  console.log(session?.user);

  if (session?.user == null) {
    redirect("/login");
  } else if (session.user.role != "ADMIN") {
    redirect(`/profile`);
  }
  const allUsers = await api.post.getAllUsers();
  return <AdminPage allUsers={allUsers} />;
};

export default AdminPanel;
