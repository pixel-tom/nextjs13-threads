import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Searchbar from "@/components/shared/Searchbar";
import Pagination from "@/components/shared/Pagination";
import CommunityCard from "@/components/cards/CommunityCard";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchCommunities } from "@/lib/actions/community.actions";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch communities
  const result = await fetchCommunities({
    searchTerm: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25, // You might want to adjust this number depending on your layout requirements
  });

  return (
    <>
      <div className="py-24 px-6">
        <h1 className="head-text">Communities</h1>

        <div className="mt-5">
          <Searchbar routeType="communities" />
        </div>

        {/* Changed section: Adjusting container for a 3-column grid with space-x-3 */}
        <section className="mt-9 grid grid-cols-2 gap-x-3 gap-y-4">
          {result.communities.length === 0 ? (
            <p className="no-result">No communities found</p>
          ) : (
            result.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))
          )}
        </section>

        <Pagination
          path="communities"
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
}

export default Page;
