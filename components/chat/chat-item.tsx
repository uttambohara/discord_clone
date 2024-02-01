"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const editingSchema = z.object({
  content: z.string().min(2, {
    message: "Post content must be at least 2 characters.",
  }),
});

type EditingSchema = z.infer<typeof editingSchema>;

import { roleIconMap } from "@/lib/icon-map";
import { PostsWithMemberWithProfile } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { format } from "date-fns";
import { MemberRole } from "@prisma/client";
import { Edit, File, Trash } from "lucide-react";
import { Button } from "../ui/button";
import queryString from "query-string";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal";

interface ChannelItemProps {
  memberId: string;
  post: PostsWithMemberWithProfile;
  socketUrl: string;
  socketParams: Record<string, string>;
  profileId: string;
}

export default function ChatItem({
  memberId,
  post,
  socketUrl,
  socketParams,
  profileId,
}: ChannelItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const { onOpen, onClose } = useModal();

  const isEdited = post.createdAt !== post.updatedAt;
  const formattedDate = format(post.createdAt, "dd MMM yyyy, hh:mm");

  const fileType = post.fileUrl?.split(".").pop();
  const isPdf = fileType && fileType === "pdf";
  const isImage = fileType;

  const isDeleted = post.deleted;
  const isAdmin = post.member.role === MemberRole.ADMIN;
  const isModerator = post.member.role === MemberRole.MODERATOR;
  const isGuest = post.member.role === MemberRole.GUEST;
  const isOwner = post.member.id === memberId;

  const canMakeAnEdit = isOwner && !isPdf && !isImage;
  const canDeleteAPost = isOwner && (isModerator || isAdmin);

  const form = useForm<EditingSchema>({
    resolver: zodResolver(editingSchema),
    defaultValues: {
      content: post.content || "",
    },
  });
  async function onSubmit(values: EditingSchema) {
    const qs = queryString.stringifyUrl({
      url: `${socketUrl}/${post.id}`,
      query: {
        ...socketParams,
        profileId,
      },
    });

    try {
      setIsUpdating(true);
      await axios.patch(qs, { content: values.content });
      router.refresh();
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
    }
  }

  function handleDelete(postId: string) {
    onOpen("deleteChat", {
      channelData: { socketUrl, socketParams, postId, profileId },
    });
    setIsEditing(false);
  }

  const params = useParams();

  function handleOpenConversation() {
    if (memberId === post.member.id) {
      return;
    }

    router.push(`/server/${params?.serverId}/conversation/${post.member.id}`);
  }

  return (
    <div className="flex items-center gap-2 hover:bg-slate-100 py-2 px-4 rounded-md dark:hover:bg-zinc-200/10 relative group">
      <div className="relative h-12 w-12">
        <Image
          onClick={handleOpenConversation}
          src={post.member.profile.imageUrl || ""}
          fill
          priority
          className="object-cover rounded-full"
          alt={post.member.profile.name || ""}
        />
      </div>

      <div className="w-full cursor-pointer">
        <div className="flex items-center gap-2">
          <div
            className="font-semibold font-sans hover:underline hover:underline-offset-4"
            onClick={handleOpenConversation}
          >
            {post.member.profile?.name}
          </div>
          {roleIconMap[post.member.role]}
          <div className="text-sm text-zinc-500">{formattedDate}</div>
        </div>

        <div>
          {!fileType && !isEditing && !isDeleted && (
            <div className="text-[0.9rem]">
              {post.content}{" "}
              {isEdited && <div className="italic text-sm">(edited)</div>}
            </div>
          )}

          {!fileType && isDeleted && (
            <div className="text-sm text-zinc-500">
              This message has been deleted.
            </div>
          )}

          {!fileType && isEditing && (
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="shadcn"
                            {...field}
                            className="w-full"
                            disabled={isUpdating}
                          />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          )}

          {fileType && isPdf && (
            <div>
              <div className="relative">
                <a href={post.fileUrl || ""} target="_blank">
                  <div className="p-2 flex items-center gap-2 text-sm">
                    <File
                      size={40}
                      className="stroke-purple-400 fill-blue-100"
                    />
                    {post.fileUrl}
                  </div>
                </a>
              </div>
            </div>
          )}

          {fileType && !isPdf && (
            <div>
              <div className="relative">
                <a href={post.fileUrl || ""} target="_blank">
                  <div className="p-2 flex items-center gap-2 text-sm">
                    <div className="relative h-48 w-48">
                      <Image
                        src={post.fileUrl || ""}
                        alt={post.content || ""}
                        fill
                        priority
                        className="object-cover rounded-sm"
                      />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          )}

          {canMakeAnEdit && !isDeleted && (
            <div className="absolute top-0 right-0 items-center gap-1  hover:flex bg-zinc-50 p-2 rounded-md hidden group-hover:flex">
              <div onClick={() => setIsEditing((d) => !d)}>
                <Edit size={16} />
              </div>
              {canDeleteAPost && (
                <div onClick={() => handleDelete(post.id)}>
                  <Trash size={16} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
