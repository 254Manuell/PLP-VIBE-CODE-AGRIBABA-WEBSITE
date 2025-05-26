"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type Currency = "KES" | "USD"

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  convertPrice: (price: number, fromCurrency?: Currency) => number
  formatPrice: (price: number, fromCurrency?: Currency) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

// Mock exchange rate - in a real app, this would come from an API
const EXCHANGE_RATE = 150 // 1 USD = 150 KES

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("KES")

  const convertPrice = (price: number, fromCurrency: Currency = "KES"): number => {
    if (currency === fromCurrency) return price

    if (fromCurrency === "KES" && currency === "USD") {
      return price / EXCHANGE_RATE
    } else if (fromCurrency === "USD" && currency === "KES") {
      return price * EXCHANGE_RATE
    }

    return price
  }

  const formatPrice = (price: number, fromCurrency: Currency = "KES"): string => {
    const convertedPrice = convertPrice(price, fromCurrency)

    if (currency === "KES") {
      return `KES ${convertedPrice.toLocaleString("en-KE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
    } else {
      return `$${convertedPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
