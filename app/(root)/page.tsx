'use client'

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchCommunities } from "@/lib/actions/community.actions";
import Example from "@/components/sections/HomeSection";
import CoursesCarousel from "@/components/carousels/CoursesCarousel";
import CommunityCarousel from "@/components/carousels/CommunityCarousel";
import { fetchAllCourses } from "@/lib/actions/course.actions";
import { useEffect, useState } from "react";
import { CourseType } from "@/lib/models/course.model";
import Community from "@/lib/models/community.model";
import HomeSection from "@/components/sections/HomeSection";

function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const courseList = await fetchAllCourses();
        setCourses(courseList);
      } catch (error) {
        console.error("An error occurred while fetching courses:", error);
      }
    };

    const loadCommunities = async () => {
      try {
        const result = await fetchCommunities({
          searchTerm: searchParams.q,
          pageNumber: searchParams?.page ? +searchParams.page : 1,
          pageSize: 25,
        });
        setCommunities(result.communities);
        console.log(communities);
      } catch (error) {
        console.error("An error occurred while fetching communities:", error);
      }
    };

    loadCourses();
    loadCommunities();
  }, []);

  return (
    <>
      <section className="pb-24 py-18">
        <div className="py-5">
          <HomeSection />
        </div>

        <h1 className="px-10 my-3 text-light-1 text-heading3-bold">
          Popular Communities
        </h1>

        <section>
        {communities.length === 0 ? (
            <p className="no-result">No communities found</p>
          ) : (
            <div className="px-10">
              <CommunityCarousel communities={communities} />
            </div>
          )}
        </section>

        <h1 className="px-10 mb-3 mt-8 text-light-1 text-heading3-bold">
          Popular Courses
        </h1>

        <section className="">
          {courses.length === 0 ? (
            <p className="no-result">No communities found</p>
          ) : (
            <div className="px-10">
              <CoursesCarousel courses={courses} />
            </div>
          )}
        </section>
      </section>
    </>
  );
}

export default Home;
