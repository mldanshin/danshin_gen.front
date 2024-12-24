"use client"

import dict from "@/dictionaries/ru/error.json";
import { useEffect } from "react";
 
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>{dict.message}</h2>
      <button
        onClick={
          () => reset()
        }
      >
        {dict.again}
      </button>
    </div>
  )
}
