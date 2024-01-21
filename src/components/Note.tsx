"use client";

import { Note as NoteModel } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import AddNoteDialog from "./AddNoteDialog";
import { useState } from "react";

interface NoteProps {
  note: NoteModel;
}

function Note({ note }: NoteProps) {
  const [showEditingDialog, setShowEditingDialog] = useState(false);
  const wasUpdated = note.updatedAt > note.createdAt;
  const createdUpdatedTimestamp = (
    wasUpdated ? note.updatedAt : note.createdAt
  ).toDateString();

  return (
    <>
      <Card
        className="cursor-pointer transition-shadow hover:shadow-lg"
        onClick={() => setShowEditingDialog(true)}
      >
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
          <CardDescription>
            {createdUpdatedTimestamp}
            {wasUpdated && " (updated)"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-linep">{note.content}</p>
        </CardContent>
      </Card>
      <AddNoteDialog
        open={showEditingDialog}
        setOpen={setShowEditingDialog}
        noteToEdit={note}
      />
    </>
  );
}

export default Note;
