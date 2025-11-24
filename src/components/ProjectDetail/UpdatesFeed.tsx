import { MessageSquare, AlertCircle, CheckCircle, Camera } from 'lucide-react';
import { Database } from '../../lib/database.types';

type ProjectUpdate = Database['public']['Tables']['project_updates']['Row'];

interface UpdatesFeedProps {
  updates: ProjectUpdate[];
}

const updateTypeConfig = {
  progress: { icon: MessageSquare, color: 'bg-blue-100 text-blue-700', label: 'Progress Update' },
  issue: { icon: AlertCircle, color: 'bg-amber-100 text-amber-700', label: 'Issue' },
  completion: { icon: CheckCircle, color: 'bg-green-100 text-green-700', label: 'Completion' },
  photo: { icon: Camera, color: 'bg-slate-100 text-slate-700', label: 'Photo Update' },
};

export default function UpdatesFeed({ updates }: UpdatesFeedProps) {
  if (updates.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        No updates yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {updates.map((update) => {
        const config = updateTypeConfig[update.update_type];
        const Icon = config.icon;

        return (
          <div key={update.id} className="bg-white rounded-lg border border-slate-200 p-5 hover:border-slate-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full ${config.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">
                      {update.title}
                    </h4>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {new Date(update.created_at).toLocaleDateString()}
                  </div>
                </div>

                {update.content && (
                  <p className="text-sm text-slate-600 mb-3 whitespace-pre-wrap">
                    {update.content}
                  </p>
                )}

                {update.image_url && (
                  <div className="mt-3">
                    <img
                      src={update.image_url}
                      alt={update.title}
                      className="rounded-lg max-w-full h-auto border border-slate-200"
                    />
                  </div>
                )}

                <div className="mt-3 text-xs text-slate-500">
                  Posted by {update.created_by}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
