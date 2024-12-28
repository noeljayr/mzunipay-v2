"use client";

import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import "@/css/not-found.css";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();

  const back = () => {
    router.back();
  };

  return (
    <div className="not-found">
      <div className="flex flex-col relative items-center justify-center">
        <span>404</span>
        <div className="flex not-found-text flex-col relative">
          <h1 className="mb-1 text-center">This page took a wrong turn</h1>
          <p className="mb-4 text-center">
            We could not find this page, but there is still plenty to see!
          </p>
          <Link onClick={back} className="cta" href="/">
            <IconArrowLeft />
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
