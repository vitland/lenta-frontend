import { MaterialReactTable } from "material-react-table"
import { type MRT_ColumnDef } from "material-react-table" // If using TypeScript (optional, but recommended)
import { useEffect, useMemo, useState } from "react"



//a more complex example with nested data
const data: DataType[] = [
  {
    store: "sdf23",
    sku: "dsf345",
    group: "string",
    cat: "string",
    subcat: "string",
    forecast_date: "2023-09-01",
    forecast: {
      "2023-09-01": 1,
      "2023-09-02": 3,
      "2023-09-03": 7,
      "2023-09-04": 9,
      "2023-09-05": 0,
    },
  },
]

const Table = () => {
  //a more complex example with nested data
  //if using TypeScript, you can use the MRT_ColumnDef type to strongly type your columns (Recommended)

  const forecastCol = Object.keys(data[0].forecast).map((key) => ({
    header: key,
    accessorFn: (originalRow) => originalRow.forecast[key],
  }))

  const columns = useMemo<MRT_ColumnDef<DataType>[]>(
    () => [
      {
        header: "Магазин",
        accessorKey: "store", //using accessorKey dot notation to access nested data
      },
      {
        header: "Группа",
        accessorKey: "group",
      },
      {
        header: "Категория",
        accessorKey: "cat",
      },
      {
        header: "Подкатегория",
        accessorKey: "subcat",
      },
      {
        header: "Товар",
        accessorKey: "sku",
      },
      ...forecastCol,
      // {
      //   header: "Last Name",
      //   accessorFn: (originalRow) => originalRow.name.lastName, //alternative to accessorKey, using accessorFn
      //   id: "lastName",
      // },
    ],
    [],
  )

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowSelection //enable some features
      enableColumnOrdering
      enableGlobalFilter={false} //turn off a feature
      enablePagination={false}
      enableBottomToolbar={false}
    />
  )
}

export default Table
