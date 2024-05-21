"use client";

import BackButton from "@/components/BackButton";
import FormPost from "@/components/FormPost";
import { FormInputProps } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler } from "react-hook-form";

const CreatePage = () => {
  const router = useRouter();

  const handleCreatePost: SubmitHandler<FormInputProps> = (data) => {
    console.log("Form Data: ", data);
    createPost(data);
  };

  const { mutate: createPost, isLoading: isLoadingSubmit } = useMutation({
    mutationFn: (newPost: FormInputProps) => {
      return axios.post("/api/posts/create", newPost);
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
    <div>
      <BackButton />
      <h1 className="text-2xl font-bold text-center">Add New Post</h1>
      {isLoadingSubmit && <p className="text-center">Loading...</p>}
      <FormPost
        isLoadingSubmit={isLoadingSubmit}
        submit={handleCreatePost}
        isEditing={false}
      />
    </div>
  );
};

export default CreatePage;
