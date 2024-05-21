import { Tag } from "@prisma/client";
import Link from "next/link";
import React, { FC } from "react";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    tag: Tag;
  };
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const { id, title, content, tag } = post;

  return (
    <div className="card w-full bg-base-100 shadow-xl border border-gray-600">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{content.slice(0, 30)}</p>
        <div className="card-actions justify-end flex flex-col items-end gap-y-2">
          <Link href={`/blog/${id}`} className="btn btn-primary text-white">
            Read More
          </Link>
          <div className="badge badge-primary badge-outline mt-2">
            {tag.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
