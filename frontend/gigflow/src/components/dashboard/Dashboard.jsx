import { User, Zap, LogOut, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Card, Button, Badge } from "../ui";

const Dashboard = ({ user, onLogout }) => (
  <div className="min-h-screen bg-pink-100">
    {/* Navigation */}
    <nav className="bg-white border-b-2 border-black px-6 py-4 flex justify-between items-center sticky top-0 z-40">
      <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic">
        <div className="w-10 h-10 bg-pink-500 text-white flex items-center justify-center border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Sparkles className="w-5 h-5" />
        </div>
        GigFlow
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <div className="text-sm font-black">{user.name}</div>
          <div className="text-xs font-bold text-gray-500 uppercase">Member</div>
        </div>
        <Button variant="secondary" onClick={onLogout} className="px-4 py-2 text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          LOGOUT
        </Button>
      </div>
    </nav>

    {/* Main Content */}
    <div className="max-w-6xl mx-auto p-6 animate-in">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="p-6 text-center">
          <div className="w-24 h-24 mx-auto bg-pink-200 border-2 border-black rounded-full flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <User className="w-12 h-12 text-pink-700" />
          </div>
          <h2 className="text-2xl font-black text-black mb-1 uppercase italic">
            {user.name}
          </h2>
          <p className="text-gray-600 font-medium mb-4">{user.email}</p>
          <Badge color="green">VERIFIED</Badge>
        </Card>

        {/* Security Card */}
        <Card className="md:col-span-2 p-6">
          <h3 className="text-xl font-black text-black mb-6 uppercase italic border-b-2 border-black pb-3">
            Security Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-100 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-400 border-2 border-black rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="font-black text-black uppercase">Password Strength</p>
                  <p className="text-sm font-medium text-gray-600">
                    Your password meets all requirements
                  </p>
                </div>
              </div>
              <Badge color="green">STRONG</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-100 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-400 border-2 border-black rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="font-black text-black uppercase">2FA Status</p>
                  <p className="text-sm font-medium text-gray-600">
                    Two-factor authentication is disabled
                  </p>
                </div>
              </div>
              <Button variant="secondary" className="text-sm py-2 px-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                ENABLE
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <Card className="p-6 bg-blue-100">
          <div className="text-5xl font-black text-black mb-2">0</div>
          <div className="text-sm font-bold text-gray-700 uppercase">Active Gigs</div>
        </Card>
        <Card className="p-6 bg-green-100">
          <div className="text-5xl font-black text-black mb-2">$0</div>
          <div className="text-sm font-bold text-gray-700 uppercase">Total Earned</div>
        </Card>
        <Card className="p-6 bg-purple-100">
          <div className="text-5xl font-black text-black mb-2">0</div>
          <div className="text-sm font-bold text-gray-700 uppercase">Completed</div>
        </Card>
      </div>
    </div>
  </div>
);

export default Dashboard;
