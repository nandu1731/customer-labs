import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import SaveSegment from "@/components/save-segment";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans grid grid-rows-[20px_1fr_20px] min-h-screen p-10 pb-20 sm:p-20`}
    >
      <SaveSegment />
    </div>
  );
}
