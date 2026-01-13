import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button, Badge } from '../ui';

const BrowseGigs = ({ gigs, onViewGig, onPlaceBid, isFreelancer = false }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGigs = gigs.filter(gig => 
    gig.status === 'open' && 
    gig.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase mb-1">Marketplace</h1>
          <p className="font-bold text-gray-500">Browse open opportunities.</p>
        </div>
        
        {/* Search Bar */}
        <div className="w-full md:w-96 relative">
          <input 
            type="text" 
            placeholder="Search jobs by title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border-2 border-black rounded-xl bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none font-bold transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Gigs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGigs.length === 0 ? (
          <div className="col-span-full text-center py-20 border-4 border-dashed border-black/10 rounded-3xl">
            <p className="text-xl font-bold text-gray-400">
              {searchTerm ? `No gigs found matching "${searchTerm}"` : 'No open gigs available'}
            </p>
          </div>
        ) : (
          filteredGigs.map(gig => (
            <GigCard 
              key={gig.id || gig._id} 
              gig={gig} 
              onView={onViewGig}
              onBid={onPlaceBid}
              isFreelancer={isFreelancer}
            />
          ))
        )}
      </div>
    </div>
  );
};

const GigCard = ({ gig, onView, onBid, isFreelancer }) => {
  const colors = ['bg-yellow-200', 'bg-blue-200', 'bg-pink-200', 'bg-purple-200', 'bg-green-200'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="bg-white border-2 border-black rounded-xl overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 cursor-pointer flex flex-col h-full relative group">
      {gig.tag && (
        <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-black border-2 border-black rounded ${gig.tagColor || 'bg-yellow-300'} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10`}>
          {gig.tag}
        </span>
      )}
      
      <div className={`h-32 ${gig.imageColor || randomColor} border-b-2 border-black flex items-center justify-center`}>
        <span className="font-black text-4xl opacity-10 uppercase tracking-widest">GIG</span>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg leading-tight line-clamp-2 mb-2">{gig.title}</h3>
        
        <p className="text-sm font-medium text-gray-500 line-clamp-3 mb-4 flex-1">
          {gig.description || "No description provided for this gig."}
        </p>

        {gig.ownerId?.name && (
          <p className="text-xs font-bold text-gray-400 mb-2">
            Posted by: {gig.ownerId.name}
          </p>
        )}

        <div className="mt-auto pt-4 border-t-2 border-gray-100 flex items-center justify-between">
          <div className="text-xs font-bold uppercase text-gray-400">Budget</div>
          <div className="font-black text-xl">${gig.budget || gig.price}</div>
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button 
            variant="secondary" 
            className="flex-1 py-2 text-sm"
            onClick={() => onView && onView(gig)}
          >
            Details
          </Button>
          {isFreelancer && (
            <Button 
              variant="primary" 
              className="flex-1 py-2 text-sm"
              onClick={() => onBid && onBid(gig)}
            >
              Place Bid
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseGigs;

