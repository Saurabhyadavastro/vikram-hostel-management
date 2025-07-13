import React, { useState } from 'react';
import { Clock, Calendar, Tag, Bell, Search } from 'lucide-react';
import { newsData } from '../data/hostelsData';

const NewsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const newsTypes = [
    { value: 'all', label: 'All News' },
    { value: 'announcement', label: 'Announcements' },
    { value: 'mess', label: 'Mess Updates' },
    { value: 'admission', label: 'Admissions' },
    { value: 'event', label: 'Events' },
    { value: 'payment', label: 'Payments' },
  ];

  const filteredNews = newsData.filter(news => {
    const matchesFilter = selectedFilter === 'all' || news.type === selectedFilter;
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement':
        return 'bg-purple-100 text-purple-600';
      case 'mess':
        return 'bg-green-100 text-green-600';
      case 'admission':
        return 'bg-blue-100 text-blue-600';
      case 'event':
        return 'bg-pink-100 text-pink-600';
      case 'payment':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest News & Updates
          </h1>
          <p className="text-lg text-gray-600">
            Stay informed with the latest hostel news, announcements, and updates
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search news..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {newsTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedFilter(type.value)}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    selectedFilter === type.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news, index) => (
            <div
              key={news.id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(news.type)}`}>
                    {news.type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(news.priority)}`}>
                    {news.priority.charAt(0).toUpperCase() + news.priority.slice(1)}
                  </span>
                </div>
                {news.priority === 'high' && (
                  <Bell className="text-red-500" size={16} />
                )}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                {news.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {news.content}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  <span>{new Date(news.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>
                    {Math.ceil(Math.abs(new Date().getTime() - new Date(news.date).getTime()) / (1000 * 60 * 60 * 24))} days ago
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Bell size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No news found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find more results.
            </p>
          </div>
        )}

        {/* Subscribe Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h3>
          <p className="text-gray-600 mb-6">
            Get the latest hostel news and announcements delivered to your email
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button className="btn-primary">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            You can unsubscribe at any time
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsPage; 