"use client";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import { redirect, RedirectType } from 'next/navigation'
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/images/logo.svg"
        alt={`${APP_NAME} logo`}
        width={48}
        height={480}
        priority={true}
      />
      <div className="p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-destructive">Could not find resquested page</p>
        <Button
            variant="outline" 
            className="mt-4 ml-2" 
            onClick={
                () => redirect('/', RedirectType.push)
            }
        >
            Back to Home
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;
