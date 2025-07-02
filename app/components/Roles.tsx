'use client'
import React, { useState } from 'react';
import { UserIcon, Edit } from 'lucide-react';

interface Role {
  id: number;
  name: string;
  color: string;
  memberCount: number;
  permissions: string[];
  isVisible: boolean;
}

const Roles = () => {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 1,
      name: 'Admin',
      color: '#ef4444',
      memberCount: 3,
      permissions: ['Manage Server', 'Manage Members', 'Manage Channels'],
      isVisible: true
    },
    {
      id: 2,
      name: 'Moderator',
      color: '#3b82f6',
      memberCount: 8,
      permissions: ['Manage Messages', 'Kick Members', 'Timeout Members'],
      isVisible: true
    },
    {
      id: 3,
      name: 'VIP',
      color: '#8b5cf6',
      memberCount: 25,
      permissions: ['Priority Speaker', 'Skip Queue'],
      isVisible: true
    },
    {
      id: 4,
      name: 'Member',
      color: '#6b7280',
      memberCount: 1211,
      permissions: ['Send Messages', 'Connect to Voice'],
      isVisible: true
    },
    {
      id: 5,
      name: 'Muted',
      color: '#ef4444',
      memberCount: 5,
      permissions: [],
      isVisible: false
    }
  ]);

  const [editingRole, setEditingRole] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  const toggleRoleVisibility = (roleId: number) => {
    setRoles(roles.map(role => 
      role.id === roleId 
        ? { ...role, isVisible: !role.isVisible }
        : role
    ));
  };

  const startEditing = (role: Role) => {
    setEditingRole(role.id);
    setEditName(role.name);
  };

  const saveEdit = (roleId: number) => {
    setRoles(roles.map(role => 
      role.id === roleId 
        ? { ...role, name: editName }
        : role
    ));
    setEditingRole(null);
    setEditName('');
  };

  const cancelEdit = () => {
    setEditingRole(null);
    setEditName('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Roles</h1>
        <p className="text-gray-400">Manage server roles and permissions</p>
      </div>

      {/* Roles List */}
      <div className="space-y-4">
        {roles.map((role) => (
          <div
            key={role.id}
            className="glass-card p-6 hover:border-discord-accent/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: role.color }}
                />
                {editingRole === role.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="bg-discord-dark border border-discord-accent/20 rounded px-2 py-1 text-white focus:border-discord-accent focus:outline-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(role.id);
                        if (e.key === 'Escape') cancelEdit();
                      }}
                      autoFocus
                    />
                    <button
                      onClick={() => saveEdit(role.id)}
                      className="px-3 py-1 bg-discord-accent text-white rounded text-sm hover:opacity-90 transition-opacity"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold text-white">{role.name}</h3>
                    <button
                      onClick={() => startEditing(role)}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <UserIcon className="w-4 h-4" />
                  <span className="text-sm">{role.memberCount} members</span>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={role.isVisible}
                    onChange={() => toggleRoleVisibility(role.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-discord-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-discord-accent"></div>
                  <span className="ml-3 text-sm text-gray-300">
                    {role.isVisible ? 'Visible' : 'Hidden'}
                  </span>
                </label>
              </div>
            </div>

            {/* Permissions */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Permissions:</h4>
              <div className="flex flex-wrap gap-2">
                {role.permissions.length > 0 ? (
                  role.permissions.map((permission, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-discord-accent/20 text-discord-accent rounded-md text-xs font-medium border border-discord-accent/30"
                    >
                      {permission}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-xs italic">No permissions</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Role Button */}
      <button className="discord-button w-full py-3">
        + Add New Role
      </button>
    </div>
  );
};

export default Roles;
