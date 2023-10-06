import { MaterialReactTable } from "material-react-table"
import { type MRT_ColumnDef } from "material-react-table" // If using TypeScript (optional, but recommended)
import { MRT_Localization_RU } from "material-react-table/locales/ru"
import { useEffect, useMemo, useState } from "react"
import { useAppSelector } from "./app/hooks"
import { selectAllForecasts } from "./features/forecast/forecastSlice"
import { TForecast } from "./types/types"

const Table = () => {
  const forecasts = useAppSelector(selectAllForecasts)
  const [forecastCol, setForecastCol] = useState<MRT_ColumnDef<TForecast>[]>([])

  useEffect(() => {
    if (forecasts) {
      const columns = Object.keys(forecasts[0].forecast.sales_units).map(
        (key) => ({
          header: key,
          accessorFn: (row: any) => row.forecast.sales_units[key],
          size: 100,
        }),
      )
      setForecastCol(columns)
    }
  }, [forecasts])

  const columns = useMemo<MRT_ColumnDef<TForecast>[]>(
    () => [
      {
        header: "Магазин",
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

  return (
    forecasts && (
      <MaterialReactTable
        columns={columns}
        data={forecasts}
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
        //вся таблица
        defaultColumn={{
          minSize: 50, //allow columns to get smaller than default
          maxSize: 250, //allow columns to get larger than default
          size: 100, //make columns wider by default
        }}
        //
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
        muiTableBodyCellProps={{
          sx: {
            border: "none",
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
        initialState={{
          columnPinning: {
            left: ["store", "group", "category", "subcategory", "sku"],
          },
        }}
        localization={MRT_Localization_RU}
      />
    )
  )
}

export default Table
