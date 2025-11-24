// src/components/Demo/DemoDashboard.tsx
import { useEffect, useState } from "react";
import { Home, LogIn } from "lucide-react";

import ProjectCard from "../Dashboard/ProjectCard";
import LoginForm from "../Auth/LoginForm";
import DemoProjectDetail from "./DemoProjectDetail";

import { demoCustomer, demoProjects } from "../../demo/demoData";
import { Database } from "../../lib/database.types";

type Project = Database["public"]["Tables"]["projects"]["Row"];
type Customer = Database["public"]["Tables"]["customers"]["Row"];

export default function DemoDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    setCustomer(demoCustomer);
    setProjects(demoProjects);
  }, []);

  // If user clicks "Log In", show the login form
  if (showLogin) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Home className="text-blue-600" />
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Home Renovation Portal (Demo)
              </h1>
              <p className="text-sm text-slate-600">
                Public demo view — click projects to explore. Log in to manage real data.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowLogin(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <LogIn size={18} />
            Log In
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Demo customer summary */}
        {customer && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-1">
              {customer.full_name}
            </h2>
            <p className="text-slate-600 text-sm">{customer.address}</p>
            <p className="text-slate-600 text-sm">{customer.email}</p>
          </div>
        )}

        {/* Demo detail navigation */}
        {selected ? (
          <DemoProjectDetail
            project={selected}
            onBack={() => setSelected(null)}
          />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelected(project)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
