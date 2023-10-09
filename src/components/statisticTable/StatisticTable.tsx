import { MaterialReactTable } from "material-react-table"
import { type MRT_ColumnDef } from "material-react-table" // If using TypeScript (optional, but recommended)
import { MRT_Localization_RU } from "material-react-table/locales/ru"
import { useEffect, useMemo, useState } from "react"
import ExportBtn from "../exportBtn/ExportBtn"
import { StatisticData } from "../../types/types"
import { useAppSelector } from "../../app/hooks"
import { selectGrouping } from "../../features/filters/fitltersSlice"

type StatisticTabelProps = {
  data: StatisticData[]
}

const StatisticTable = ({ data }: StatisticTabelProps) => {
  const grouping = useAppSelector(selectGrouping)

  const columns = useMemo<MRT_ColumnDef<StatisticData>[]>(
    () => [
      {
        header: "Период",
        accessorKey: "date_range",
      },
      {
        header: "ТК",
        accessorKey: "store_id",
      },
      {
        header: "Группа",
        accessorKey: "group_id",
      },
      {
        header: "Категория",
        accessorKey: "category_id",
      },
      {
        header: "Подкатегория",
        accessorKey: "subcategory_id",
      },
      {
        header: "Товар",
        accessorKey: "product_id",
      },
      {
        header: "Факт(шт.)",
        accessorKey: "fact",
      },
      {
        header: "Прогноз",
        accessorKey: "target",
      },
      {
        header: "Факт - прогноз",
        accessorKey: "delta",
      },
      {
        header: "WAPE",
        accessorKey: "WAPE",
      },
    ],
    [],
  )

  if (!data) return

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      state={{
        columnVisibility: {
          subcategory_id: !grouping,
          category_id: !grouping,
          group_id: !grouping,
          product_id: !grouping,
        },
      }}
      renderBottomToolbarCustomActions={() => <ExportBtn />}
      enableRowSelection={false} //enable some features
      enableColumnOrdering={false}
      enableColumnFilters={false}
      enablePinning={true}
      // enableColumnActions={false}
      enableGlobalFilter={false} //turn off a feature
      enableHiding
      // enablePagination={false}
      // enableBottomToolbar={false}
      enableTopToolbar={false}
      enableSorting={false}
      enableStickyHeader
      defaultColumn={{
        minSize: 80, //allow columns to get smaller than default
        maxSize: 250, //allow columns to get larger than default
        size: 150, //make columns wider by default
      }}
      //вся таблица
      muiTablePaperProps={{
        sx: {
          width: "100%",
          maxWidth: "1700px",
          boxSizing: "border-box",
          boxShadow: "none",
        },
      }}
      //КОнтейнер с данными
      muiTableContainerProps={{
        sx: {
          width: "100%",
          maxHeight: "800px",
          border: "none",
          // boxShadow: "none",
        },
      }}
      muiTableHeadCellProps={{
        // align: "center",
        sx: {
          padding: "10px 0px",
        },
      }}
      muiTableBodyCellProps={{
        sx: {
          border: "none",
          boxSizing: "border-box",
          padding: "15px 0px",
        },
      }}
      //вся таблица
      muiTableProps={{
        sx: {
          width: "100%",
          tableLayout: "fixed",
          // boxShadow: "none",
        },
      }}
      localization={MRT_Localization_RU}
    />
  )
}

export default StatisticTable
