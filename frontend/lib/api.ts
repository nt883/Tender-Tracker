import { communities, projects, officials, contractors, reports } from "./mockData";
import { Community, Project, Official, Contractor, Report } from "./types";

// This file simulates API calls using mock data.
// Once the real backend endpoints exist (see docs/api-contract.md),
// replace each function body with a real fetch() call —
// nothing that imports these functions needs to change.

export async function getCommunities(): Promise<Community[]> {
  return communities;
}

export async function getCommunity(id: string): Promise<Community | undefined> {
  return communities.find((c) => c.id === id);
}

export async function getProjectsByCommunity(communityId: string): Promise<Project[]> {
  return projects.filter((p) => p.communityId === communityId);
}

export async function getProject(id: string): Promise<Project | undefined> {
  return projects.find((p) => p.id === id);
}

export async function getAllProjects(): Promise<Project[]> {
  return projects;
}

export async function getOfficial(id: string): Promise<Official | undefined> {
  return officials.find((o) => o.id === id);
}

export async function getAllOfficials(): Promise<Official[]> {
  return officials;
}

export async function getContractor(id: string): Promise<Contractor | undefined> {
  return contractors.find((c) => c.id === id);
}

export async function getAllContractors(): Promise<Contractor[]> {
  return contractors;
}

export async function getReportsByProject(projectId: string): Promise<Report[]> {
  return reports.filter((r) => r.projectId === projectId);
}

export async function getAllReports(): Promise<Report[]> {
  return reports;
}