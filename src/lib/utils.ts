import { clsx, type ClassValue } from "clsx"
import { error } from "console";
import Papa from 'papaparse'
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


//handle csv file input

export function handleTransactionInput(e: React.ChangeEvent<HTMLInputElement>) {
  const file: File | undefined = e.target.files?.[0];

  if (!file) return;
  if (!file.name.endsWith(".csv")) {
    throw new Error("Only csv files are accepted.")
    return
  }

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {},
    error: (err) => {}
  })

}
