import { Project, Community, Official, Contractor, Report } from "./types";

export const communities: Community[] = [
  {
    id: "tshakhuma",
    name: "Tshakhuma",
    description: "Water, roads, and basic services projects in Tshakhuma.",
  },
  {
    id: "tshisahulu",
    name: "Tshisahulu",
    description: "Water, roads, and basic services projects in Tshisahulu.",
  },
  {
    id: "itsani",
    name: "Itsani",
    description: "Water, roads, and basic services projects in Itsani.",
  },
];

export const officials: Official[] = [
  {
    id: "off-nkosi",
    name: "Mr. S. Nkosi",
    department: "Department of Public Works",
    nepotismScore: 45,
  },
  {
    id: "off-dlamini",
    name: "Ms. T. Dlamini",
    department: "Department of Water Affairs",
    nepotismScore: 12,
  },
  {
    id: "off-vanwyk",
    name: "Mr. J. van Wyk",
    department: "Department of Roads",
    nepotismScore: 78,
  },
];

export const contractors: Contractor[] = [
  {
    id: "con-johns",
    name: "John's Construction",
    registrationNumber: "2019/123456/07",
    trustScore: 62,
    onTimeRate: 75,
    budgetAdherence: 80,
  },
  {
    id: "con-buildright",
    name: "BuildRight Ltd",
    registrationNumber: "2017/987654/07",
    trustScore: 85,
    onTimeRate: 92,
    budgetAdherence: 95,
  },
  {
    id: "con-quickfix",
    name: "QuickFix Co.",
    registrationNumber: "2021/456789/07",
    trustScore: 28,
    onTimeRate: 40,
    budgetAdherence: 55,
  },
];

export const projects: Project[] = [
  {
    id: "TR-2024-0045",
    communityId: "tshakhuma",
    description: "Bridge Repair – Ward 5",
    budget: 500000,
    spent: 320000,
    contractorId: "con-johns",
    officialId: "off-nkosi",
    status: "in_progress",
    officialStatus: "In Progress",
    communityStatus: "Residents confirm ongoing work",
    communityVotePercent: 82,
    expenses: [
      {
        id: "exp-001",
        item: "Bricks",
        quantity: 100000,
        unitPrice: 5.0,
        supplier: "ABC Brickworks",
        supplierTaxId: "9001234567",
        invoiceNumber: "INV-2024-001",
        total: 500000,
        status: "verified",
      },
      {
        id: "exp-002",
        item: "Cement",
        quantity: 5000,
        unitPrice: 150.0,
        supplier: "XYZ Suppliers",
        supplierTaxId: "9007654321",
        invoiceNumber: "INV-2024-014",
        total: 750000,
        status: "flagged",
        flagReason: "Unit price is 45% above the market average for this category — flagged for review.",
      },
    ],
    milestones: [
      { name: "Foundation", status: "done" },
      { name: "Pillars", status: "in_progress" },
      { name: "Deck", status: "pending" },
    ],
  },
  {
    id: "TR-2024-0042",
    communityId: "tshisahulu",
    description: "Road Resurfacing – Ward 3",
    budget: 1200000,
    spent: 1200000,
    contractorId: "con-buildright",
    officialId: "off-dlamini",
    status: "complete",
    officialStatus: "Complete",
    communityStatus: "No disputes reported",
    communityVotePercent: 95,
    expenses: [
      {
        id: "exp-003",
        item: "Asphalt",
        quantity: 400,
        unitPrice: 2500.0,
        supplier: "RoadWorks Supply",
        supplierTaxId: "9009876543",
        invoiceNumber: "INV-2024-030",
        total: 1000000,
        status: "verified",
      },
    ],
    milestones: [
      { name: "Surface Prep", status: "done" },
      { name: "Resurfacing", status: "done" },
      { name: "Line Marking", status: "done" },
    ],
  },
  {
    id: "TR-2024-0038",
    communityId: "itsani",
    description: "Street Lighting – Ward 7",
    budget: 300000,
    spent: 150000,
    contractorId: "con-quickfix",
    officialId: "off-vanwyk",
    status: "flagged",
    officialStatus: "Marked Complete",
    communityStatus: "Disputed — residents report 6 of 20 lights not working",
    communityVotePercent: 68,
    expenses: [
      {
        id: "exp-004",
        item: "LED Streetlight Units",
        quantity: 20,
        unitPrice: 7500.0,
        supplier: "BrightPath Electrical",
        supplierTaxId: "9001112223",
        invoiceNumber: "INV-2024-014",
        total: 150000,
        status: "flagged",
        flagReason: "Duplicate invoice number detected — flagged for review.",
      },
    ],
    milestones: [
      { name: "Site Survey", status: "done" },
      { name: "Installation", status: "in_progress" },
      { name: "Commissioning", status: "pending" },
    ],
  },
];

export const reports: Report[] = [
  {
    id: "RPT-8821",
    projectId: "TR-2024-0038",
    category: "Electricity",
    description: "6 of 20 streetlights on this stretch are not working.",
    contact: "",
    status: "pending",
    createdAt: "2024-01-12T09:00:00Z",
  },
];