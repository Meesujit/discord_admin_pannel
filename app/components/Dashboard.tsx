'use client'
import React from 'react';
import { Users, UserIcon, MessageSquare, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const page = () => {
  const metrics = [
    {
      title: 'Total Members',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Online Users',
      value: '342',
      change: '+5%',
      changeType: 'positive',
      icon: UserIcon,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Messages Today',
      value: '8,924',
      change: '+18%',
      changeType: 'positive',
      icon: MessageSquare,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Growth Rate',
      value: '23.5%',
      change: '+2.1%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const chartData = [
    { month: 'Jan', members: 850 },
    { month: 'Feb', members: 920 },
    { month: 'Mar', members: 980 },
    { month: 'Apr', members: 1050 },
    { month: 'May', members: 1120 },
    { month: 'Jun', members: 1247 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Overview of your Discord server performance</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.title}
              className="glass-card p-6 hover:border-discord-accent/40 transition-all duration-300 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${metric.color} shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  metric.changeType === 'positive' 
                    ? 'text-green-400 bg-green-400/10' 
                    : 'text-red-400 bg-red-400/10'
                }`}>
                  {metric.change}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{metric.value}</h3>
                <p className="text-gray-400 text-sm">{metric.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="glass-card p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">Member Growth</h2>
          <p className="text-gray-400">Server member growth over the last 6 months</p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="month" 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <Line 
                type="monotone" 
                dataKey="members" 
                stroke="#6366f1" 
                strokeWidth={3}
                dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#8b5cf6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default page;
