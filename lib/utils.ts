import { type ColumnDragData } from "@/components/kanban/board-column";
import { type TaskDragData } from "@/components/kanban/task-card";
import { type Active, type DataRef, type Over } from "@dnd-kit/core";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

type DraggableData = ColumnDragData | TaskDragData;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined,
): entry is T & {
  data: DataRef<DraggableData>;
} {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  if (data?.type === "Column" || data?.type === "Task") {
    return true;
  }

  return false;
}

export function generateColumns(columnList: string[]): { accessorKey: string; header: string }[] {

  return columnList.map((column: string) => {
    return { accessorKey: column, header: column.toUpperCase() } as { accessorKey: string; header: string };
  });
}

export function formatDate(date: string | number | Date) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }
  // @ts-ignore
  return new Date(date).toLocaleDateString("fr-FR", options)
}
