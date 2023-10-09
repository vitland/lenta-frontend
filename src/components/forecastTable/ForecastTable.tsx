import { MaterialReactTable } from "material-react-table"
import { type MRT_ColumnDef } from "material-react-table" // If using TypeScript (optional, but recommended)
import { MRT_Localization_RU } from "material-react-table/locales/ru"
import { useEffect, useMemo, useState } from "react"
import { TForecast } from "../../types/types"
import ExportBtn from "../exportBtn/ExportBtn"

type TabelProps = {
  data: TForecast[]
}

const ForecastTable = ({ data }: TabelProps) => {
  const [forecastCol, setForecastCol] = useState<MRT_ColumnDef<TForecast>[]>([])

  useEffect(() => {
    if (data) {
      const columns = Object.keys(data[0].forecast).map((key) => ({
        header: key.slice(5, 10),
        accessorFn: (row: any) => row.forecast[key],
        size: 80,
      }))
      setForecastCol(columns)
    }
  }, [data])

  const columns = useMemo<MRT_ColumnDef<TForecast>[]>(
    () => [
      {
        header: "ТК",
        accessorKey: "store",
      },
      {
        header: "Группа",
        accessorKey: "group",
      },
      {
        header: "Категория",
        accessorKey: "category",
      },
      {
        header: "Подкатегория",
        accessorKey: "subcategory",
      },
      {
        header: "Товар",
        accessorKey: "sku",
      },
      ...forecastCol,
    ],
    [forecastCol],
  )

  if (!data) return

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      // state={{
      //   columnVisibility: { subcategory: false },
      // }}
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
        maxSize: 350, //allow columns to get larger than default
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
          padding: "10px 5px",
        },
      }}
      muiTableBodyCellProps={{
        sx: {
          border: "none",
          boxSizing: "border-box",
          padding: "15px 5px",
        },
      }}
      //вся таблица
      muiTableProps={{
        sx: {
          fontSize: "24px",
          width: "100%",
          tableLayout: "fixed",
          // boxShadow: "none",
        },
      }}
      initialState={{
        columnPinning: {
          left: ["store", "group", "category", "subcategory", "sku"],
        },
      }}
      localization={MRT_Localization_RU}
    />
  )
}

export default ForecastTable
