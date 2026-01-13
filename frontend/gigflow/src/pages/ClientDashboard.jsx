import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, Search, Briefcase, Wallet, Plus, X, 
  DollarSign, Users, Clock, CheckCircle, Eye, Trash2
} from 'lucide-react';
import { Button, Badge, Input } from '../components/ui';
import { DashboardLayout, BrowseGigs } from '../components/shared';
import api from '../services/api';

/* ==========================================
   POST GIG MODAL (Client Only)
   ========================================== */
const PostGigModal = ({ onClose, onPost, isLoading }) => {
  const [form, setForm] = useState({ title: '', description: '', budget: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.budget) {
      setError('All fields are required');
      return;
    }
    setError('');
    await onPost({
      title: form.title,
      description: form.description,
      budget: Number(form.budget),
    });
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

        <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
          <Plus className="w-6 h-6 bg-yellow-400 border-2 border-black rounded-full p-0.5" />
          Post a New Gig
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border-2 border-red-500 rounded-xl text-red-700 font-bold text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Job Title" 
            placeholder="e.g. Redesign my startup's logo" 
            value={form.title}
            onChange={(value) => setForm({...form, title: value})}
            required
          />
          
          <Input 
            label="Budget ($)" 
            type="number"
            placeholder="500" 
            value={form.budget}
            onChange={(value) => setForm({...form, budget: value})}
            required
            min="1"
          />

          <Input 
            label="Description" 
            textarea
            placeholder="Describe the deliverables, timeline, and requirements..." 
            value={form.description}
            onChange={(value) => setForm({...form, description: value})}
            required
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="accent" disabled={isLoading}>
              {isLoading ? 'Posting...' : 'Post Job Now'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ==========================================
   GIG DETAIL MODAL (View Bids)
   ========================================== */
const GigDetailModal = ({ gig, onClose, onHire }) => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hiring, setHiring] = useState(null);

  useEffect(() => {
    const loadBids = async () => {
      try {
        const response = await api.get(`/bids/${gig._id || gig.id}`);
        setBids(response.data.data.bids || []);
      } catch (error) {
        console.error('Error fetching bids:', error);
      } finally {
        setLoading(false);
      }
    };
    loadBids();
  }, [gig]);


  const handleHire = async (bidId) => {
    setHiring(bidId);
    try {
      await api.patch(`/bids/${bidId}/hire`);
      onHire && onHire();
      onClose();
    } catch (error) {
      console.error('Error hiring:', error);
      alert(error.response?.data?.message || 'Failed to hire');
    } finally {
      setHiring(null);
    }
  };

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
          <p className="text-gray-500 font-medium mt-2">{gig.description}</p>
          <div className="mt-4 flex items-center gap-4">
            <span className="font-black text-2xl text-pink-500">${gig.budget || gig.price}</span>
            <span className="text-sm font-bold text-gray-400">Budget</span>
          </div>
        </div>

        <div className="border-t-2 border-black pt-6">
          <h3 className="font-black uppercase mb-4 flex items-center gap-2">
            <Users size={20} /> Bids Received ({bids.length})
          </h3>

          {loading ? (
            <div className="text-center py-8 font-bold text-gray-400">Loading bids...</div>
          ) : bids.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
              <p className="font-bold text-gray-400">No bids yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {bids.map(bid => (
                <div 
                  key={bid._id} 
                  className={`p-4 border-2 border-black rounded-xl ${
                    bid.status === 'hired' ? 'bg-green-100' : 
                    bid.status === 'rejected' ? 'bg-red-50 opacity-60' : 'bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-black">{bid.freelancerId?.name || 'Freelancer'}</span>
                      <Badge 
                        text={bid.status} 
                        color={
                          bid.status === 'hired' ? 'bg-green-400' : 
                          bid.status === 'rejected' ? 'bg-red-300' : 'bg-blue-300'
                        }
                        className="ml-2"
                      />
                    </div>
                    <span className="font-black text-lg">${bid.price}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-3">{bid.message}</p>
                  
                  {gig.status === 'open' && bid.status === 'pending' && (
                    <Button 
                      variant="accent" 
                      className="py-2 text-sm"
                      onClick={() => handleHire(bid._id)}
                      disabled={hiring === bid._id}
                    >
                      {hiring === bid._id ? 'Hiring...' : 'Hire This Freelancer'}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ==========================================
   MY POSTINGS TAB (Client Only)
   ========================================== */
const MyPostings = ({ gigs, onRefresh, onViewGig }) => {
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (gigId) => {
    if (!confirm('Are you sure you want to delete this gig?')) return;
    setDeleting(gigId);
    try {
      await api.delete(`/gigs/${gigId}`);
      onRefresh();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete gig');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h1 className="text-3xl font-black uppercase mb-1">My Postings</h1>
        <p className="font-bold text-gray-500">Jobs you've posted as a client.</p>
      </div>

      {gigs.length === 0 ? (
        <div className="text-center py-20 border-4 border-dashed border-black/10 rounded-3xl">
          <p className="text-xl font-bold text-gray-400">You haven't posted any gigs yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {gigs.map(gig => (
            <div 
              key={gig._id || gig.id} 
              className={`bg-white border-2 border-black rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                gig.status === 'assigned' ? 'border-green-500' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <Badge 
                    text={gig.status} 
                    color={gig.status === 'open' ? 'bg-green-300' : 'bg-yellow-300'} 
                  />
                  <h3 className="font-bold text-lg mt-2">{gig.title}</h3>
                </div>
                <span className="font-black text-xl">${gig.budget}</span>
              </div>
              
              <p className="text-sm text-gray-500 font-medium line-clamp-2 mb-4">
                {gig.description}
              </p>

              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  className="py-2 text-sm flex-1"
                  onClick={() => onViewGig(gig)}
                >
                  <Eye size={16} /> View Bids
                </Button>
                {gig.status === 'open' && (
                  <Button 
                    variant="danger" 
                    className="py-2 text-sm"
                    onClick={() => handleDelete(gig._id || gig.id)}
                    disabled={deleting === (gig._id || gig.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ==========================================
   CLIENT OVERVIEW TAB
   ========================================== */
const ClientOverview = ({ stats, recentGigs, onViewGig, onGoToMarketplace }) => (
  <div className="space-y-8 animate-in fade-in">
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-black uppercase mb-1">Dashboard</h1>
        <p className="font-bold text-gray-500">Welcome back! Here's your overview.</p>
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

    {/* Recent Postings */}
    <div className="bg-white border-2 border-black rounded-xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-black uppercase text-lg">Recent Postings</h3>
      </div>
      
      {recentGigs.length === 0 ? (
        <div className="text-center py-8">
          <p className="font-bold text-gray-400 mb-4">No gigs posted yet</p>
          <Button variant="accent" onClick={onGoToMarketplace}>Browse Marketplace</Button>
        </div>
      ) : (
        <div className="space-y-3">
          {recentGigs.slice(0, 3).map(gig => (
            <div 
              key={gig._id || gig.id} 
              className="p-4 border-2 border-black rounded-lg bg-gray-50 hover:bg-white transition-colors cursor-pointer"
              onClick={() => onViewGig(gig)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <Badge text={gig.status} color={gig.status === 'open' ? 'bg-green-300' : 'bg-yellow-300'} />
                  <h4 className="font-bold mt-1">{gig.title}</h4>
                </div>
                <span className="font-black">${gig.budget}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

/* ==========================================
   CLIENT DASHBOARD PAGE
   ========================================== */
const ClientDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedGig, setSelectedGig] = useState(null);
  const [myGigs, setMyGigs] = useState([]);
  const [allGigs, setAllGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const links = [
    { id: 'overview', icon: LayoutGrid, label: 'Overview' },
    { id: 'marketplace', icon: Search, label: 'Browse Gigs' },
    { id: 'my-gigs', icon: Briefcase, label: 'My Postings' },
    { id: 'wallet', icon: Wallet, label: 'Wallet' },
  ];

  useEffect(() => {
    fetchMyGigs();
    fetchAllGigs();
  }, []);

  const fetchMyGigs = async () => {
    try {
      const response = await api.get('/gigs/my-posts');
      setMyGigs(response.data.data.gigs || []);
    } catch (error) {
      console.error('Error fetching my gigs:', error);
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

  const handlePostGig = async (gigData) => {
    setIsLoading(true);
    try {
      await api.post('/gigs', gigData);
      setIsPostModalOpen(false);
      fetchMyGigs();
      fetchAllGigs();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to post gig');
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    { label: 'Active Gigs', value: myGigs.filter(g => g.status === 'open').length, color: 'bg-pink-300' },
    { label: 'Assigned', value: myGigs.filter(g => g.status === 'assigned').length, color: 'bg-green-300' },
    { label: 'Total Posted', value: myGigs.length, color: 'bg-yellow-300' },
  ];

  const headerActions = (
    <button 
      onClick={() => setIsPostModalOpen(true)}
      className="hidden md:flex px-4 py-2 bg-black text-white font-bold rounded-lg border-2 border-transparent hover:bg-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] active:shadow-none active:translate-y-0.5 transition-all"
    >
      + Post Gig
    </button>
  );

  return (
    <>
      <DashboardLayout
        role="client"
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        links={links}
        onLogout={onLogout}
        headerActions={headerActions}
      >
        {activeTab === 'overview' && (
          <ClientOverview 
            stats={stats}
            recentGigs={myGigs}
            onViewGig={setSelectedGig}
            onGoToMarketplace={() => setActiveTab('marketplace')}
          />
        )}
        
        {activeTab === 'marketplace' && (
          <BrowseGigs 
            gigs={allGigs} 
            onViewGig={setSelectedGig}
            isFreelancer={false}
          />
        )}

        {activeTab === 'my-gigs' && (
          <MyPostings 
            gigs={myGigs}
            onRefresh={fetchMyGigs}
            onViewGig={setSelectedGig}
          />
        )}

        {activeTab === 'wallet' && (
          <div className="text-center py-20 border-4 border-dashed border-black/10 rounded-3xl">
            <p className="text-xl font-bold text-gray-400 uppercase">Wallet Coming Soon</p>
          </div>
        )}
      </DashboardLayout>

      {/* Modals */}
      {isPostModalOpen && (
        <PostGigModal 
          onClose={() => setIsPostModalOpen(false)} 
          onPost={handlePostGig}
          isLoading={isLoading}
        />
      )}

      {selectedGig && (
        <GigDetailModal 
          gig={selectedGig}
          onClose={() => setSelectedGig(null)}
          onHire={() => {
            fetchMyGigs();
            fetchAllGigs();
          }}
        />
      )}
    </>
  );
};

export default ClientDashboard;
