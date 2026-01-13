import { Zap, Briefcase, PenTool, ArrowRight, X } from "lucide-react";

const RoleSelectPage = ({ onSelectRole, onBack, isSignup = false }) => {
  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="bg-white border-4 border-black p-8 rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full relative">
        <button
          onClick={onBack}
          className="absolute top-6 right-6 hover:bg-gray-100 p-2 rounded-lg border-2 border-transparent hover:border-black transition-all"
        >
          <X size={24} />
        </button>

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-pink-500 border-2 border-black rounded-full flex items-center justify-center text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Zap size={32} />
          </div>
        </div>

        <h2 className="text-3xl font-black text-center uppercase mb-2">
          {isSignup ? "Join GigFlow" : "Welcome Back"}
        </h2>
        <p className="text-center font-bold text-gray-500 mb-8">
          Choose your role to continue
        </p>

        <div className="space-y-4">
          <button
            onClick={() => onSelectRole("client")}
            className="w-full p-4 border-2 border-black rounded-xl bg-yellow-200 hover:bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all flex items-center gap-4 group"
          >
            <div className="bg-white p-2 rounded-lg border-2 border-black">
              <Briefcase size={24} />
            </div>
            <div className="text-left">
              <div className="font-black text-lg uppercase">Client</div>
              <div className="text-xs font-bold text-gray-600">
                I want to hire talent
              </div>
            </div>
            <ArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={() => onSelectRole("freelancer")}
            className="w-full p-4 border-2 border-black rounded-xl bg-pink-200 hover:bg-pink-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all flex items-center gap-4 group"
          >
            <div className="bg-white p-2 rounded-lg border-2 border-black">
              <PenTool size={24} />
            </div>
            <div className="text-left">
              <div className="font-black text-lg uppercase">Freelancer</div>
              <div className="text-xs font-bold text-gray-600">
                I want to find work
              </div>
            </div>
            <ArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        <div className="mt-8 text-center text-sm font-bold text-gray-400">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => onBack("login")}
                className="text-black underline cursor-pointer hover:text-pink-500"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              New here?{" "}
              <button
                onClick={() => onBack("signup")}
                className="text-black underline cursor-pointer hover:text-pink-500"
              >
                Create an Account
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleSelectPage;

