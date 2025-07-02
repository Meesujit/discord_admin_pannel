import React from 'react'
import {
  Users,
  UserIcon,
  BarChart3,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  isCollapsed: boolean
  onToggleCollapse: () => void
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange,
  isCollapsed,
  onToggleCollapse,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'roles', label: 'Roles', icon: UserIcon },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ]

  return (
   <div className={`fixed left-0 top-0 h-screen bg-discord-darker/50 backdrop-blur-sm border-r border-discord-accent/20 transition-all duration-300 z-30 ${
      isCollapsed ? 'w-16' : 'w-64'
    } lg:relative lg:z-auto`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-discord-accent/20">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-discord-gradient rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DS</span>
                </div>
                <div>
                  <h2 className="font-semibold text-white">Discord Server</h2>
                  <p className="text-xs text-gray-400">Admin Dashboard</p>
                </div>
              </div>
            )}
            <button
              onClick={onToggleCollapse}
              className="p-1 hover:bg-discord-accent/10 rounded transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`nav-item w-full text-left ${
                    activeSection === item.id ? 'active' : 'text-gray-300'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-discord-accent/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-discord-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">A</span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin User</p>
                <p className="text-xs text-gray-400 truncate">admin@discord.com</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
