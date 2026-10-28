"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export function BackButton() {
  const router = useRouter();
  return <button className="global-back-button" onClick={() => window.history.length > 1 ? router.back() : router.push("/")} aria-label="Go back to the previous page"><FaArrowLeft aria-hidden="true"/><span>Back</span></button>;
}
