'use client'

<<<<<<< HEAD
import { createContext, ReactElement, useEffect, useState } from 'react'
import config, { ThemeDirection, ThemeMode } from '@/config'
import { CustomizationProps } from '@/types/config'
=======
import config, { ThemeDirection, ThemeMode } from '@/config'
import useLocalStorage from '@/hooks/useLocalStorage'
import { CustomizationProps } from '@/types/config'
import { createContext, ReactElement, useEffect, useState } from 'react'
>>>>>>> 0343d73441b0ec20d38229b83ea6b77909e4bf1e

const initialState: CustomizationProps = {
  ...config,
  onChangeMode: () => {},
  onChangeDirection: () => {},
}

type ConfigProviderProps = {
  children: ReactElement
}

// ====================|| CONFIG CONTEXT & PROVIDER ||==================== //

const ConfigContext = createContext(initialState)

function ConfigProvider({ children }: ConfigProviderProps) {
  const [configState, setConfigState] =
    useState<CustomizationProps>(initialState)

  // ✅ Defer localStorage read to client
  useEffect(() => {
    const storedConfig = localStorage.getItem('beauty-clinic-config')
    if (storedConfig) {
      setConfigState(JSON.parse(storedConfig))
    }
  }, [])

  const onChangeMode = (mode: ThemeMode) => {
    const updated = { ...configState, mode }
    setConfigState(updated)
    localStorage.setItem('beauty-clinic-config', JSON.stringify(updated))
  }

  const onChangeDirection = (themeDirection: ThemeDirection) => {
    const updated = { ...configState, themeDirection }
    setConfigState(updated)
    localStorage.setItem('beauty-clinic-config', JSON.stringify(updated))
  }

  return (
    <ConfigContext.Provider
      value={{ ...configState, onChangeMode, onChangeDirection }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

export { ConfigContext, ConfigProvider }
