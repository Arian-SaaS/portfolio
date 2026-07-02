export type ChartPoint = { label: string; value: number };

export type KpiTile = {
  label: string;
  value: string;
  delta: number;
  /** Which direction of the delta counts as "good" — controls the color. */
  goodDirection: "up" | "down";
  sparkline: number[];
};

export type AlertSeverity = "good" | "warning" | "serious" | "critical";

export type AlertItem = {
  severity: AlertSeverity;
  message: string;
  meta: string;
};

export type TableRow = {
  primary: string;
  secondary: string;
  module: string;
  amount: string;
  status: "cleared" | "flagged" | "pending";
  date: string;
};

export type DashboardPreviewData = {
  eyebrow: string;
  title: string;
  chartTitle: string;
  chartData: ChartPoint[];
  kpis: KpiTile[];
  alerts: AlertItem[];
  tableTitle: string;
  tableColumns: [string, string, string, string, string];
  tableRows: TableRow[];
};

export const financeDashboard: DashboardPreviewData = {
  eyebrow: "Illustrative interface",
  title: "Finance overview",
  chartTitle: "Monthly recurring revenue",
  chartData: [
    { label: "Jan", value: 312 },
    { label: "Feb", value: 328 },
    { label: "Mar", value: 341 },
    { label: "Apr", value: 356 },
    { label: "May", value: 349 },
    { label: "Jun", value: 372 },
    { label: "Jul", value: 388 },
    { label: "Aug", value: 401 },
    { label: "Sep", value: 419 },
    { label: "Oct", value: 438 },
    { label: "Nov", value: 452 },
    { label: "Dec", value: 482 },
  ],
  kpis: [
    {
      label: "Monthly recurring revenue",
      value: "$482K",
      delta: 12.4,
      goodDirection: "up",
      sparkline: [312, 328, 341, 356, 349, 372, 388, 401, 419, 438, 452, 482],
    },
    {
      label: "Active client workspaces",
      value: "1,284",
      delta: 8.1,
      goodDirection: "up",
      sparkline: [1010, 1042, 1078, 1102, 1121, 1145, 1163, 1188, 1206, 1231, 1258, 1284],
    },
    {
      label: "Forecast accuracy",
      value: "94.2%",
      delta: 2.3,
      goodDirection: "up",
      sparkline: [89, 90, 90.5, 91, 91.8, 92, 92.6, 93, 93.2, 93.6, 93.9, 94.2],
    },
    {
      label: "Open exceptions",
      value: "7",
      delta: -18,
      goodDirection: "down",
      sparkline: [14, 13, 15, 12, 11, 12, 10, 9, 9, 8, 8, 7],
    },
  ],
  alerts: [
    {
      severity: "critical",
      message: "Reconciliation variance above threshold — Vendor AP batch #4471",
      meta: "Finance · 12 min ago",
    },
    {
      severity: "warning",
      message: "3 invoices pending approval for more than 5 days",
      meta: "Accounts payable · 1 hr ago",
    },
    {
      severity: "serious",
      message: "Forecast confidence dropped below 90% for APAC region",
      meta: "Forecasting · 3 hrs ago",
    },
    {
      severity: "good",
      message: "Month-end close completed on schedule",
      meta: "Finance · Yesterday",
    },
  ],
  tableTitle: "Recent activity",
  tableColumns: ["Account", "Module", "Amount", "Status", "Date"],
  tableRows: [
    { primary: "Acme Logistics", secondary: "Invoice #10432", module: "AR", amount: "$18,400", status: "cleared", date: "Jun 12" },
    { primary: "Meridian Retail Group", secondary: "Purchase order #2291", module: "AP", amount: "$6,120", status: "pending", date: "Jun 11" },
    { primary: "Northwind Vendors", secondary: "Reconciliation batch #4471", module: "Reconciliation", amount: "$42,900", status: "flagged", date: "Jun 11" },
    { primary: "Summit Health Partners", secondary: "Invoice #10419", module: "AR", amount: "$9,750", status: "cleared", date: "Jun 10" },
    { primary: "Blue Harbor Freight", secondary: "Forecast adjustment", module: "Forecasting", amount: "—", status: "pending", date: "Jun 9" },
  ],
};

export const executiveDashboard: DashboardPreviewData = {
  eyebrow: "Illustrative interface",
  title: "Executive intelligence overview",
  chartTitle: "Executive queries answered",
  chartData: [
    { label: "Jan", value: 142 },
    { label: "Feb", value: 158 },
    { label: "Mar", value: 171 },
    { label: "Apr", value: 189 },
    { label: "May", value: 203 },
    { label: "Jun", value: 214 },
    { label: "Jul", value: 226 },
    { label: "Aug", value: 241 },
    { label: "Sep", value: 258 },
    { label: "Oct", value: 279 },
    { label: "Nov", value: 296 },
    { label: "Dec", value: 318 },
  ],
  kpis: [
    {
      label: "Avg. time to answer",
      value: "4.2s",
      delta: -31,
      goodDirection: "down",
      sparkline: [8.1, 7.6, 7.0, 6.4, 5.9, 5.6, 5.3, 5.0, 4.8, 4.6, 4.4, 4.2],
    },
    {
      label: "Cross-module queries this week",
      value: "318",
      delta: 14.8,
      goodDirection: "up",
      sparkline: [142, 158, 171, 189, 203, 214, 226, 241, 258, 279, 296, 318],
    },
    {
      label: "Voice sessions",
      value: "96",
      delta: 21.5,
      goodDirection: "up",
      sparkline: [22, 28, 34, 41, 47, 53, 61, 68, 74, 81, 88, 96],
    },
    {
      label: "Open follow-ups",
      value: "5",
      delta: -28,
      goodDirection: "down",
      sparkline: [11, 10, 10, 9, 8, 8, 7, 7, 6, 6, 5, 5],
    },
  ],
  alerts: [
    {
      severity: "warning",
      message: "Margin variance flagged in the Northeast region briefing",
      meta: "Executive AI · 8 min ago",
    },
    {
      severity: "serious",
      message: "Cross-module reasoning latency above target for 2 workspaces",
      meta: "Platform health · 45 min ago",
    },
    {
      severity: "good",
      message: "Weekly executive briefing generated and delivered on schedule",
      meta: "Automation · 2 hrs ago",
    },
    {
      severity: "good",
      message: "Voice session accuracy holding above 98% for the week",
      meta: "Voice AI · Yesterday",
    },
  ],
  tableTitle: "Recent executive briefings",
  tableColumns: ["Topic", "Module", "Requested by", "Status", "Date"],
  tableRows: [
    { primary: "Why did margin drop in the Northeast?", secondary: "Cross-module reasoning", module: "Finance + CRM", amount: "Answered", status: "cleared", date: "Jun 12" },
    { primary: "Vendor risk summary — Q2", secondary: "Voice session", module: "Vendor", amount: "Answered", status: "cleared", date: "Jun 11" },
    { primary: "Payroll exception review", secondary: "Follow-up requested", module: "HR + Payroll", amount: "In progress", status: "pending", date: "Jun 11" },
    { primary: "Pipeline health vs. forecast", secondary: "Weekly briefing", module: "CRM + Finance", amount: "Answered", status: "cleared", date: "Jun 10" },
    { primary: "Inventory exposure — top 5 SKUs", secondary: "Flagged for review", module: "Inventory", amount: "Needs review", status: "flagged", date: "Jun 9" },
  ],
};
