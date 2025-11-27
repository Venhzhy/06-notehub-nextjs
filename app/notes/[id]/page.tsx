  import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

// 🔴 УВАГА: тут НЕМАЄ ні Promise, ні async у params-типі
export default async function NoteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params; // звичайний обʼєкт

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}