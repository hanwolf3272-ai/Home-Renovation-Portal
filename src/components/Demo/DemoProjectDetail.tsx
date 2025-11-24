// src/components/Demo/DemoProjectDetail.tsx
import { Database } from "../../lib/database.types";

type Project = Database["public"]["Tables"]["projects"]["Row"];

export default function DemoProjectDetail({
  project,
  onBack,
}: {
  project: Project;
  onBack: () => void;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <button
        onClick={onBack}
        className="text-sm text-blue-600 mb-4 hover:underline"
      >
        ← Back to projects
      </button>

      <h1 className="text-2xl font-semibold text-slate-900 mb-2">
        {project.title}
      </h1>

      {project.description && (
        <p className="text-slate-700 mb-4">{project.description}</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-lg p-4 border">
          <div className="text-xs text-slate-500">Status</div>
          <div className="text-lg font-medium text-slate-900">
            {project.status ?? "planning"}
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 border">
          <div className="text-xs text-slate-500">Budget</div>
          <div className="text-lg font-medium text-slate-900">
            {project.budget ? `$${project.budget.toLocaleString()}` : "—"}
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 border">
          <div className="text-xs text-slate-500">Start Date</div>
          <div className="text-lg font-medium text-slate-900">
            {project.start_date ?? "Not scheduled"}
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 border">
          <div className="text-xs text-slate-500">Estimated Completion</div>
          <div className="text-lg font-medium text-slate-900">
            {project.estimated_completion ?? "—"}
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 border">
          <div className="text-xs text-slate-500">Actual Completion</div>
          <div className="text-lg font-medium text-slate-900">
            {project.actual_completion ?? "—"}
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-6">
        Demo mode: public read-only detail view.
      </p>
    </div>
  );
}
