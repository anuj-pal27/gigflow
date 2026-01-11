import {
  User,
  ShieldCheck,
  LogOut,
  CheckCircle2,
} from "lucide-react";
import { Card, Button } from "../ui";

const Dashboard = ({ user, onLogout }) => (
  <div className="w-full max-w-4xl mx-auto p-4 animate-in fade-in duration-700">
    <nav className="flex justify-between items-center mb-8 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-slate-800 dark:text-white">GigFlow</h1>
          <p className="text-xs text-green-500 font-medium flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />{" "}
            Secure Session
          </p>
        </div>
      </div>
      <Button onClick={onLogout} variant="secondary" className="w-auto px-6">
        <LogOut className="w-4 h-4" />
        Sign Out
      </Button>
    </nav>

    <div className="grid md:grid-cols-3 gap-6">
      <Card className="col-span-3 md:col-span-1 p-6 text-center">
        <div className="w-20 h-20 mx-auto bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
          <User className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
          {user.name}
        </h2>
        <p className="text-slate-500 text-sm mb-4">{user.email}</p>
        <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium">
          Verified User
        </div>
      </Card>

      <Card className="col-span-3 md:col-span-2 p-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
          Security Overview
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  Password Strength
                </p>
                <p className="text-xs text-slate-500">
                  Your password meets all complexity requirements
                </p>
              </div>
            </div>
            <span className="text-green-600 text-sm font-bold">Strong</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  2FA Status
                </p>
                <p className="text-xs text-slate-500">
                  Two-factor authentication is currently disabled
                </p>
              </div>
            </div>
            <Button variant="secondary" className="w-auto py-1.5 px-3 text-xs">
              Enable
            </Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

export default Dashboard;

