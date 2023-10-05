import React from "react"
import Select from "react-select"
type FilterMultiSelectProps = {
  placeholder: string
  options: string[]
  values?: string[] | null
  onChange: (arg: any) => void
}

function FilterMultiSelect({
  placeholder,
  options,
  values,
  onChange,
}: FilterMultiSelectProps) {
  const filterOptions = options.map((option) => ({
    value: option,
    label: option,
  }))
  const filterValue = values?.map((value) => ({
    value: value,
    label: value,
  }))

  return (
    <Select
      options={filterOptions}
      value={filterValue}
      isMulti={true}
      closeMenuOnSelect={false}
      onChange={onChange}
      maxMenuHeight={500}
      placeholder={placeholder}
      // isClearable={false}
      styles={{
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: "#003C96",
          padding: "10px",
        }),
        //Весь контейнер
        control: (baseStyles, state) => ({
          ...baseStyles,
          width: 291,
          height: 65,
          boxSizing: "border-box",
          display: "flex",
          position: "relative",
          alignItems: "center",
          borderRadius: 10,
          borderColor: "#003C96",

          ":hover": {
            borderColor: "#003C96",
          },
        }),
        //Контейнер с выбранными значениями
        valueContainer: (baseStyles, state) => ({
          ...baseStyles,
          display: "flex",
          gap: 2,
          padding: 0,
          height: "60px",
          maxWidth: "99%",
          overflowY: "scroll",
          "::-webkit-scrollbar": {
            width: "3px",
            height: "0px",
          },
          "::-webkit-scrollbar-track": {
            background: "none",
            margin: "8px",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#003C96",
            borderRadius: "5px",
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: "#003C96",
          },
        }),
        //Выбранное значение
        multiValue: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: "#FFF1D1",
          fontSize: 16,
          textAlign: "center",
          borderRadius: 17,
          maxWidth: "85%",
        }),
        //Контейнер выпадающего списка
        menu: (baseStyles, state) => ({
          ...baseStyles,
          zIndex: 9999,
        }),
        //Выпадающий список
        menuList: (baseStyles, state) => ({
          ...baseStyles,
          fontSize: 15,
          padding: 0,
          zIndex: 5,
          "::-webkit-scrollbar": {
            width: "7px",
            height: "0px",
          },
          "::-webkit-scrollbar-track": {
            background: "none",
            margin: "5px",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#FFFFFF",
            border: "solid 3px #E1E1E1",
            borderRadius: "5px",
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: "#FFFFFF",
          },
        }),
        dropdownIndicator(base, props) {
          return {
            ...base,
            padding: 0,
            color: "#003C96",
          }
        },
        clearIndicator(base, props) {
          return {
            ...base,
            padding: 0,
            color: "#003C96",
            alignSelf: "flex-start",
          }
        },
        indicatorsContainer(base, props) {
          return {
            ...base,
            height: "100%",
            position: "absolute",
            right: "10px",
            zIndex: "22",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }
        },
        indicatorSeparator(base, props) {
          return {
            ...base,
            display: "none",
          }
        },
      }}
    />
  )
}

export default FilterMultiSelect
