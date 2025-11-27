"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "@/types/note";
import { deleteNote } from "@/lib/api";
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
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>

            <button
              type="button"
              className={css.button}
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
