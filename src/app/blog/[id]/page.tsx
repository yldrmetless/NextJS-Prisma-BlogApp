import ButtonAction from "@/components/ButtonAction";
import React, { FC } from "react";
import BackButton from "../../../components/BackButton";
import { db } from "@/lib/db";

interface BlogDetailProps {
  params: {
    id: string;
  };
}

async function getPost(id: string) {
  const response = await db.post.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      tag: true,
    },
  });
  return response;
}

const BlogDetail: FC<BlogDetailProps> = async ({ params }) => {
  const post = await getPost(params.id);

  return (
    <div>
      <BackButton />
      <div className="mb-8">
        <h2 className="text-2xl font-bold my-4 text-white">{post?.title}</h2>
        <ButtonAction id= {params.id}/> 
      </div>
      <div className="badge badge-primary badge-outline mt-2">{post?.tag.name}</div>
      <p className="text-slate-300">{post?.content}</p>
    </div>
  );
};

export default BlogDetail;
