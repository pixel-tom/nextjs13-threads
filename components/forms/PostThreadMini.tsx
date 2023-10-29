"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread, editThread } from "@/lib/actions/thread.actions";

interface Props {
  userId: string;
  threadId?: string;
  threadText?: string;
}

function PostThreadMini({ userId, threadId, threadText }: Props) {
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
      }
      
      );
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
    <div className="flex justify-center w-full">
      <Form {...form}> {/* Adjusted for a wider form */}
        <form
          className="w-full shadow-lg rounded-lg"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-row justify-between border-b border-dark-4 pb-4 mb-4">
            <h1 className="text-xl font-semibold text-light-2 ">
              {threadId ? "Edit" : "Create"} Post
            </h1>
            <button
              type="submit"
              className="w-1/4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-light-2 bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Post
            </button>
          </div>

          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                
                <Textarea
                  {...field}
                  rows={3}
                  className="resize-none border border-dark-4 rounded-lg px-8 py-6 w-full text-light-1 bg-dark-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="What's happening?"
                />
                {/* Error message, if you have error handling */}
                <FormMessage className="text-red-500 text-sm mt-1" />
              </div>
            )}
          />

          
        </form>
      </Form>
    </div>
  );
}

export default PostThreadMini;