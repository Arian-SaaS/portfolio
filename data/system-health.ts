import { KpiTile } from "@/data/dashboard-preview";

export type ServiceStatus = "operational" | "degraded" | "maintenance";

export type ServiceRow = {
  name: string;
  status: ServiceStatus;
  detail: string;
};

export type SystemHealthData = {
  kpis: KpiTile[];
  services: ServiceRow[];
};

export const systemHealth: SystemHealthData = {
  kpis: [
    {
      label: "API uptime (30d)",
      value: "99.98%",
      delta: 0.02,
      goodDirection: "up",
      sparkline: [99.9, 99.92, 99.9, 99.95, 99.94, 99.97, 99.96, 99.98],
    },
    {
      label: "P95 latency",
      value: "184ms",
      delta: -8.2,
      goodDirection: "down",
      sparkline: [224, 216, 209, 201, 196, 190, 187, 184],
    },
    {
      label: "Deploys this month",
      value: "18",
      delta: 20,
      goodDirection: "up",
      sparkline: [9, 11, 12, 13, 14, 16, 17, 18],
    },
    {
      label: "Error rate",
      value: "0.04%",
      delta: -22,
      goodDirection: "down",
      sparkline: [0.09, 0.08, 0.07, 0.06, 0.06, 0.05, 0.05, 0.04],
    },
  ],
  services: [
    {
      name: "API gateway",
      status: "operational",
      detail: "All regions nominal",
    },
    {
      name: "AI orchestration layer",
      status: "operational",
      detail: "Avg. response 1.8s",
    },
    {
      name: "Database (PostgreSQL)",
      status: "operational",
      detail: "Replication healthy",
    },
    {
      name: "CI/CD pipeline",
      status: "operational",
      detail: "Last deploy 2 hrs ago",
    },
  ],
};
