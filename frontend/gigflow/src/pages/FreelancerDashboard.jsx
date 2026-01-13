import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, Search, FileText, Wallet, X, 
  DollarSign, Send, Clock, CheckCircle, XCircle, Eye
} from 'lucide-react';
import { Button, Badge, Input } from '../components/ui';
import { DashboardLayout, BrowseGigs } from '../components/shared';
import api from '../services/api';
import { getSocket } from '../services/socket';

/* ==========================================
   PLACE BID MODAL (Freelancer Only)
   ========================================== */
const PlaceBidModal = ({ gig, onClose, onBidPlaced }) => {
  const [form, setForm] = useState({ message: '', price: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.message || !form.price) {
      setError('All fields are required');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      await api.post('/bids', {
        gigId: gig._id || gig.id,
        message: form.message,
        price: Number(form.price),
      });
      onBidPlaced && onBidPlaced();
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to place bid');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white w-full max-w-lg border-4 border-black rounded-3xl p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg border-2 border-transparent hover:border-black transition-all"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-black uppercase mb-2 flex items-center gap-2">
          <Send className="w-6 h-6 bg-pink-400 border-2 border-black rounded-full p-0.5" />
          Place Your Bid
        </h2>
        
        <div className="mb-6 p-4 bg-gray-50 border-2 border-black rounded-xl">
          <h3 className="font-bold">{gig.title}</h3>
          <p className="text-sm text-gray-500 mt-1">Budget: <span className="font-black">${gig.budget || gig.price}</span></p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border-2 border-red-500 rounded-xl text-red-700 font-bold text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Your Price ($)" 
            type="number"
            placeholder="Enter your bid amount" 
            value={form.price}
            onChange={(value) => setForm({...form, price: value})}
            required
            min="1"
          />

          <Input 
            label="Your Proposal" 
            textarea
            placeholder="Explain why you're the best fit for this job..." 
            value={form.message}
            onChange={(value) => setForm({...form, message: value})}
            required
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Bid'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ==========================================
   GIG DETAIL MODAL (View Only for Freelancer)
   ========================================== */
const GigViewModal = ({ gig, onClose, onPlaceBid }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white w-full max-w-2xl border-4 border-black rounded-3xl p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg border-2 border-transparent hover:border-black transition-all"
        >
          <X size={24} />
        </button>

        <div className="mb-6">
          <Badge text={gig.status} color={gig.status === 'open' ? 'bg-green-300' : 'bg-yellow-300'} />
          <h2 className="text-2xl font-black uppercase mt-3">{gig.title}</h2>
          
          {gig.ownerId?.name && (
            <p className="text-sm font-bold text-gray-400 mt-2">
              Posted by: {gig.ownerId.name}
            </p>
          )}
          
          <p className="text-gray-600 font-medium mt-4">{gig.description}</p>
          
          <div className="mt-6 p-4 bg-pink-50 border-2 border-black rounded-xl flex items-center justify-between">
            <span className="font-bold uppercase text-sm">Budget</span>
            <span className="font-black text-3xl text-pink-500">${gig.budget || gig.price}</span>
          </div>
        </div>

        {gig.status === 'open' && (
          <div className="border-t-2 border-black pt-6">
            <Button 
              variant="primary" 
              className="w-full"
              onClick={() => onPlaceBid(gig)}
            >
              <Send size={18} /> Place Bid on This Gig
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ==========================================
   MY BIDS TAB (Freelancer Only)
   ========================================== */
const MyBids = ({ bids, onRefresh }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'hired': return 'bg-green-300';
      case 'rejected': return 'bg-red-300';
      default: return 'bg-blue-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'hired': return <CheckCircle size={16} className="text-green-600" />;
      case 'rejected': return <XCircle size={16} className="text-red-600" />;
      default: return <Clock size={16} className="text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h1 className="text-3xl font-black uppercase mb-1">My Bids</h1>
        <p className="font-bold text-gray-500">Track your bid proposals.</p>
      </div>

      {bids.length === 0 ? (
        <div className="text-center py-20 border-4 border-dashed border-black/10 rounded-3xl">
          <p className="text-xl font-bold text-gray-400">You haven't placed any bids yet</p>
          <p className="text-sm text-gray-400 mt-2">Browse the marketplace to find work!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bids.map(bid => (
            <div 
              key={bid._id} 
              className={`bg-white border-2 border-black rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                bid.status === 'hired' ? 'border-green-500 bg-green-50' : 
                bid.status === 'rejected' ? 'border-red-300 bg-red-50 opacity-70' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getStatusIcon(bid.status)}
                    <Badge text={bid.status} color={getStatusColor(bid.status)} />
                  </div>
                  <h3 className="font-bold text-lg">{bid.gigId?.title || 'Gig'}</h3>
                  <p className="text-xs font-bold text-gray-400 mt-1">
                    Client: {bid.gigId?.ownerId?.name || 'Unknown'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-gray-400">Your Bid</div>
                  <span className="font-black text-xl">${bid.price}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 font-medium line-clamp-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                "{bid.message}"
              </p>

              {bid.status === 'hired' && (
                <div className="mt-4 p-3 bg-green-100 border-2 border-green-500 rounded-xl text-green-700 font-bold text-sm flex items-center gap-2">
                  <CheckCircle size={18} /> Congratulations! You got the job!
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ==========================================
   FREELANCER OVERVIEW TAB
   ========================================== */
const FreelancerOverview = ({ stats, recentBids, onGoToMarketplace }) => (
  <div className="space-y-8 animate-in fade-in">
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-black uppercase mb-1">Dashboard</h1>
        <p className="font-bold text-gray-500">Welcome back! Keep hustling.</p>
      </div>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <div key={i} className={`p-6 border-2 border-black rounded-xl ${stat.color} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
          <div className="text-xs font-black uppercase opacity-60 mb-1">{stat.label}</div>
          <div className="text-4xl font-black">{stat.value}</div>
        </div>
      ))}
    </div>

    {/* Quick Actions */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white border-2 border-black rounded-xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="font-black uppercase text-lg mb-4">Recent Bids</h3>
        
        {recentBids.length === 0 ? (
          <div className="text-center py-8">
            <p className="font-bold text-gray-400 mb-4">No bids placed yet</p>
            <Button variant="accent" onClick={onGoToMarketplace}>Find Work</Button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentBids.slice(0, 3).map(bid => (
              <div 
                key={bid._id} 
                className="p-3 border-2 border-black rounded-lg bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <Badge 
                      text={bid.status} 
                      color={bid.status === 'hired' ? 'bg-green-300' : bid.status === 'rejected' ? 'bg-red-300' : 'bg-blue-300'} 
                    />
                    <h4 className="font-bold text-sm mt-1 line-clamp-1">{bid.gigId?.title}</h4>
                  </div>
                  <span className="font-black">${bid.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-pink-100 border-2 border-black rounded-xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="font-black uppercase text-lg mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <Button variant="primary" className="w-full" onClick={onGoToMarketplace}>
            <Search size={18} /> Browse Open Gigs
          </Button>
          <Button variant="secondary" className="w-full">
            <FileText size={18} /> View My Bids
          </Button>
        </div>
      </div>
    </div>
  </div>
);

/* ==========================================
   FREELANCER DASHBOARD PAGE
   ========================================== */
const FreelancerDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedGig, setSelectedGig] = useState(null);
  const [bidModalGig, setBidModalGig] = useState(null);
  const [myBids, setMyBids] = useState([]);
  const [allGigs, setAllGigs] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const links = [
    { id: 'overview', icon: LayoutGrid, label: 'Overview' },
    { id: 'marketplace', icon: Search, label: 'Find Work' },
    { id: 'my-bids', icon: FileText, label: 'My Bids' },
    { id: 'wallet', icon: Wallet, label: 'Earnings' },
  ];

  useEffect(() => {
    fetchMyBids();
    fetchAllGigs();
  }, []);

  // Realtime: listen for "hired" events
  useEffect(() => {
    const socket = getSocket();

    const onHired = (payload) => {
      const message = `You have been hired for ${payload.gigTitle}!`;
      setNotifications((prev) => [
        { id: `${Date.now()}-${Math.random()}`, message },
        ...prev,
      ]);
      // Refresh bids so UI updates without reload
      fetchMyBids();
    };

    socket.on("hired", onHired);

    return () => {
      socket.off("hired", onHired);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMyBids = async () => {
    try {
      const response = await api.get('/bids/my-bids');
      setMyBids(response.data.data.bids || []);
    } catch (error) {
      console.error('Error fetching my bids:', error);
    }
  };

  const fetchAllGigs = async () => {
    try {
      const response = await api.get('/gigs');
      setAllGigs(response.data.data.gigs || []);
    } catch (error) {
      console.error('Error fetching gigs:', error);
    }
  };

  const handleViewGig = (gig) => {
    setSelectedGig(gig);
  };

  const handlePlaceBid = (gig) => {
    setSelectedGig(null);
    setBidModalGig(gig);
  };

  const stats = [
    { label: 'Pending Bids', value: myBids.filter(b => b.status === 'pending').length, color: 'bg-blue-300' },
    { label: 'Hired', value: myBids.filter(b => b.status === 'hired').length, color: 'bg-green-300' },
    { label: 'Total Bids', value: myBids.length, color: 'bg-purple-300' },
  ];

  return (
    <>
      {/* Toast notifications */}
      <div className="fixed top-4 right-4 z-[9999] space-y-3">
        {notifications.slice(0, 3).map((n) => (
          <div
            key={n.id}
            className="bg-green-200 border-2 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 max-w-sm"
          >
            <div className="font-black uppercase text-sm mb-1">Hired</div>
            <div className="font-bold text-black">{n.message}</div>
            <button
              className="mt-3 text-xs font-black underline"
              onClick={() =>
                setNotifications((prev) => prev.filter((x) => x.id !== n.id))
              }
            >
              Dismiss
            </button>
          </div>
        ))}
      </div>

      <DashboardLayout
        role="freelancer"
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        links={links}
        onLogout={onLogout}
      >
        {activeTab === 'overview' && (
          <FreelancerOverview 
            stats={stats}
            recentBids={myBids}
            onGoToMarketplace={() => setActiveTab('marketplace')}
          />
        )}
        
        {activeTab === 'marketplace' && (
          <BrowseGigs 
            gigs={allGigs} 
            onViewGig={handleViewGig}
            onPlaceBid={handlePlaceBid}
            isFreelancer={true}
          />
        )}

        {activeTab === 'my-bids' && (
          <MyBids 
            bids={myBids}
            onRefresh={fetchMyBids}
          />
        )}

        {activeTab === 'wallet' && (
          <div className="text-center py-20 border-4 border-dashed border-black/10 rounded-3xl">
            <p className="text-xl font-bold text-gray-400 uppercase">Earnings Coming Soon</p>
          </div>
        )}
      </DashboardLayout>

      {/* Modals */}
      {selectedGig && (
        <GigViewModal 
          gig={selectedGig}
          onClose={() => setSelectedGig(null)}
          onPlaceBid={handlePlaceBid}
        />
      )}

      {bidModalGig && (
        <PlaceBidModal 
          gig={bidModalGig}
          onClose={() => setBidModalGig(null)}
          onBidPlaced={() => {
            fetchMyBids();
          }}
        />
      )}
    </>
  );
};

export default FreelancerDashboard;
