
'use client'
import React, { useState, useMemo } from 'react';
import { Users, UserIcon, Trash } from 'lucide-react';

interface Member {
  id: number;
  username: string;
  avatar: string;
  joinDate: string;
  role: string;
  status: 'online' | 'offline' | 'idle';
}

const Members = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 10;

  const mockMembers: Member[] = [
    { id: 1, username: 'AdminUser', avatar: '👑', joinDate: '2024-01-15', role: 'Admin', status: 'online' },
    { id: 2, username: 'ModeratorJohn', avatar: '🛡️', joinDate: '2024-02-01', role: 'Moderator', status: 'online' },
    { id: 3, username: 'GamerPro', avatar: '🎮', joinDate: '2024-03-12', role: 'Member', status: 'idle' },
    { id: 4, username: 'ArtistVibe', avatar: '🎨', joinDate: '2024-04-05', role: 'Member', status: 'offline' },
    { id: 5, username: 'CodeNinja', avatar: '💻', joinDate: '2024-05-20', role: 'VIP', status: 'online' },
    { id: 6, username: 'MusicLover', avatar: '🎵', joinDate: '2024-06-01', role: 'Member', status: 'online' },
    { id: 7, username: 'BookWorm', avatar: '📚', joinDate: '2024-06-10', role: 'Member', status: 'offline' },
    { id: 8, username: 'TechGuru', avatar: '⚡', joinDate: '2024-06-15', role: 'VIP', status: 'idle' },
    { id: 9, username: 'SportsFan', avatar: '⚽', joinDate: '2024-06-18', role: 'Member', status: 'online' },
    { id: 10, username: 'FoodieLife', avatar: '🍕', joinDate: '2024-06-20', role: 'Member', status: 'offline' },
    { id: 11, username: 'TravelBug', avatar: '✈️', joinDate: '2024-06-22', role: 'Member', status: 'online' },
    { id: 12, username: 'PhotoPro', avatar: '📸', joinDate: '2024-06-24', role: 'VIP', status: 'idle' },
  ];

  const roles = ['all', 'Admin', 'Moderator', 'VIP', 'Member'];

  const filteredMembers = useMemo(() => {
    return mockMembers.filter(member => {
      const matchesSearch = member.username.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === 'all' || member.role === selectedRole;
      return matchesSearch && matchesRole;
    });
  }, [searchTerm, selectedRole]);

  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const currentMembers = filteredMembers.slice(
    (currentPage - 1) * membersPerPage,
    currentPage * membersPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Moderator': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'VIP': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Members</h1>
          <p className="text-gray-400">Manage your server members</p>
        </div>
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-discord-accent" />
          <span className="text-white font-medium">{filteredMembers.length} members</span>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-discord-dark border border-discord-accent/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-discord-accent focus:outline-none"
            />
          </div>
          <div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-discord-dark border border-discord-accent/20 rounded-lg px-4 py-2 text-white focus:border-discord-accent focus:outline-none"
            >
              {roles.map(role => (
                <option key={role} value={role}>
                  {role === 'all' ? 'All Roles' : role}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-discord-accent/20">
                <th className="text-left p-4 font-medium text-gray-300">Member</th>
                <th className="text-left p-4 font-medium text-gray-300">Role</th>
                <th className="text-left p-4 font-medium text-gray-300">Join Date</th>
                <th className="text-left p-4 font-medium text-gray-300">Status</th>
                <th className="text-left p-4 font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentMembers.map((member) => (
                <tr key={member.id} className="border-b border-discord-accent/10 hover:bg-discord-accent/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-discord-gradient rounded-full flex items-center justify-center text-lg">
                          {member.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-discord-darker`}></div>
                      </div>
                      <span className="text-white font-medium">{member.username}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getRoleColor(member.role)}`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">{member.joinDate}</td>
                  <td className="p-4">
                    <span className="text-gray-300 capitalize">{member.status}</span>
                  </td>
                  <td className="p-4">
                    <button className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                      <Trash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-discord-accent/20 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-discord-accent text-white'
                    : 'text-gray-400 hover:bg-discord-accent/20'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;
