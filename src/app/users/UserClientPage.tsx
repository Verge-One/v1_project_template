"use client";
import { useTRPC } from "@/lib/trpc/client";
import { Button, Loader, Stack } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function UserClientPage() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const allUserQuery = trpc.users.getAll.queryOptions();

  const { data: users, isRefetching } = useQuery(allUserQuery);

  return (
    <Stack w={400}>
      {isRefetching && <Loader />}
      {users?.map((user) => {
        return <Button>{user.birthday.toISOString()}</Button>;
      })}

      <Button
        onClick={() =>
          queryClient.invalidateQueries({
            queryKey: allUserQuery.queryKey,
          })
        }
      >
        Refetch
      </Button>
    </Stack>
  );
}
