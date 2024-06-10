import Image from "next/image";
import { redirect } from "next/navigation";
import Navbar from "~/app/_components/Navbar";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const Post = async (props: {
  params: {
    id: string;
  };
}) => {
  const session = await getServerAuthSession();
  if (session?.user == null) {
    redirect("/login");
  }
  const postData = await api.post.getPostDataById({
    id: props.params.id,
  });
  return (
    <div className="container2">
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <div>Owner : {postData.createdBy.username}</div>
        <Image
          src={postData.image ?? "/images/default.png"}
          alt="image"
          width={0}
          height={0}
          sizes="100vw"
          priority
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "500px",
          }}
        />
      </div>
      <div>price :{postData.price} $</div>
      <div>{postData.description}</div>
      <div>contact : {postData.createdBy.email}</div>
    </div>
  );
};

export default Post;
