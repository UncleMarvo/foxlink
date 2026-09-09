import { landingMetadata } from "./metadata";
import LandingPage from "./page-client";

export const metadata = landingMetadata;

export default function Page() {
  // Read the environment variable on the server
  const freePlanLinkLimit = parseInt(process.env.FREE_PLAN_LINK_LIMIT || '10', 10);
  return <LandingPage freePlanLinkLimit={freePlanLinkLimit} />;
}
