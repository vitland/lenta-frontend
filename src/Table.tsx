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
          size: 40,
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
        size: 50,
      },
      {
        header: "Группа",
        accessorKey: "group",
        size: 50,
      },
      {
        header: "Категория",
        accessorKey: "cat",
        size: 50,
      },
      {
        header: "Подкатегория",
        accessorKey: "subcat",
        size: 50,
      },
      {
        header: "Товар",
        accessorKey: "sku",
        size: 50,
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
        enableRowSelection //enable some features
        enableColumnOrdering={false}
        enableColumnFilters={false}
        enablePinning={true}
        enableColumnActions={false}
        enableGlobalFilter={false} //turn off a feature
        // enablePagination={false}
        // enableBottomToolbar={false}
        enableTopToolbar={false}
        //вся таблица
        muiTablePaperProps={{
          sx: {
            width: "100%",
            bgcolor: "blue",
          },
        }}
        //КОнтейнер с данными
        muiTableContainerProps={{
          sx: {
            width: "100%",
            bgcolor: "red",
          },
        }}
        muiTableProps={{
          sx: {
            width: "100%",
            border: "1px solid rgba(81, 81, 81, 1)",
            bgcolor: "green",
          },
        }}
        initialState={{
          columnPinning: { left: ["store", "group", "cat", "subcat", "sku"] },
        }}
        localization={MRT_Localization_RU}
      />
    )
  )
}

export default Table
