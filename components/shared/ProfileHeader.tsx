import Link from "next/link";
import Image from "next/image";
import FollowUser from "../atoms/FollowUser";

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

function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
  isFollowing,
}: Props) {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center my-auto gap-3 h-16">
          <div className="relative h-16 w-16 object-cover">
            <Image
              src={imgUrl}
              alt="logo"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">
              {name}
            </h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
          <div className="flex flex-row space-x-5 ml-4 mt-auto mb-2">
            <div>
              <Link href={""}>
                <button>
                  <Image
                    src={"/assets/icons8-twitter.svg"}
                    alt={""}
                    height={22}
                    width={22}
                  />
                </button>
              </Link>
            </div>
            <div>
              <Link href={""}>
                <button>
                  <Image
                    src={"/assets/icons8-github.svg"}
                    alt={""}
                    height={22}
                    width={22}
                  />
                </button>
              </Link>
            </div>
            <div>
              <Link href={""}>
                <p className="text-left text-light-1">Exchange.Art</p>
              </Link>
            </div>
            <div>
              <p className="inline-flex items-center rounded-md bg-green-400 bg-opacity-20 shadow-inner px-2 py-1 text-xs font-medium text-green-300 ring-2 ring-inset ring-green-400/40">
                Rookie
              </p>
            </div>
          </div>
        </div>
        {type !== "Community" && (
          <div className="flex flex-row gap-2">
            <>
              {accountId === authUserId ? (
                <Link href="/profile/edit">
                  <div className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2">
                    <Image
                      src="/assets/edit.svg"
                      alt="logout"
                      width={16}
                      height={16}
                    />

                    <p className="text-light-2 max-sm:hidden">Edit</p>
                  </div>
                </Link>
              ) : (
                <FollowUser
                  userId={accountId}
                  currentUserId={authUserId}
                  isFollowing={isFollowing}
                />
              )}
            </>
          </div>
        )}
      </div>

      <p className="mt-6 ml-24 max-w-lg text-base-regular text-light-2">
        {bio}
      </p>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
}

export default ProfileHeader;
