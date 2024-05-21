"use client";

import { FormInputProps } from "@/types";
import { Tag } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormPostProps {
  submit: SubmitHandler<FormInputProps>;
  isEditing: boolean;
  initialValue?: FormInputProps;
  isLoadingSubmit: boolean;
}

const FormPost: FC<FormPostProps> = ({
  submit,
  isEditing,
  initialValue,
  isLoadingSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputProps>({
    defaultValues: initialValue,
  });

  // Fetch list tags
  const { data: dataTags, isLoading: isLoadingTags } = useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await axios.get("/api/tags");
      return response.data;
    },
  });

  return (
    <div className="w-full flex justify-center items-center mt-10">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col gap-y-4 w-full items-center"
      >
        <input
          type="text"
          {...register("title", {
            required: "Title is required",
            maxLength: 50,
          })}
          placeholder="Post Title"
          className="input input-bordered w-full max-w-lg"
        />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}

        <textarea
          className="textarea textarea-bordered resize-none w-full max-w-lg"
          placeholder="Post Content"
          {...register("content", {
            required: "Content is required",
            maxLength: 200,
          })}
        ></textarea>
        {errors.content && (
          <span className="text-red-500">{errors.content.message}</span>
        )}

        {isLoadingTags ? (
          <span className="loading loading-dots loading-xs"></span>
        ) : (
          <select
            {...register("tagId", { required: "Tag is required" })}
            className="select select-bordered w-full max-w-lg"
            defaultValue=""
          >
            <option disabled value="">
              Select Tag
            </option>
            {dataTags?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        )}
        {errors.tagId && (
          <span className="text-red-500">{errors.tagId.message}</span>
        )}

        <button
          type="submit"
          className="btn btn-primary max-w-lg w-full text-white"
        >
          {isLoadingSubmit && <span className="loading loading-spinner"></span>}
          {isEditing
            ? isLoadingSubmit
              ? "Updating..."
              : "Update"
            : isLoadingSubmit
            ? "Creating..."
            : "Create"}
        </button>
      </form>
    </div>
  );
};

export default FormPost;
