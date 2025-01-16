"use client";
import Grid from "./grid";
export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen w-screen overflow-hidden">
      <div className="flex justify-center items-center w-3/4 ">
        <Grid />
      </div>
    </div>
  );
}
