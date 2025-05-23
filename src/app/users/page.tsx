import UserClientPage from "./UserClientPage";
import { HydrationBoundary } from "@tanstack/react-query";
import { getServerHelpers } from "@/lib/trpc/serverHelpers";
export default async function page() {
  const helpers = await getServerHelpers();

  await helpers.posts.getAllWithAuthor.prefetch();
  //vll doch dehydrate von tanstack import und helpers.queryClient
  return (
    <HydrationBoundary state={helpers.dehydrate()}>
      <UserClientPage />
    </HydrationBoundary>
  );
}
