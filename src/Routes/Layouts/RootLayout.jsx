import Header from "@/Components/shared/Header";
import Sidebar from "@/Components/shared/Sidebar";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const { Auth } = useSelector((state) => state);
  const trialExpired = Auth?.trialEndsAt ? (new Date() > new Date(Auth.trialEndsAt)) : false;
  const locked = !Auth?.isSubscribed && trialExpired;
  return (
    <div className="flex  h-screen font-sans text-gray-800 overflow-hidden" style={{ backgroundColor: '#e6f7f9' }}>
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden ">
        <Header />

        <div className="flex-1 outlet-scroll  overflow-y-auto p-2" style={{ backgroundColor: '#f0fbfc' }}>
          {!locked && <Outlet />}
          {locked && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="max-w-md w-full bg-white border rounded-lg p-6 text-center shadow">
                <h2 className="text-xl font-semibold mb-2">Subscribe to continue</h2>
                <p className="text-gray-600 mb-4">Your free trial has ended. Unlock all features by subscribing.</p>
                <Link to="/subscription">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Subscribe</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
