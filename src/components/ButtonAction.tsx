"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

interface ButtonActionProps {
  id: string;
}

const ButtonAction: FC<ButtonActionProps> = ({ id }) => {
  const router = useRouter();

  const { mutate: deletePost, isLoading } = useMutation({
    mutationFn: async () => {
      return axios.delete(`/api/posts/${id}`);
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  return (
    <div className="flex items-center gap-x-2">
      <Link href={`/edit/${id}`} className="btn btn-success text-white">
        <Pencil /> EDIT
      </Link>
      <button onClick={() => deletePost()} className="btn btn-error text-white">
        {isLoading && <span className="loading loading-spinner"></span>}
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            <Trash2 />
            DELETE
          </>
        )}
      </button>
    </div>
  );
};

export default ButtonAction;
