import DashboardLayout from "@/components/DashboardLayout";
import { Package, Truck, AlertTriangle, CheckCircle, Users, BarChart3, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const stats = [
  { label: "Total Parcels", value: "1,247", icon: Package, color: "text-accent" },
  { label: "In Transit", value: "342", icon: Truck, color: "text-info" },
  { label: "Delayed", value: "28", icon: AlertTriangle, color: "text-destructive" },
  { label: "Delivered Today", value: "89", icon: CheckCircle, color: "text-success" },
  { label: "Active Staff", value: "24", icon: Users, color: "text-info" },
  { label: "Avg Delivery Time", value: "2.1 days", icon: Clock, color: "text-accent" },
];

const barData = [
  { name: "Mon", parcels: 145 }, { name: "Tue", parcels: 178 },
  { name: "Wed", parcels: 162 }, { name: "Thu", parcels: 198 },
  { name: "Fri", parcels: 210 }, { name: "Sat", parcels: 130 },
  { name: "Sun", parcels: 85 },
];

const pieData = [
  { name: "On Time", value: 78 }, { name: "Slightly Delayed", value: 14 },
  { name: "Significantly Delayed", value: 5 }, { name: "At Risk", value: 3 },
];

const COLORS = ["hsl(142, 70%, 45%)", "hsl(38, 92%, 50%)", "hsl(25, 95%, 53%)", "hsl(0, 84%, 60%)"];

const anomalies = [
  { id: "AP-20260099", issue: "Stuck at sorting center for 72+ hours", severity: "Critical", office: "Delhi Hub" },
  { id: "AP-20260087", issue: "Repeated route failure on MH-RJ corridor", severity: "High", office: "Pune GPO" },
  { id: "Route MH-KA", issue: "3x normal transit time this week", severity: "Medium", office: "Mumbai Central" },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="mt-1 text-muted-foreground">System overview and AI analytics</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <p className="mt-2 font-display text-xl font-bold text-foreground">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Weekly Parcel Volume</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 89%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(215, 15%, 47%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(215, 15%, 47%)" }} />
              <Tooltip />
              <Bar dataKey="parcels" fill="hsl(25, 95%, 53%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Delivery Performance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap gap-3 justify-center">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                {d.name} ({d.value}%)
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Anomalies */}
      <div className="rounded-xl border border-border bg-card shadow-card">
        <div className="flex items-center gap-2 border-b border-border p-5">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <h2 className="font-display text-lg font-semibold text-foreground">AI Anomaly Detection</h2>
        </div>
        <div className="divide-y divide-border">
          {anomalies.map((a) => (
            <div key={a.id} className="flex items-center justify-between p-5 hover:bg-muted/50">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-accent">{a.id}</span>
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    a.severity === "Critical" ? "bg-destructive/10 text-destructive" :
                    a.severity === "High" ? "bg-warning/10 text-warning" :
                    "bg-info/10 text-info"
                  }`}>{a.severity}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{a.issue}</p>
              </div>
              <span className="text-xs text-muted-foreground">{a.office}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
