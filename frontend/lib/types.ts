export interface Community {
  id: string;
  name: string;
  description: string;
}

export type ExpenseStatus = "verified" | "flagged";

export interface Expense {
  id: string;
  item: string;
  quantity: number;
  unitPrice: number;
  supplier: string;
  supplierTaxId?: string;
  invoiceNumber?: string;
  total: number;
  status: ExpenseStatus;
  flagReason?: string;
}

export type Milestone = {
  name: string;
  status: "done" | "in_progress" | "pending";
};

export type ProjectStatus = "in_progress" | "complete" | "flagged";

export interface Official {
  id: string;
  name: string;
  department: string;
  nepotismScore: number; // 0-100
}

export interface Contractor {
  id: string;
  name: string;
  registrationNumber: string;
  trustScore: number; // 0-100
  onTimeRate: number; // percent
  budgetAdherence: number; // percent
}

export interface Project {
  id: string;
  communityId: string;
  description: string;
  budget: number;
  spent: number;
  contractorId: string;
  officialId: string;
  status: ProjectStatus;
  officialStatus: string;
  communityStatus: string;
  communityVotePercent?: number;
  expenses: Expense[];
  milestones: Milestone[];
}

export interface Report {
  id: string;
  projectId: string;
  category: string;
  description: string;
  contact?: string;
  status: "pending" | "reviewed";
  createdAt: string;
}