import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Dashboard from "./components/Dashboard/Dashboard";
import DemoDashboard from "./components/Demo/DemoDashboard";

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  return user ? <Dashboard /> : <DemoDashboard />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
