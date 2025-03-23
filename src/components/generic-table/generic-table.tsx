import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, Pagination, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Column, GenericTableProps, PaginationState } from "./types";

const rowsPerPageOptions = [20, 50, 100];

export function GenericTable<T extends { id?: number }>({
  data,
  columns,
  title,
  description,
  onAdd,
  onEdit,
  onDelete,
  filterPlaceholder = "Rechercher...",
  filterKey,
  exportFileName = "export"
}: GenericTableProps<T>) {
  const [paginationState, setPaginationState] = React.useState<PaginationState>({
    page: 1,
    rowsPerPage: 20,
    filterValue: "",
  });

  const filteredItems = React.useMemo(() => {
    if (!filterKey || !paginationState.filterValue) return data;

    return data.filter((item) => {
      const value = item[filterKey];
      if (typeof value === "string") {
        return value.toLowerCase().includes(paginationState.filterValue.toLowerCase());
      }
      return false;
    });
  }, [data, filterKey, paginationState.filterValue]);

  const pages = Math.ceil(filteredItems.length / paginationState.rowsPerPage);
  const items = React.useMemo(() => {
    const start = (paginationState.page - 1) * paginationState.rowsPerPage;
    const end = start + paginationState.rowsPerPage;
    return filteredItems.slice(start, end);
  }, [filteredItems, paginationState.page, paginationState.rowsPerPage]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumns = columns.map(col => col.label);
    const tableRows = filteredItems.map(item => 
      columns.map(col => String(item[col.key]))
    );

    autoTable(doc, {
      head: [tableColumns],
      body: tableRows,
    });
    doc.save(`${exportFileName}.pdf`);
  };

  const exportToCSV = () => {
    const tableColumns = columns.map(col => col.label);
    const tableRows = filteredItems.map(item =>
      columns.map(col => String(item[col.key]))
    );
    
    const csvContent = [
      tableColumns.join(","),
      ...tableRows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${exportFileName}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          {filterKey && (
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder={filterPlaceholder}
              startContent={<Icon icon="lucide:search" className="text-default-400" />}
              value={paginationState.filterValue}
              onValueChange={(value) => setPaginationState(prev => ({ ...prev, filterValue: value, page: 1 }))}
            />
          )}
          <div className="flex gap-3">
            {onAdd && (
              <Button 
                color="primary"
                startContent={<Icon icon="lucide:plus" />}
                onPress={onAdd}
              >
                Ajouter
              </Button>
            )}
            <Button 
              variant="flat"
              color="primary"
              startContent={<Icon icon="lucide:file-text" />}
              onPress={exportToPDF}
            >
              Exporter PDF
            </Button>
            <Button 
              variant="flat"
              color="primary"
              startContent={<Icon icon="lucide:file-spreadsheet" />}
              onPress={exportToCSV}
            >
              Exporter CSV
            </Button>
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="flat" 
                  startContent={<Icon icon="lucide:list" />}
                >
                  Lignes par page: {paginationState.rowsPerPage}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={new Set([paginationState.rowsPerPage.toString()])}
                onSelectionChange={(keys) => {
                  const key = Array.from(keys)[0];
                  if (key) setPaginationState(prev => ({ ...prev, rowsPerPage: Number(key), page: 1 }));
                }}
              >
                {rowsPerPageOptions.map((pageSize) => (
                  <DropdownItem key={pageSize}>{pageSize}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }, [paginationState.filterValue, paginationState.rowsPerPage, filterKey, onAdd]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-2 py-2">
          <span className="text-small text-default-400">
            {filteredItems.length} résultats au total
          </span>
          <Pagination
            showControls
            showShadow
            color="primary"
            page={paginationState.page}
            total={pages}
            onChange={(page) => setPaginationState(prev => ({ ...prev, page }))}
          />
        </div>
        <div className="flex justify-center text-small text-default-400">
          Lignes par page: {paginationState.rowsPerPage}
        </div>
      </div>
    );
  }, [paginationState.page, paginationState.rowsPerPage, pages, filteredItems.length]);

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-default-900">{title}</h1>
          {description && <p className="text-default-500">{description}</p>}
        </div>
        <div className="h-px bg-default-200" />
      </div>
      <Table 
        aria-label={title}
        topContent={topContent}
        topContentPlacement="outside"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={String(column.key)}>{column.label}</TableColumn>
          ))}
          {(onEdit || onDelete) && <TableColumn>ACTIONS</TableColumn>}
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell key={String(column.key)}>
                  {column.render ? column.render(item[column.key], item) : String(item[column.key])}
                </TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell>
                  <div className="flex gap-2">
                    {onEdit && (
                      <Button 
                        isIconOnly
                        size="sm" 
                        variant="light" 
                        onPress={() => onEdit(item)}
                      >
                        <Icon icon="lucide:edit" className="text-default-500" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button 
                        isIconOnly
                        size="sm" 
                        variant="light" 
                        color="danger"
                        onPress={() => onDelete(item)}
                      >
                        <Icon icon="lucide:trash" className="text-danger-500" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}