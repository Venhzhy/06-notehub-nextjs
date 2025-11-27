"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "@/types/note";
import { deleteNote } from "@/lib/api";
import NoteItem from "@/components/NoteItem/NoteItem";
import css from "./NoteList.module.css";

export interface NoteListProps {
  notes: Note[];
  onDataChanged: () => void;
}

const NoteList = ({ notes, onDataChanged }: NoteListProps) => {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      onDataChanged();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDelete = (id: string): void => {
    deleteNoteMutation.mutate(id);
  };

  if (notes.length === 0) {
    return null;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onDelete={handleDelete} />
      ))}
    </ul>
  );
};

export default NoteList;