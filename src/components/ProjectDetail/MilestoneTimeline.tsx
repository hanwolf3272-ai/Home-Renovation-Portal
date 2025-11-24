import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { Database } from '../../lib/database.types';

type Milestone = Database['public']['Tables']['milestones']['Row'];

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

const statusConfig = {
  pending: { icon: Circle, color: 'text-slate-400' },
  in_progress: { icon: Clock, color: 'text-blue-600' },
  completed: { icon: CheckCircle2, color: 'text-green-600' },
};

export default function MilestoneTimeline({ milestones }: MilestoneTimelineProps) {
  if (milestones.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        No milestones defined yet
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {milestones.map((milestone, index) => {
        const config = statusConfig[milestone.status];
        const Icon = config.icon;
        const isLast = index === milestones.length - 1;

        return (
          <div key={milestone.id} className="relative">
            {!isLast && (
              <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-slate-200" />
            )}

            <div className="flex gap-4">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center ${
                milestone.status === 'completed' ? 'border-green-600' :
                milestone.status === 'in_progress' ? 'border-blue-600' :
                'border-slate-300'
              }`}>
                <Icon className={`w-4 h-4 ${config.color}`} />
              </div>

              <div className="flex-1 pb-8">
                <div className="bg-white rounded-lg border border-slate-200 p-4 hover:border-slate-300 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-slate-900">
                      {milestone.title}
                    </h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      milestone.status === 'completed' ? 'bg-green-100 text-green-700' :
                      milestone.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {milestone.status === 'in_progress' ? 'In Progress' :
                       milestone.status === 'completed' ? 'Completed' : 'Pending'}
                    </span>
                  </div>

                  {milestone.description && (
                    <p className="text-sm text-slate-600 mb-3">
                      {milestone.description}
                    </p>
                  )}

                  <div className="flex gap-4 text-xs text-slate-500">
                    {milestone.due_date && (
                      <div>
                        <span className="font-medium">Due:</span>{' '}
                        {new Date(milestone.due_date).toLocaleDateString()}
                      </div>
                    )}
                    {milestone.completed_date && (
                      <div>
                        <span className="font-medium">Completed:</span>{' '}
                        {new Date(milestone.completed_date).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
