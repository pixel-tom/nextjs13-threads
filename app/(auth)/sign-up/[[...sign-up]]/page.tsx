import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp
  appearance={{
    elements: {
      socialButtonsIconButtons:
        "bg-slate-500 hover:bg-slate-400 text-sm normal-case",
      card: "bg-black",
    },
  }}
/>;
}
