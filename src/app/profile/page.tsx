import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import ProfilePage from "../_components/ProfilePage";

const profile = async () => {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    redirect("/login");
  }
  const userData = await api.post.getUserData();

  return <ProfilePage userData={userData} />;
};

export default profile;
