'use client'

import { useState } from 'react'
import Sidebar from '@/app/components/Sidebar'
import TopNavbar from '@/app/components/Topbar'
import Dashboard from '@/app/components/Dashboard'
import Members from '@/app/components/Members'
import Roles from '@/app/components/Roles'
import Messages from '@/app/components/Messages'

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />
      case 'members':
        return <Members />
      case 'roles':
        return <Roles />
      case 'messages':
        return <Messages />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-discord-dark text-white overflow-hidden">
      {/* Overlay for mobile */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main content */}
        <div className="flex flex-col h-screen flex-1 transition-all duration-300">
          <TopNavbar />
          <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
        </div>
      </div>
    </div>
  )
}
