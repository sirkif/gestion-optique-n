import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../sidebar/sidebar'

interface MainLayoutProps {
  children: React.ReactNode
  activeKey: string
  onSelect: (key: string) => void
}

export function MainLayout({ children, activeKey, onSelect }: MainLayoutProps) {
  const navigate = useNavigate()
  console.log(activeKey)

  const handleLogout = () => {
    console.log('Logging out...')
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeKey={activeKey}
        onSelect={onSelect}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  )
}
