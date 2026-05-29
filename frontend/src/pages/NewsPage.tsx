import React, { useState } from 'react';
import { Clock, Calendar, Bell, Search, Newspaper, ArrowRight, Mail } from 'lucide-react';
import { newsData } from '../data/hostelsData';

const NewsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const newsTypes = [
    { value: 'all', label: 'All Updates' },
    { value: 'announcement', label: 'Official' },
    { value: 'mess', label: 'Dining' },
    { value: 'admission', label: 'Housing' },
    { value: 'event', label: 'Activities' },
  ];

  const filteredNews = newsData.filter(news => {
    const matchesFilter = selectedFilter === 'all' || news.type === selectedFilter;
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-600 border-red-100';
      case 'medium': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 reveal-up">
           <div>
              <div className="inline-flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest mb-4">
                 <Newspaper size={18} /> Bulletin Board
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">
                News <span className="text-blue-600">&</span> Announcements
              </h1>
              <p className="text-lg text-slate-500 max-w-2xl font-medium">
                Stay updated with official communications regarding hostel admissions, dining schedules, and campus events.
              </p>
           </div>
           
           <div className="hidden lg:flex items-center gap-6 p-4 bg-white rounded-3xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                 <Bell size={24} className="animate-swing" />
              </div>
              <div>
                 <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Notification Frequency</p>
                 <p className="text-sm font-bold text-slate-900">3-5 Updates / Week</p>
              </div>
           </div>
        </div>

        {/* Filters and Search - Modern Toolbar */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-6 md:p-8 mb-12 reveal-up stagger-1">
          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-grow">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={22} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter by keyword or topic..."
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all font-bold text-slate-700"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {newsTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedFilter(type.value)}
                  className={`px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 border-2 ${
                    selectedFilter === type.value
                      ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                      : 'bg-white text-slate-400 border-slate-100 hover:border-blue-100 hover:text-blue-600'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredNews.map((news, index) => (
            <div
              key={news.id}
              className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500 reveal-up flex flex-col group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center justify-between mb-8">
                 <div className="flex gap-2">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-lg">
                      {news.type}
                    </span>
                    {news.priority === 'high' && (
                       <span className={`px-3 py-1 border rounded-lg text-[10px] font-black uppercase tracking-widest ${getPriorityStyle(news.priority)}`}>
                         Urgent
                       </span>
                    )}
                 </div>
                 <div className="w-2 h-2 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                {news.title}
              </h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10 flex-grow">
                {news.content}
              </p>

              <div className="pt-6 border-t border-slate-50 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-blue-600" />
                  <span>{new Date(news.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{Math.ceil(Math.abs(new Date().getTime() - new Date(news.date).getTime()) / (1000 * 60 * 60 * 24))} Days ago</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[3rem] shadow-sm border border-slate-100 reveal-up">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
               <Newspaper size={48} />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">No updates found</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-10 font-medium">
              Try broadening your search or switching categories to find what you're looking for.
            </p>
            <button onClick={() => {setSearchTerm(''); setSelectedFilter('all');}} className="btn-primary">
              View All News
            </button>
          </div>
        )}

        {/* Professional Subscription Banner */}
        <div className="mt-24 relative overflow-hidden rounded-[3rem] bg-slate-900 p-12 md:p-20 reveal-up">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 opacity-20 blur-[150px]"></div>
           <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                 <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Never miss a beat.</h2>
                 <p className="text-blue-200 text-lg font-medium opacity-80">Subscribe to our digital bulletin to receive official university announcements directly in your inbox.</p>
              </div>
              <div className="relative">
                 <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem]">
                    <div className="flex-grow flex items-center px-4 py-3">
                       <Mail className="text-blue-400 mr-3" />
                       <input 
                         type="email" 
                         placeholder="Enter your university email" 
                         className="w-full bg-transparent border-none focus:ring-0 text-white font-bold placeholder:text-blue-200/30"
                       />
                    </div>
                    <button className="btn-accent px-10 py-4 group">
                       Subscribe <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                 </div>
                 <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mt-6 ml-6">Standard GDPR Protected Communication</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
