export type Stat = {
  value: string;
  label: string;
  highlight?: boolean;
};

export const stats: Stat[] = [
  { value: "~30%", label: "Latency Reduction", highlight: true },
  { value: "8", label: "Microservices Shipped" },
  { value: "7+", label: "Backend Systems Owned" },
  { value: "85%+", label: "Test Coverage" },
];
