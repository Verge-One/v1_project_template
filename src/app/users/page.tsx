import UserClientPage from "./UserClientPage";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getServerHelpers } from "@/lib/trpc/serverHelpers";
export default async function page() {
  const helpers = await getServerHelpers();
  await helpers.users.getAll.prefetch();

  return (
    <HydrationBoundary state={dehydrate(helpers.queryClient)}>
      <UserClientPage />
    </HydrationBoundary>
  );
}
