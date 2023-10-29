// lib/actions/course.actions.ts

"use server";

import Course from "../models/course.model";
import { connectToDB } from "../mongoose";

export async function fetchAllCourses() {
  try {
    connectToDB();

    // Fetching all courses from the database
    const courses = await Course.find({});

    return courses;
  } catch (error) {
    // Handle any errors
    console.error("Error fetching courses:", error);
    throw error;
  }
}

export { connectToDB };