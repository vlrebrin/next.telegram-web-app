"use client"
//import { prisma } from "@/lib/prisma";
import React from "react";
import { useState, useEffect } from "react";
import {
  Card, CardHeader, CardBody, Select, SelectItem,
  Spacer, Button, RadioGroup, Radio,
  Tooltip, Input, Textarea, Listbox, ListboxItem,
  Table,
  TableHeader, TableColumn,
  TableBody, TableRow, TableCell,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  PaginationItem,
  PaginationCursor,
  ScrollShadow
} from "@nextui-org/react";
import { useTransition } from "react";
import { fillMeteringData, CalculateMeteringData } from "@/lib/server-actions"

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const columns = [
  // { name: "ID", uid: "id", sortable: true },
  { name: "УЧАСТ.", uid: "name", sortable: true },
  { name: "НАИМЕН.", uid: "num" },
  { name: "СЧЕТЧ.", uid: "value" },
  { name: "ПОТР.", uid: "intake", sortable: true },
  { name: "ВЗНОС", uid: "contribution", sortable: true },
  { name: "СУММА", uid: "payment", sortable: true },
];

export default function TableCounters(props) {

  const INITIAL_VISIBLE_COLUMNS = ["name", "num", "value", "intake","payment","contribution"]
  const { checks, users, meterings } = props
  const rowsPerPage = 15;
  //const pages = Math.ceil(meterings.length / rowsPerPage);
  const pages = checks.length

  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [page, setPage] = React.useState(1);
  //const [pageColor, setPageColor] = React.useState()
  const [isPending, startTransition] = useTransition();
  //const [currentCheck, setCurrentCheck]=React.useState()

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return meterings.slice(start, end);
  }, [page, meterings]);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex justify-between gap-3 items-end">
        {/* <div className="flex gap-3"> */}
        <Dropdown
        //showArrow
        // classNames={{
        //   base: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
        //   arrow: "bg-default-100",
        // }}
        >
          {/* <DropdownTrigger className="hidden sm:flex"> */}
          <DropdownTrigger>
            <Button
              //endContent={<ChevronDownIcon className="text-small" />}
              size="sm"
              variant="flat"
            >
              Cтолбцы
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Table Columns"
            closeOnSelect={false}
            selectedKeys={visibleColumns}
            selectionMode="multiple"
            onSelectionChange={setVisibleColumns}
          >
            {columns.map((column) => (
              <DropdownItem key={column.uid}
                className="capitalize"
              >
                {capitalize(column.name)}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <DropdownTrigger>
            <Button size="sm" variant="flat"
              isDisabled={checks[page - 1].closed}>
              Имитатор
            </Button>
          </DropdownTrigger>
          <DropdownMenu onAction={(key) => {
            if (key === "Fill") {
              startTransition(() => {
                fillMeteringData(page, rowsPerPage)
              })
            } else if (key === "Calculate") {
              startTransition(() => {
                CalculateMeteringData(page, rowsPerPage)
              })
            } else alert(key)
          }}>
            <DropdownItem key="Fill" > Заполнить </DropdownItem>
            <DropdownItem key="Calculate"> Расчитать </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    )
  }, [
    // filterValue,
    // statusFilter,
    visibleColumns,
    page,
    checks,
    // hasSearchFilter,
  ])

  const bottomContent = React.useMemo(() => {
    const currentCheck = checks[page - 1]
    const pcolor = !currentCheck.closed ? "success" : "default"

    return (
      <div className=" flex-col items-center">
        <div className=" pb-2 w-[100%] text-small text-default-800 text-center">
          Счет : {currentCheck.createdAt.toLocaleString() + ` (${currentCheck.id})`
            + ` ${currentCheck.intake}` + ` ${currentCheck.summa}`}
        </div>
        <div className="flex-col items-center">
          <Pagination
            loop
            initialPage={1}
            isCompact
            showControls
            showShadow
            color={pcolor}
            page={page}
            total={pages}
            onChange={setPage}
            classNames={{
              //wrapper: "px-4 "
              //base: "content-center"
            }}
          />
        </div>
      </div>
    )
  }, [
    checks,
    //pageColor,
    //selectedKeys,
    page,
    pages
  ])

  const renderCell = React.useCallback((metering, columnKey) => {
    const cellValue = metering[columnKey];
    //const isNoValue=mettering.isNoValue
    const isNoValueClass = metering.isNoValue ? "text-red-800 bg-yellow-200" : ""
    switch (columnKey) {
      case "name":
        return (
          //<User
          // avatarProps={{ radius: "lg", src: user.avatar }}
          // description={user.email}
          //name={cellValue}
          < div className="flex flex-col gap-0" >
            <p className="text-bold text-small">{cellValue}</p>
          </div >
          //  { user.email }
          //</User>
        );
      case "num":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{cellValue}</p>
          </div>
        );
      case "value":
        return (
          // <div className={isNoValueClass}>
          <div>
            <p>{cellValue}</p>
          </div>
        );
      case "intake":
        return (
          <div >
            <p >{cellValue}</p>
          </div>
        );
      case "payment":
        return (
          <div >
            <p >{cellValue.toFixed(2)}</p>
          </div>
        );
      case "contribution":
        return (
          <div >
            <p >{cellValue.toFixed(2)}</p>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const HandlerRowAction = (key) => {
    const k = key
    console.log(key)
//    console.log(prevMetering(key))
  }

  return (
    <div className="flex ">
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          //wrapper: "max-h-[382px]",
          tr: "hover:bg-blue-400",
          td: "pl-1 pt-1 pb-0",
          //th:"bg-red-500"
        }}
        selectedKeys={selectedKeys}
        //selectionMode="multiple"
        //laiout="fixed"
        //isStriped
        selectionBehavior="replace"
        onRowAction={HandlerRowAction}
        topContent={topContent}
        topContentPlacement="inside"
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              //align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"}
          items={items}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

import { useRouter, usePathname } from 'next/navigation'
export function CheckIsEmpty() {
  const router = useRouter()
  return (
    <>
      <p className=" p-5 ">
        Нет ни одного Счета
        <Button
          color="primary"
          variant="light"
          onPress={(e) => { router.replace("/checks/new") }}
        > Создать счет </Button>
      </p>
    </>
  )
}