import React from 'react'
import style from './Qualities.module.css'

export const Qualities = ({ qualities }) => {
  return (
    <div>
      {qualities.map((qual) => (
        <span
          className={style.Qualities + ' ' + `${style[qual.color]}`}
          key={qual._id}
        >
          {qual.name}
        </span>
      ))}
    </div>
  )
}
