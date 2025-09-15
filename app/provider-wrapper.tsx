'use client'

import { ReactElement, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ConfigProvider } from '@/contexts/ConfigContext'
import ThemeCustomization from '@/themes'

// ==================== || PROVIDER WRAPPER || ==================== //

export default function ProviderWrapper({
  children,
}: {
  children: ReactElement
}) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <ConfigProvider>
      <ThemeCustomization>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeCustomization>
    </ConfigProvider>
  )
}
