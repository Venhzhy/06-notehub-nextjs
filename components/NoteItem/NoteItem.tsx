"use client";

import Link from "next/link";
import type { Note } from "@/types/note";
import css from "./NoteItem.module.css";

type Props = {
  note: Note;
  onDelete: (id: string) => void;
};

const NoteItem = ({ note, onDelete }: Props) => {
  return (
    <li className={css.listItem}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      <div className={css.footer}>
        <span className={css.tag}>{note.tag}</span>
        <Link href={`/notes/${note.id}`} className={css.detailsLink}>
          View details
        </Link>
        <button
          type="button"
          className={css.button}
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default NoteItem;