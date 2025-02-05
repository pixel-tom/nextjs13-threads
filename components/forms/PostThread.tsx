"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import { Form, FormField, FormMessage } from "@/components/ui/form";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread, editThread } from "@/lib/actions/thread.actions";

interface Props {
  userId: string;
  threadId?: string;
  threadText?: string;
}

function PostThread({ userId, threadId, threadText }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: threadText || "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    if (threadId && threadText) {
      await editThread({
        threadId,
        text: values.thread,
        path: pathname,
      });
    } else {
      await createThread({
        text: values.thread,
        author: userId,
        communityId: organization ? organization.id : null,
        path: pathname,
      });
    }

    router.push("/");
  };

  return (
    <div className="flex justify-center w-full max-w-6xl">
      <Form {...form}>
        {" "}
        {/* Adjusted for a wider form */}
        <form
          className="bg-dark-3 w-full shadow-lg rounded-lg p-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="border-b border-dark-4 pb-4 mb-4">
            <h1 className="text-xl font-semibold text-light-2 ">
              {threadId ? "Edit" : "Create"} Thread
            </h1>
          </div>

          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="thread"
                  className="text-sm font-medium text-light-2"
                >
                  Content
                </label>
                <textarea
                  {...field}
                  rows={5}
                  className="resize-none border border-dark-4 rounded-lg px-4 py-2 w-full text-light-1 bg-dark-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="What's happening?"
                />
                {/* Error message, if you have error handling */}
                <FormMessage className="text-red-500 text-sm mt-1" />
              </div>
            )}
          />

          <div className="mt-6">
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-light-2 bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Post
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default PostThread;
