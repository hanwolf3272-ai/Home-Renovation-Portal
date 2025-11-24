// src/demo/demoData.ts
import { Database } from "../lib/database.types";

type Project = Database["public"]["Tables"]["projects"]["Row"];
type Customer = Database["public"]["Tables"]["customers"]["Row"];

export const demoCustomer: Customer = {
  id: "demo-customer-1",
  user_id: null,
  full_name: "Demo Homeowner",
  email: "demo@example.com",
  phone: "(555) 555-5555",
  address: "123 Demo Street, Fallbrook, CA",
  created_at: new Date().toISOString(),
};

export const demoProjects: Project[] = [
  {
    id: "demo-project-1",
    customer_id: demoCustomer.id,
    title: "Kitchen Remodel",
    description:
      "Full kitchen refresh with new cabinets, quartz countertops, and updated lighting.",
    status: "in_progress",
    start_date: "2025-10-01",
    estimated_completion: "2025-12-15",
    actual_completion: null,
    budget: 28000,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-project-2",
    customer_id: demoCustomer.id,
    title: "Master Bathroom Upgrade",
    description:
      "Replace shower tile, install frameless glass, new vanity, and fixtures.",
    status: "planning",
    start_date: null,
    estimated_completion: "2026-01-20",
    actual_completion: null,
    budget: 14500,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-project-3",
    customer_id: demoCustomer.id,
    title: "Backyard Patio + Turf",
    description:
      "Pour concrete patio, add artificial turf, irrigation touch-ups, and bistro lights.",
    status: "completed",
    start_date: "2025-07-10",
    estimated_completion: "2025-08-25",
    actual_completion: "2025-08-18",
    budget: 9200,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
