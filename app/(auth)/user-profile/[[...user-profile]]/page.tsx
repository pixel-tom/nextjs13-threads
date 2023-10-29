import { UserProfile } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="">
      <UserProfile
        appearance={{
            
          elements: {
            formButtonPrimary:
              "bg-slate-500 hover:bg-slate-400 text-sm normal-case",
            colorBackground: "bg-slate-200",
          },
        }}
      />
    </div>
  );
}
