"use client";

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import React, { useEffect, useState } from "react";
import { fetchAllCourses } from "../../../lib/actions/course.actions"; // adjust the path as needed
import Course, { CourseType } from "../../../lib/models/course.model";
import CourseCard from "@/components/cards/CourseCard";

export async function getServerSideProps() {
  const courses = await fetchAllCourses();

  if (!courses) {
    return {
      notFound: true,
    };
  }

  return { props: { courses } };
}

const Page: React.FC = () => {
  const [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const courseList = await fetchAllCourses();
        setCourses(courseList);
      } catch (error) {
        console.error("An error occurred while fetching courses:", error);
      }
    };

    loadCourses();
  }, []);

  return (
    <div className="container mx-auto px-6 py-24">
      <h1 className="text-heading1-bold mb-3 text-white">Challenges</h1>
      <div className="grid grid-cols-2 max-xs:grid-cols-1 gap-3"> {/* grid layout with 3 columns and spacing */}
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            name={course.name}
            languages={course.languages}
            description={course.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;