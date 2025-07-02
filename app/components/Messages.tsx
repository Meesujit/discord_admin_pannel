'use client'
import React, { useState } from 'react';
import { MessageSquare, Trash, User } from 'lucide-react';

interface Message {
  id: number;
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
  channel: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      username: 'AdminUser',
      avatar: '👑',
      content: 'Welcome to the server! Please read the rules in #rules channel.',
      timestamp: '2024-06-25 14:30',
      channel: '#general'
    },
    {
      id: 2,
      username: 'GamerPro',
      avatar: '🎮',
      content: 'Anyone want to play some games tonight?',
      timestamp: '2024-06-25 14:25',
      channel: '#gaming'
    },
    {
      id: 3,
      username: 'ArtistVibe',
      avatar: '🎨',
      content: 'Just finished my latest artwork! Check it out in #showcase',
      timestamp: '2024-06-25 14:20',
      channel: '#artwork'
    },
    {
      id: 4,
      username: 'CodeNinja',
      avatar: '💻',
      content: 'Has anyone worked with React hooks before? Need some help.',
      timestamp: '2024-06-25 14:15',
      channel: '#programming'
    },
    {
      id: 5,
      username: 'MusicLover',
      avatar: '🎵',
      content: 'What is everyone listening to today?',
      timestamp: '2024-06-25 14:10',
      channel: '#music'
    },
    {
      id: 6,
      username: 'ModeratorJohn',
      avatar: '🛡️',
      content: 'Reminder: Keep discussions civil and follow the community guidelines.',
      timestamp: '2024-06-25 14:05',
      channel: '#announcements'
    }
  ]);

  const deleteMessage = (messageId: number) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
  };

  const getChannelColor = (channel: string) => {
    const colors = {
      '#general': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      '#gaming': 'bg-green-500/20 text-green-400 border-green-500/30',
      '#artwork': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      '#programming': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      '#music': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      '#announcements': 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return colors[channel as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
          <p className="text-gray-400">Monitor and manage server messages</p>
        </div>
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-discord-accent" />
          <span className="text-white font-medium">{messages.length} messages</span>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="glass-card p-6 hover:border-discord-accent/40 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 bg-discord-gradient rounded-full flex items-center justify-center text-lg flex-shrink-0">
                {message.avatar}
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-white">{message.username}</h3>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getChannelColor(message.channel)}`}>
                    {message.channel}
                  </span>
                  <span className="text-gray-400 text-sm">{message.timestamp}</span>
                </div>
                <p className="text-gray-300 leading-relaxed">{message.content}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => deleteMessage(message.id)}
                  className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                  title="Delete message"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {messages.length === 0 && (
        <div className="glass-card p-12 text-center">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No messages found</h3>
          <p className="text-gray-400">All messages have been cleared or no messages exist yet.</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
