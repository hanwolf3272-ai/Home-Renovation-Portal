import { Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { Database } from '../../lib/database.types';

type Project = Database['public']['Tables']['projects']['Row'];

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const statusConfig = {
  planning: { label: 'Planning', color: 'bg-slate-100 text-slate-700' },
  in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700' },
  on_hold: { label: 'On Hold', color: 'bg-amber-100 text-amber-700' },
};

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const status = statusConfig[project.status];

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            {project.title}
          </h3>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
            {status.label}
          </span>
        </div>
      </div>

      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
        {project.description || 'No description provided'}
      </p>

      <div className="space-y-2">
        {project.start_date && (
          <div className="flex items-center text-sm text-slate-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Started: {new Date(project.start_date).toLocaleDateString()}</span>
          </div>
        )}
        {project.estimated_completion && (
          <div className="flex items-center text-sm text-slate-600">
            <TrendingUp className="w-4 h-4 mr-2" />
            <span>Est. Completion: {new Date(project.estimated_completion).toLocaleDateString()}</span>
          </div>
        )}
        {project.budget > 0 && (
          <div className="flex items-center text-sm text-slate-600">
            <DollarSign className="w-4 h-4 mr-2" />
            <span>Budget: ${project.budget.toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}
