import * as z from "zod";

export const CommunityValidation = z.object({
  name: z.string().nonempty({ message: "Name is required." }).min(3, { message: "Minimum 3 characters." }),
  username: z.string().nonempty({ message: "Username is required." }).min(3, { message: "Minimum 3 characters." }),
  image: z.string().nonempty({ message: "Image URL is required." }).url({ message: "Must be a valid URL." }),
  bio: z.string().nonempty({ message: "Bio is required." }).min(3, { message: "Minimum 3 characters." }),
});
