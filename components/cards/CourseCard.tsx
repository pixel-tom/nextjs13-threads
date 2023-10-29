import Image from "next/image";
import Link from "next/link";
import { CourseType } from "@/lib/models/course.model";

import { Button } from "../ui/button";



function CourseCard({ id, name, languages, description }: CourseType) {
  return (
    <article className='community-card w-full max-w-1/2'>
      <div className='flex flex-wrap items-center gap-3'>

        <div className="w-full bg-gradient-to-tr from-[#9845FE] to bg-[#14F094] space-y-2 px-5 pb-4 pt-6 rounded-md">
          <Link href={`/courses`}>
            <h4 className='text-heading3-bold text-light-1 w-3/4 '>{name}</h4>
          </Link>
          <h4 className='text-base-semibold text-light-2'>{languages}</h4>
        </div>
      </div>

      <p className='mt-4 text-subtle-medium text-gray-1 px-5 max-xs:multiline-truncate'>{description}</p>

      <div className='mt-5 flex flex-wrap items-center justify-between px-5 gap-3'>
        <Link href={`/courses`}>
          <Button size='sm' className='community-card_btn'>
            View
          </Button>
        </Link>
      </div>
    </article>
  );
}

export default CourseCard;
