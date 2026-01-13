import {
  Sparkles,
  Star,
  Zap,
  DollarSign,
  LayoutGrid,
  Heart,
  MessageCircle,
  Code,
  PenTool,
  Music,
  Video,
  Search,
  Smile,
  Globe,
  Shield,
  Clock,
  Award,
} from "lucide-react";
import { 
  Button,
  Badge,
  GigCard,
  CategoryCard,
  FreelancerCard,
  FeatureCard,
} from "./ui";

/* ==========================================
   STATIC DATA (For Marketplace)
   ========================================== */
const MARKETPLACE_DATA = {
  categories: [
    { id: 1, name: "Graphics", count: "4.2k", icon: PenTool, color: "bg-pink-300" },
    { id: 2, name: "Programming", count: "2.8k", icon: Code, color: "bg-blue-300" },
    { id: 3, name: "Marketing", count: "1.5k", icon: Zap, color: "bg-yellow-300" },
    { id: 4, name: "Video & FX", count: "900+", icon: Video, color: "bg-purple-300" },
    { id: 5, name: "Music/Audio", count: "650+", icon: Music, color: "bg-green-300" },
    { id: 6, name: "Writing", count: "1.1k", icon: MessageCircle, color: "bg-orange-300" },
  ],
  gigs: [
    { 
      id: 1, 
      title: "I will design a retro 90s pop-art logo for your brand",
      seller: "Pixie_Dust",
      price: 45, 
      rating: 4.9, 
      reviews: 120,
      imageColor: "bg-yellow-200",
      tag: "BEST SELLER",
      tagColor: "bg-red-400 text-white",
    },
    { 
      id: 2, 
      title: "I will build a brutalist React landing page",
      seller: "Dev_Dave",
      price: 200, 
      rating: 5.0, 
      reviews: 45,
      imageColor: "bg-blue-200",
      tag: "PRO",
      tagColor: "bg-black text-white",
    },
    { 
      id: 3, 
      title: "I will write punchy copy for your startup launch",
      seller: "WordSmith",
      price: 80, 
      rating: 4.8, 
      reviews: 210,
      imageColor: "bg-pink-200",
      tag: null,
      tagColor: "",
    },
    { 
      id: 4, 
      title: "I will compose a lo-fi beat for your stream",
      seller: "Beat_Maker",
      price: 35, 
      rating: 4.7, 
      reviews: 89,
      imageColor: "bg-purple-200",
      tag: "NEW",
      tagColor: "bg-green-400 text-black",
    },
  ],
  freelancers: [
    { id: 1, name: "Sarah J.", role: "UI Designer", rate: "$60/hr", color: "bg-orange-300" },
    { id: 2, name: "Mike T.", role: "Full Stack", rate: "$85/hr", color: "bg-cyan-300" },
    { id: 3, name: "Alex R.", role: "Animator", rate: "$55/hr", color: "bg-lime-300" },
  ],
  features: [
    { icon: Globe, title: "Global Talent", text: "Connect with pros from 120+ countries.", color: "bg-blue-100" },
    { icon: Shield, title: "Secure Pay", text: "Money held in escrow until you approve.", color: "bg-green-100" },
    { icon: Clock, title: "24/7 Support", text: "Real humans ready to help anytime.", color: "bg-pink-100" },
    { icon: Award, title: "Quality Work", text: "Vetted freelancers with proven track records.", color: "bg-yellow-100" },
  ],
};

/* ==========================================
   SECTION COMPONENTS
   ========================================== */

// Navbar Component
const Navbar = ({ onLogin, onSignup }) => (
  <>
    <div className="bg-black text-white p-2 text-center font-bold text-sm uppercase tracking-widest">
      ⚡ Flash Sale: 0% Fees for New Clients this week ⚡
    </div>
    <nav className="p-4 border-b-4 border-black bg-white sticky top-0 z-50 flex gap-4 items-center shadow-md">
      <div className="font-black text-2xl mr-4 flex items-center gap-2 italic">
        <div className="w-10 h-10 bg-pink-500 border-2 border-black rounded-full flex items-center justify-center text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Sparkles size={20} />
        </div>
        GigFlow
      </div>
      <div className="flex-1 hidden md:flex relative">
        <input 
          type="text" 
          placeholder="What service are you looking for?" 
          className="w-full p-3 pl-10 border-2 border-black rounded-2xl bg-gray-50 focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all font-bold placeholder:text-gray-400"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
      </div>
      <div className="flex gap-3">
        <Button variant="ghost" onClick={onLogin} className="hidden sm:flex text-sm font-bold">
          Sign In
        </Button>
        <Button onClick={onSignup} className="py-2 text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          Join Now
        </Button>
      </div>
    </nav>
  </>
);
      
