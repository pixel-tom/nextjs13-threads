'use client'

import React, { useState } from "react";
import CourseCard from "@/components/cards/CourseCard";

interface Course {
    id: string;
    name: string;
    description: string;
    languages: string;
  }

interface CourseCarouselProps {
  courses: Course[];
}

const CourseCarousel: React.FC<CourseCarouselProps> = ({ courses }) => {
  const [current, setCurrent] = useState(0);
  const totalSlides = Math.ceil(courses.length / 2);

  const handleNext = () => {
    setCurrent(oldCurrent => (oldCurrent === totalSlides - 1 ? 0 : oldCurrent + 1));
  };

  const handlePrev = () => {
    setCurrent(oldCurrent => (oldCurrent === 0 ? totalSlides - 1 : oldCurrent - 1));
  };

  const slideStyle = {
    transform: `translateX(-${current * 100}%)`
  };

  return (
    <div className="relative w-full overflow-hidden shadow-md">
      <div className="flex transition-transform duration-500 ease-in-out" style={slideStyle}>
        {Array.from({ length: totalSlides }, (_, index) => {
          const coursesInSlide = courses.slice(index * 2, index * 2 + 2);
          const gridClasses = coursesInSlide.length === 1 ? "grid-cols-1" : "grid grid-cols-2 gap-4";

          return (
            <div className={`flex-1 min-w-full px-4 ${gridClasses}`} key={index}>
              {coursesInSlide.map(course => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  name={course.name}
                  description={course.description}
                  languages={course.languages}

                />
              ))}
            </div>
          );
        })}
      </div>
      <button 
        className="community_carousel_previous_btn"
        onClick={handlePrev}
      >
        &lt;
      </button>
      <button 
        className="community_carousel_next_btn"
        onClick={handleNext}
      >
        &gt;
      </button>
    </div>
  );
};

export default CourseCarousel;
