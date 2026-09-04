import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: a stray lockfile in the home directory otherwise
  // makes Turbopack infer /Users/sayrikey as the root.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
