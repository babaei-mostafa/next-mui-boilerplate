"use client"

import { ConfigProvider } from '@/contexts/ConfigContext'
import ThemeCustomization from '@/themes'
import { ReactElement } from 'react'

// ==================== || PROVIDER WRAPPER || ==================== //

export default function ProviderWrapper({
  children,
}: {
  children: ReactElement
}) {
  return (
    <ConfigProvider>
      <ThemeCustomization>
        {children}
      </ThemeCustomization>
    </ConfigProvider>
  )
}
