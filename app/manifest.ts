import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ewuji John — Azure and DevOps Learning",
    short_name: "Ewuji John",
    description: "Practical Azure, DevOps, Kubernetes, and Infrastructure-as-Code learning.",
    start_url: "/",
    display: "browser",
    background_color: "#08111f",
    theme_color: "#08111f",
  };
}
