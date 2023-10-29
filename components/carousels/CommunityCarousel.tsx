'use client'

import React, { useState } from "react";
import CommunityCard from "@/components/cards/CommunityCard";

interface Community {
  id: string;
  name: string;
  username: string;
  image: string;
  bio: string;
  members: {
    image: string;
  }[];
}

interface CommunityCarouselProps {
  communities: Community[];
}

const CommunityCarousel: React.FC<CommunityCarouselProps> = ({ communities }) => {
  const [current, setCurrent] = useState(0);
  const totalSlides = Math.ceil(communities.length / 2);

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
          const communitiesInSlide = communities.slice(index * 2, index * 2 + 2);
          const gridClasses = communitiesInSlide.length === 1 ? "grid-cols-1" : "grid grid-cols-2 gap-4";

          return (
            <div className={`flex-1 min-w-full px-4 ${gridClasses}`} key={index}>
              {communitiesInSlide.map(community => (
                <CommunityCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  bio={community.bio}
                  members={community.members}
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

export default CommunityCarousel;
