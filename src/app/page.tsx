"use client";
import PageController from "./pagecontroller";
export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen w-screen overflow-hidden">
      <div className="flex justify-center items-center w-3/4 ">
        <PageController />
      </div>
    </div>
  );
}
