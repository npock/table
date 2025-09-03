import React from 'react'
import Select from 'react-select'
import styles from './MultiSelect.module.css'

export const MultiSelect = ({ name, onChange, defaultValue, options }) => {
  const handleSelectChange = (value) => {
    const fakeTarget = {
      target: {
        name,
        value,
      },
    }
    onChange(fakeTarget)
  }

  return (
    <div className={styles.MultiSelect}>
      <Select
        defaultValue={defaultValue}
        isMulti
        name={name}
        options={options}
        onChange={handleSelectChange}
      />
    </div>
  )
}
