import { SignIn } from "@clerk/nextjs";
import {dark} from "@clerk/themes";

export default function Page() {
  return <SignIn
  appearance={{
    elements: {
      socialButtons:
        "bg-slate-500 hover:bg-slate-400 text-sm normal-case",
      socialButtonsIconButton: "bg-black",
    },
  }}
/>;
}
