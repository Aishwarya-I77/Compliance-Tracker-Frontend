// src/features/registrations/types.ts
export type ComplianceStatus = "Complied" | "Not Complied" | "Not Applicable";

export type ApplicabilityLevel = "Organization" | "Branch" | "State" | "Client";

export interface Registration {
  id: number;
  act: string;
  applicabilityLevel: ApplicabilityLevel;
  state: string;
  branch: string;
  status: ComplianceStatus;
}

export interface RegistrationStats {
  totalCompliance: number;
  complied: number;
  notComplied: number;
  notApplicable: number;
}

export interface RegistrationFilters {
  status: "All" | ComplianceStatus;
  state: string;
  branch: string;
}

export interface RegistrationResponse {
  data: Registration[];
  stats: RegistrationStats;
  total: number;
  page: number;
  pageSize: number;
}