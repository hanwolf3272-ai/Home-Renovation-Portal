export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string;
          user_id: string | null;
          full_name: string;
          email: string;
          phone: string;
          address: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          full_name: string;
          email: string;
          phone?: string;
          address?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          full_name?: string;
          email?: string;
          phone?: string;
          address?: string;
          created_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          customer_id: string;
          title: string;
          description: string;
          status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
          start_date: string | null;
          estimated_completion: string | null;
          actual_completion: string | null;
          budget: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          title: string;
          description?: string;
          status?: 'planning' | 'in_progress' | 'completed' | 'on_hold';
          start_date?: string | null;
          estimated_completion?: string | null;
          actual_completion?: string | null;
          budget?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          title?: string;
          description?: string;
          status?: 'planning' | 'in_progress' | 'completed' | 'on_hold';
          start_date?: string | null;
          estimated_completion?: string | null;
          actual_completion?: string | null;
          budget?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      milestones: {
        Row: {
          id: string;
          project_id: string;
          title: string;
          description: string;
          status: 'pending' | 'in_progress' | 'completed';
          due_date: string | null;
          completed_date: string | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          title: string;
          description?: string;
          status?: 'pending' | 'in_progress' | 'completed';
          due_date?: string | null;
          completed_date?: string | null;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          title?: string;
          description?: string;
          status?: 'pending' | 'in_progress' | 'completed';
          due_date?: string | null;
          completed_date?: string | null;
          order_index?: number;
          created_at?: string;
        };
      };
      project_updates: {
        Row: {
          id: string;
          project_id: string;
          title: string;
          content: string;
          update_type: 'progress' | 'issue' | 'completion' | 'photo';
          image_url: string;
          created_at: string;
          created_by: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          title: string;
          content?: string;
          update_type?: 'progress' | 'issue' | 'completion' | 'photo';
          image_url?: string;
          created_at?: string;
          created_by?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          title?: string;
          content?: string;
          update_type?: 'progress' | 'issue' | 'completion' | 'photo';
          image_url?: string;
          created_at?: string;
          created_by?: string;
        };
      };
    };
  };
};
