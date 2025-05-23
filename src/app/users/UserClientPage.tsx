"use client";
import { useTRPC } from "@/lib/trpc/client";
import {
  Button,
  Card,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function UserClientPage() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const allPostsQuery = trpc.posts.getAllWithAuthor.queryOptions();
  // const updateUserMutation = trpc.users.updateUserById.mutationOptions({
  //   onSettled: () =>
  //     queryClient.invalidateQueries({
  //       queryKey: allUserQuery.queryKey,
  //     }),
  //   onError: (error) => {
  //     notifications.show({
  //       title: "Fehler",
  //       message: "Daten konnten nicht aktualisiert werden",
  //       color: "red",
  //     });
  //   },
  // });

  const { data: posts, isRefetching, isLoading } = useQuery(allPostsQuery);
  // const { mutateAsync: mutateUser } = useMutation(updateUserMutation);
  return (
    <Stack p={32}>
      {isRefetching && (
        <Loader pos="absolute" top={16} right={16} size={"md"} />
      )}
      <Title>Alle Posts</Title>
      {isLoading && <Loader size={"lg"} />}
      <SimpleGrid w="100%" cols={3}>
        {posts?.map((post) => {
          return (
            <Card withBorder shadow="md" radius={12}>
              <Stack>
                <Text fw={600} fz={32}>
                  {post.title}
                </Text>
                <Text mt={-24} fz={14} c="dimmed">
                  @{post.author?.name} ({post.author?.age})
                </Text>
                <Text>{post.content}</Text>
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}
