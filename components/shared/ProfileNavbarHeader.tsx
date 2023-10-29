import Link from "next/link";
import Image from "next/image";
import FollowUser from "../atoms/FollowUser";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: string;
  isFollowing?: boolean;
}

function ProfileNavbarHeader({ username, imgUrl }: Props) {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-base-medium text-lg text-gray-1 max-xs:hidden">
              @{username}
            </p>
          </div>
          <div className="relative h-9 w-9 object-cover">
            <Link href={"https://thorough-sturgeon-3.accounts.dev/user"}>

              <SignedIn>
                {/* Mount the UserButton component */}
                <UserButton />
              </SignedIn>
              <SignedOut>
                {/* Signed out users get sign in button */}
                <SignInButton />
              </SignedOut>
            </Link>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default ProfileNavbarHeader;
