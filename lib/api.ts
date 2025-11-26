import axios from "axios";

export type Note = {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type NoteListResponse = {
  notes: Note[];
  total: number;
};

axios.defaults.baseURL = "https://next-v1-notes-api.goit.study";

export const getNotes = async () => {
  const res = await axios.get<NoteListResponse>("/notes");
  return res.data;
};