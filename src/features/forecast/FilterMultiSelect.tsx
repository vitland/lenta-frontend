import React from "react"
import Select from "react-select"
type FilterMultiSelectProps = {
  id: string
  options: string[]
  onChange: () => void
}

function FilterMultiSelect({ id, options, onChange }: FilterMultiSelectProps) {
  const filterOptions = options.map((option) => ({
    value: option,
    label: option,
  }))

  return (
    <Select
      options={filterOptions}
      isMulti={true}
      closeMenuOnSelect={false}
      onChange={onChange}
    />
  )
}

export default FilterMultiSelect