// Hero Section
const HeroSection = ({ onHire, onWork }) => (
      <div className="bg-pink-200 border-4 border-black rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
      <Badge color="yellow">Marketplace V2.0</Badge>
      <h2 className="text-4xl md:text-5xl font-black uppercase mt-4 mb-4 leading-tight italic">
        Find the perfect Pro <br /> for your project.
          </h2>
          <p className="font-bold text-lg mb-6 text-gray-800">
            Access a global network of vetted talent ready to work on your schedule.
          </p>
          <div className="flex gap-3 flex-wrap">
        {["Web Design", "SEO", "Logo", "Python"].map((tag) => (
          <span
            key={tag}
            className="px-4 py-1 bg-white border-2 border-black rounded-full font-bold text-sm cursor-pointer hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            {tag}
          </span>
            ))}
          </div>
      <div className="flex gap-4 mt-8">
        <Button onClick={onHire}>Hire Talent</Button>
        <Button variant="secondary" onClick={onWork}>
          Find Work
        </Button>
      </div>
        </div>
        <div className="w-full md:w-1/3 aspect-square bg-white border-4 border-black rounded-2xl flex items-center justify-center relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="absolute inset-0 bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:16px_16px] opacity-20 rounded-2xl"></div>
          <Zap className="w-24 h-24 text-yellow-400 fill-yellow-400 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] animate-pulse" />
        </div>
      </div>
);

// Categories Section
const CategoriesSection = () => (
      <div>
        <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
          <LayoutGrid className="w-5 h-5" /> Popular Categories
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {MARKETPLACE_DATA.categories.map((cat) => (
        <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
);

// Trending Gigs Section
const TrendingGigsSection = () => (
      <div>
        <div className="flex justify-between items-end mb-6">
      <h3 className="text-2xl font-black uppercase flex items-center gap-2 italic">
            <Star className="fill-black" /> Trending Services
          </h3>
      <a href="#" className="font-bold underline decoration-2 hover:text-pink-600">
        View All
      </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MARKETPLACE_DATA.gigs.map((gig) => (
        <GigCard key={gig.id} gig={gig} />
          ))}
        </div>
      </div>
);

// Top Talent Section
const TopTalentSection = () => (
      <div className="bg-yellow-50 border-4 border-black rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Smile size={120} />
        </div>
    <h3 className="text-2xl font-black uppercase mb-6 relative z-10 italic">
      Meet the Top Talent
    </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {MARKETPLACE_DATA.freelancers.map((f) => (
        <FreelancerCard key={f.id} freelancer={f} />
          ))}
        </div>
      </div>
);

// Features Section
const FeaturesSection = () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
        {MARKETPLACE_DATA.features.map((feat, idx) => (
      <FeatureCard key={idx} feature={feat} />
        ))}
      </div>
);

// Footer Section
const Footer = () => (
  <div className="bg-black text-white p-8 md:p-12 mt-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
        <h2 className="text-4xl font-black uppercase mb-4 italic flex items-center gap-3">
          <div className="w-12 h-12 bg-pink-500 border-2 border-white rounded-full flex items-center justify-center">
            <Sparkles size={24} />
          </div>
          GigFlow
        </h2>
        <p className="text-gray-400 max-w-sm font-bold">
          The marketplace for the bold. Join the revolution of work today.
        </p>
          </div>
          <div>
            <h4 className="font-black uppercase text-gray-500 mb-4">Categories</h4>
            <ul className="space-y-2 font-bold text-sm">
          <li className="hover:text-pink-400 cursor-pointer transition-colors">
            Graphics & Design
          </li>
          <li className="hover:text-pink-400 cursor-pointer transition-colors">
            Digital Marketing
          </li>
          <li className="hover:text-pink-400 cursor-pointer transition-colors">
            Writing & Translation
          </li>
          <li className="hover:text-pink-400 cursor-pointer transition-colors">
            Video & Animation
          </li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase text-gray-500 mb-4">Community</h4>
            <ul className="space-y-2 font-bold text-sm">
          <li className="hover:text-blue-400 cursor-pointer transition-colors">Events</li>
          <li className="hover:text-blue-400 cursor-pointer transition-colors">Blog</li>
          <li className="hover:text-blue-400 cursor-pointer transition-colors">Forum</li>
          <li className="hover:text-blue-400 cursor-pointer transition-colors">Podcast</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-bold uppercase text-gray-500">
      <p>&copy; 2024 GigFlow Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
        <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
        <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
        <span className="hover:text-white cursor-pointer transition-colors">Sitemap</span>
      </div>
    </div>
  </div>
);

/* ==========================================
   MAIN HOME COMPONENT
   ========================================== */
const Home = ({ onLogin, onSignup }) => {
  return (
    <div className="min-h-screen w-full font-sans bg-pink-50 text-black">
      <Navbar onLogin={onLogin} onSignup={onSignup} />

      <div className="p-6 md:p-8 lg:p-12 space-y-12 max-w-7xl mx-auto">
        <HeroSection onHire={onSignup} onWork={onSignup} />
        <CategoriesSection />
        <TrendingGigsSection />
        <TopTalentSection />
        <FeaturesSection />
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;
