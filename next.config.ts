import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next 16 generates its own AGENTS.md and CLAUDE.md on `next dev` and would
  // overwrite the hand-written ones in this repo. Off.
  agentRules: false,
};

export default nextConfig;
