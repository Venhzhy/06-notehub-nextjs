  import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
  } from "@tanstack/react-query";
  import { fetchNoteById } from "@/lib/api";
  import NoteDetailsClient from "./NoteDetails.client";

  type Props = {
    params: Promise<{ id: string }> | { id: string }; 
  };

  const NoteDetails = async ({ params }: Props) => {
    const resolvedParams = await params; 
    const { id } = resolvedParams;

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
  };

  export default NoteDetails;