import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, DollarSign, TrendingUp, Home } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Database } from '../../lib/database.types';
import MilestoneTimeline from './MilestoneTimeline';
import UpdatesFeed from './UpdatesFeed';

type Project = Database['public']['Tables']['projects']['Row'];
type Milestone = Database['public']['Tables']['milestones']['Row'];
type ProjectUpdate = Database['public']['Tables']['project_updates']['Row'];

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
}

const statusConfig = {
  planning: { label: 'Planning', color: 'bg-slate-100 text-slate-700' },
  in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700' },
  on_hold: { label: 'On Hold', color: 'bg-amber-100 text-amber-700' },
};

export default function ProjectDetail({ projectId, onBack }: ProjectDetailProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
  const [activeTab, setActiveTab] = useState<'milestones' | 'updates'>('milestones');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjectData();
  }, [projectId]);

  const loadProjectData = async () => {
    try {
      const [
        { data: projectData },
        { data: milestonesData },
        { data: updatesData }
      ] = await Promise.all([
        supabase.from('projects').select('*').eq('id', projectId).maybeSingle(),
        supabase.from('milestones').select('*').eq('project_id', projectId).order('order_index'),
        supabase.from('project_updates').select('*').eq('project_id', projectId).order('created_at', { ascending: false })
      ]);

      setProject(projectData);
      setMilestones(milestonesData || []);
      setUpdates(updatesData || []);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !project) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  const status = statusConfig[project.status];
  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const totalMilestones = milestones.length;
  const progress = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Projects</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-3">
                {project.title}
              </h1>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                {status.label}
              </span>
            </div>
            <Home className="w-12 h-12 text-slate-300" />
          </div>

          {project.description && (
            <p className="text-slate-600 mb-6">
              {project.description}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {project.start_date && (
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                <Calendar className="w-5 h-5 text-slate-600" />
                <div>
                  <div className="text-xs text-slate-500 mb-1">Start Date</div>
                  <div className="font-semibold text-slate-900">
                    {new Date(project.start_date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}

            {project.estimated_completion && (
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-slate-600" />
                <div>
                  <div className="text-xs text-slate-500 mb-1">Est. Completion</div>
                  <div className="font-semibold text-slate-900">
                    {new Date(project.estimated_completion).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}

            {project.budget > 0 && (
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-slate-600" />
                <div>
                  <div className="text-xs text-slate-500 mb-1">Budget</div>
                  <div className="font-semibold text-slate-900">
                    ${project.budget.toLocaleString()}
                  </div>
                </div>
              </div>
            )}
          </div>

          {totalMilestones > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Overall Progress</span>
                <span className="text-sm font-medium text-slate-900">
                  {completedMilestones} of {totalMilestones} milestones
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('milestones')}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activeTab === 'milestones'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Milestones ({milestones.length})
              </button>
              <button
                onClick={() => setActiveTab('updates')}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activeTab === 'updates'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Updates ({updates.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'milestones' ? (
              <MilestoneTimeline milestones={milestones} />
            ) : (
              <UpdatesFeed updates={updates} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
