import Link from "next/link";
import Image from "next/image";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";

import ProfileNavbarHeader from "./ProfileNavbarHeader";

async function Topbar() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  return (
    <nav className="topbar py-4 max-w-screen bg-glassmorphism backdrop-blur-lg border-b-[1px] border-gray-800">
      <Link href="/" className="flex flex-row items-center gap-3">
        <p className="text-heading2-bold text-light-1 max-xs:hidden ">
          Doge Academy.
        </p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="flex flex-row">
          <ProfileNavbarHeader
            accountId={userInfo.id}
            authUserId={user.id}
            name={userInfo.name}
            username={userInfo.username}
            imgUrl={userInfo.image}
            bio={userInfo.bio}
          />
          <OrganizationSwitcher
            appearance={{
              baseTheme: dark,
              elements: {
                organizationSwitcherTrigger: "py-2 px-4",
              },
            }}
          />
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
