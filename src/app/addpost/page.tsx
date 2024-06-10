import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import AddpostPage from "../_components/AddPostPage";

const AddPost = async () => {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    redirect("/login");
  }
  return <AddpostPage />;
};

export default AddPost;
