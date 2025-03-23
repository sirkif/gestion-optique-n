import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { CrudModal } from "../crud/crud-modal";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface GenericTableProps<T> {
  data: T[];
  columns: Column[];
  title: string;
  description?: string;
  onAdd: () => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  filterKey: string;
  filterPlaceholder: string;
  exportFileName: string;
}

export function GenericTable<T>({
  data,
  columns,
  title,
  description,
  onAdd,
  onEdit,
  onDelete,
  filterKey,
  filterPlaceholder,
  exportFileName
}: GenericTableProps<T>) {
  const [filterValue, setFilterValue] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [selectedItem, setSelectedItem] = React.useState<T | null>(null);
  const [modalMode, setModalMode] = React.useState<"create" | "edit" | "delete">("create");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const rowsPerPageOptions = [20, 50, 100];

  const filteredItems = React.useMemo(() => {
    return data.filter((item: any) =>
      String(item[filterKey]).toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [data, filterKey, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [filteredItems, page, rowsPerPage]);

  const handleAdd = () => {
    setModalMode("create");
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: T) => {
    setModalMode("edit");
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: T) => {
    setModalMode("delete");
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    switch (modalMode) {
      case "create":
        onAdd();
        break;
      case "edit":
        if (selectedItem) onEdit(selectedItem);
        break;
      case "delete":
        if (selectedItem) onDelete(selectedItem);
        break;
    }
    setIsModalOpen(false);
  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder={filterPlaceholder}
            startContent={<Icon icon="lucide:search" className="text-default-400" />}
            value={filterValue}
            onValueChange={setFilterValue}
          />
          <div className="flex gap-3">
            <Button
              color="primary"
              startContent={<Icon icon="lucide:plus" />}
              onPress={handleAdd}
            >
              Ajouter
            </Button>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  startContent={<Icon icon="lucide:list" />}
                >
                  Lignes par page: {rowsPerPage}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                selectedKeys={new Set([rowsPerPage.toString()])}
                selectionMode="single"
                onSelectionChange={(keys) => {
                  const key = Array.from(keys)[0];
                  if (key) setRowsPerPage(Number(key));
                }}
              >
                {rowsPerPageOptions.map((option) => (
                  <DropdownItem key={option}>{option}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }, [filterValue, rowsPerPage]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex justify-between items-center px-2 py-2">
        <span className="text-small text-default-400">
          {filteredItems.length} résultats au total
        </span>
        <Pagination
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages, filteredItems.length]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="text-default-500">{description}</p>}
      </div>

      <Table
        aria-label={title}
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        topContent={topContent}
        topContentPlacement="outside"
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((item: any, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.render
                    ? column.render(item[column.key], item)
                    : item[column.key]}
                </TableCell>
              ))}
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => handleEdit(item)}
                  >
                    <Icon icon="lucide:edit" className="text-default-500" />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="danger"
                    onPress={() => handleDelete(item)}
                  >
                    <Icon icon="lucide:trash" className="text-danger-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title={
          modalMode === "create"
            ? "Ajouter"
            : modalMode === "edit"
            ? "Modifier"
            : "Supprimer"
        }
        mode={modalMode}
      >
        {modalMode === "delete" ? (
          <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
        ) : null}
      </CrudModal>
    </div>
  );
}