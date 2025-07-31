import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Con vert prisma object to regular object
export function convertToPlainObject<T>(value: T): T {
  console.log("value: ", value);
  return JSON.parse(JSON.stringify(value));
}

// Format number width decimal plaaces
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}
