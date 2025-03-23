import { ReactNode } from "react";

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, item: T) => ReactNode;
}

export interface GenericTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title: string;
  description?: string;
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  filterPlaceholder?: string;
  filterKey?: keyof T;
  exportFileName?: string;
}

export interface PaginationState {
  page: number;
  rowsPerPage: number;
  filterValue: string;
}