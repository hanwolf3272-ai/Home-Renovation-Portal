/*
  # Home Renovation Customer Portal Schema

  1. New Tables
    - `customers`
      - `id` (uuid, primary key) - Unique customer identifier
      - `user_id` (uuid) - Links to auth.users for authentication
      - `full_name` (text) - Customer's full name
      - `email` (text) - Customer's email address
      - `phone` (text) - Customer's phone number
      - `address` (text) - Customer's property address
      - `created_at` (timestamptz) - Account creation timestamp
      
    - `projects`
      - `id` (uuid, primary key) - Unique project identifier
      - `customer_id` (uuid, foreign key) - References customers
      - `title` (text) - Project title/name
      - `description` (text) - Detailed project description
      - `status` (text) - Current status: planning, in_progress, completed, on_hold
      - `start_date` (date) - Project start date
      - `estimated_completion` (date) - Estimated completion date
      - `actual_completion` (date) - Actual completion date
      - `budget` (numeric) - Project budget amount
      - `created_at` (timestamptz) - Project creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
      
    - `milestones`
      - `id` (uuid, primary key) - Unique milestone identifier
      - `project_id` (uuid, foreign key) - References projects
      - `title` (text) - Milestone title
      - `description` (text) - Milestone description
      - `status` (text) - Status: pending, in_progress, completed
      - `due_date` (date) - Milestone due date
      - `completed_date` (date) - Actual completion date
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz) - Creation timestamp
      
    - `project_updates`
      - `id` (uuid, primary key) - Unique update identifier
      - `project_id` (uuid, foreign key) - References projects
      - `title` (text) - Update title
      - `content` (text) - Update content/description
      - `update_type` (text) - Type: progress, issue, completion, photo
      - `image_url` (text) - Optional image URL
      - `created_at` (timestamptz) - Update creation timestamp
      - `created_by` (text) - Who created the update (contractor/admin)

  2. Security
    - Enable RLS on all tables
    - Customers can only view their own data
    - Only authenticated customers can access their projects
    - Read-only access for customers (contractors update via admin interface)
*/

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  address text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text DEFAULT '',
  status text DEFAULT 'planning' CHECK (status IN ('planning', 'in_progress', 'completed', 'on_hold')),
  start_date date,
  estimated_completion date,
  actual_completion date,
  budget numeric(12, 2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create milestones table
CREATE TABLE IF NOT EXISTS milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text DEFAULT '',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  due_date date,
  completed_date date,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create project_updates table
CREATE TABLE IF NOT EXISTS project_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text DEFAULT '',
  update_type text DEFAULT 'progress' CHECK (update_type IN ('progress', 'issue', 'completion', 'photo')),
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  created_by text DEFAULT 'Contractor'
);

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_updates ENABLE ROW LEVEL SECURITY;

-- Customers policies: users can only view their own customer record
CREATE POLICY "Customers can view own profile"
  ON customers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Projects policies: customers can only view their own projects
CREATE POLICY "Customers can view own projects"
  ON projects FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT id FROM customers WHERE user_id = auth.uid()
    )
  );

-- Milestones policies: customers can view milestones for their projects
CREATE POLICY "Customers can view own project milestones"
  ON milestones FOR SELECT
  TO authenticated
  USING (
    project_id IN (
      SELECT p.id FROM projects p
      JOIN customers c ON c.id = p.customer_id
      WHERE c.user_id = auth.uid()
    )
  );

-- Project updates policies: customers can view updates for their projects
CREATE POLICY "Customers can view own project updates"
  ON project_updates FOR SELECT
  TO authenticated
  USING (
    project_id IN (
      SELECT p.id FROM projects p
      JOIN customers c ON c.id = p.customer_id
      WHERE c.user_id = auth.uid()
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_customers_user_id ON customers(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_customer_id ON projects(customer_id);
CREATE INDEX IF NOT EXISTS idx_milestones_project_id ON milestones(project_id);
CREATE INDEX IF NOT EXISTS idx_project_updates_project_id ON project_updates(project_id);
CREATE INDEX IF NOT EXISTS idx_project_updates_created_at ON project_updates(created_at DESC);