"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Bot,
  Zap,
  BarChart3,
  FileEdit,
  Brain,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Rocket,
  Users,
  Smile,
  Sun,
  Moon,
  ChevronDown,
  LayoutDashboard,
  Ticket,
  UserCircle,
  Bot as AIIcon,
  LineChart,
  FileText,
  Settings,
  Search,
  Star,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  LogIn,
} from "lucide-react";

export default function CompliGoLanding() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0b2e] text-white overflow-hidden">
      {/* ===== NAVBAR ===== */}
      <nav className="relative z-20 flex items-center justify-between py-6 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xl">
            C
          </div>
          <div>
            <div className="font-bold text-lg leading-tight">CompliGo</div>
            <div className="text-[10px] text-slate-400">AI Complaint Management</div>
          </div>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <li className="hover:text-white cursor-pointer">Features</li>
          <li className="hover:text-white cursor-pointer">How It Works</li>
          <li className="hover:text-white cursor-pointer">Pricing</li>
          <li className="hover:text-white cursor-pointer flex items-center gap-1">
            Resources <ChevronDown className="w-3 h-3" />
          </li>
          <li className="hover:text-white cursor-pointer">About</li>
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-1 bg-slate-800/60 rounded-full p-1 border border-slate-700"
            data-testid="theme-toggle-btn"
            suppressHydrationWarning
          >
            <span className={`p-1.5 rounded-full ${isDark ? "" : "bg-white text-amber-500"}`}>
              <Sun className="w-3.5 h-3.5" />
            </span>
            <span className={`p-1.5 rounded-full ${isDark ? "bg-white text-slate-700" : ""}`}>
              <Moon className="w-3.5 h-3.5" />
            </span>
          </button>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 rounded-lg px-6"
            data-testid="get-started-btn"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative max-w-[1400px] mx-auto pt-5 pb-13">

        <div className="grid lg:grid-cols-[1.1fr_1.4fr] gap-18 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <Badge
              variant="outline"
              className="bg-indigo-500/10 text-indigo-300 border-indigo-500/30 rounded-xl px-4 py-4.5 mb-8"
            >
              <Sparkles className="w-3 h-3 mr-1.5" />
              AI-Powered Complaint Management
            </Badge>

            <h1 className="text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
              Resolve
              <br />
              Complaints
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                10x Faster
              </span>
              <br />
              with AI
            </h1>

            <p className="text-slate-400 text-lg mb-10 max-w-md">
              AI reads, classifies, drafts responses and assigns tickets automatically.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 rounded-xl h-14 px-8 text-base"
                data-testid="submit-complaint-btn"
              >
                <FileEdit className="w-5 h-5 mr-2" />
                Submit a Complaint
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-slate-600 hover:bg-slate-800 rounded-xl h-14 px-8 text-base text-white"
                data-testid="agent-login-btn"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Agent Login
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[
                  "https://i.pravatar.cc/40?img=1",
                  "https://i.pravatar.cc/40?img=2",
                  "https://i.pravatar.cc/40?img=3",
                  "https://i.pravatar.cc/40?img=4",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="user"
                    className="w-10 h-10 rounded-full border-2 border-[#0a0b2e]"
                  />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 text-yellow-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-400">Trusted by 1,000+ organizations</p>
              </div>
            </div>
          </div>

          {/* Right - Dashboard Preview */}
          <DashboardPreview />
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="bg-white text-slate-900 py-24 px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-600 font-semibold tracking-widest text-sm mb-3">FEATURES</p>
            <h2 className="text-4xl font-bold">Powerful Features for Smarter Resolution</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Bot className="w-8 h-8 text-indigo-600" />}
              bg="bg-indigo-50"
              title="AI Classification"
              desc="Instantly categorizes and prioritizes every complaint."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-amber-500" />}
              bg="bg-amber-50"
              title="Real-time Updates"
              desc="Customers track status live, no refresh needed."
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8 text-emerald-600" />}
              bg="bg-emerald-50"
              title="Smart Analytics"
              desc="Deep insights into complaint trends and agent performance."
            />
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-white text-slate-900 py-24 px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <p className="text-indigo-600 font-semibold tracking-widest text-sm mb-3">HOW IT WORKS</p>
            <h2 className="text-4xl font-bold">A Simple 4-Step Process</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4 relative">
            <StepCard
              num={1}
              icon={<FileEdit className="w-10 h-10 text-indigo-600" />}
              bg="bg-indigo-50"
              numBg="bg-indigo-600"
              title="Customer submits complaint"
              desc="Easy submission via web, email, or mobile."
            />
            <StepCard
              num={2}
              icon={<Brain className="w-10 h-10 text-emerald-600" />}
              bg="bg-emerald-50"
              numBg="bg-emerald-600"
              title="AI analyzes in seconds"
              desc="AI reads, classifies, and prioritizes instantly."
            />
            <StepCard
              num={3}
              icon={<MessageCircle className="w-10 h-10 text-amber-600" />}
              bg="bg-amber-50"
              numBg="bg-amber-600"
              title="Agent gets AI draft response"
              desc="AI suggests smart replies for faster resolution."
            />
            <StepCard
              num={4}
              icon={<CheckCircle2 className="w-10 h-10 text-emerald-600" />}
              bg="bg-emerald-50"
              numBg="bg-emerald-600"
              title="Customer resolved in minutes"
              desc="Quick responses. Happy customers."
            />
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-white py-12 px-8 md:px-16">
        <div className="max-w-[1300px] mx-auto bg-[#0a0b2e] rounded-2xl p-12 grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-700">
          <StatCard
            icon={<Rocket className="w-12 h-12 text-indigo-400" />}
            value="95%"
            label="Faster Resolution"
            desc="Complaints resolved up to 10x faster with AI"
          />
          <StatCard
            icon={<Users className="w-12 h-12 text-emerald-400" />}
            value="10,000+"
            label="Complaints Handled"
            desc="Successfully processed across multiple channels"
          />
          <StatCard
            icon={<Smile className="w-12 h-12 text-amber-400" />}
            value="98%"
            label="Customer Satisfaction"
            desc="Happy customers with our AI-powered support"
          />
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#0a0b2e] text-white px-8 md:px-16 pt-20 pb-8">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-5 gap-10 pb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold">
                C
              </div>
              <div>
                <div className="font-bold">CompliGo</div>
                <div className="text-[10px] text-slate-400">AI Complaint Management</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-6">
              AI-powered complaint management that helps businesses resolve issues faster and keep customers happy.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Facebook, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center"
                  data-testid={`social-link-${i}`}
                  suppressHydrationWarning
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <FooterCol title="Company" items={["About", "How It Works", "Pricing", "Contact"]} />
          <FooterCol title="Resources" items={["Blog", "Help Center", "API Documentation", "Status"]} />
          <FooterCol title="Legal" items={["Privacy Policy", "Terms of Service", "Cookie Policy"]} />

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-slate-400 mb-4">
              Get product updates and insights straight to your inbox.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-700 rounded-lg"
                data-testid="newsletter-input"
              />
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                data-testid="subscribe-btn"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © 2025 CompliGo. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

/* ===================== SUB-COMPONENTS ===================== */

function DashboardPreview() {
  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Ticket, label: "Tickets" },
    { icon: UserCircle, label: "Customers" },
    { icon: AIIcon, label: "AI Assistant" },
    { icon: LineChart, label: "Analytics" },
    { icon: FileText, label: "Reports" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="relative w-full max-w-[800px] lg:max-w-none ml-auto">
      {/* Ambient background glow behind the tilted card */}
      <div className="absolute -inset-10 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
      
      {/* 3D Perspective Container */}
      <div 
        className="transition-all duration-700 ease-out hover:scale-[1.02] origin-top-right scale-[0.7] sm:scale-[0.8] md:scale-[0.85] lg:scale-[0.75] xl:scale-[0.85] 2xl:scale-100"
        style={{
          perspective: "2000px",
          transformStyle: "preserve-3d",
        }}
      >
        <Card 
          className="bg-white text-slate-900 rounded-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] border border-slate-200/50 overflow-hidden"
          style={{
            transform: "rotateY(-15deg) rotateX(7deg) rotateZ(1deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
              C
            </div>
            <span className="font-bold text-sm">CompliGo</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <Input
                placeholder="Search complaints..."
                className="pl-9 h-8 w-28 sm:w-36 md:w-56 text-xs bg-slate-50"
              />
            </div>
            <div className="relative">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center">
                3
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="https://i.pravatar.cc/32?img=5"
                className="w-7 h-7 rounded-full"
                alt="admin"
              />
              <div className="text-xs">
                <div className="font-semibold">Admin</div>
                <div className="text-emerald-600 text-[10px]">● Online</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-28 sm:w-36 md:w-44 border-r p-2 sm:p-3 space-y-1 shrink-0">
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs cursor-pointer ${
                  item.active
                    ? "bg-indigo-50 text-indigo-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </div>
            ))}
          </div>

          {/* Main */}
          <div className="flex-1 p-4 bg-slate-50/50">
            <h3 className="font-bold text-sm mb-4">Dashboard</h3>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              <KPI label="Total Complaints" value="12,458" delta="↑ 18.2%" color="text-emerald-600" />
              <KPI label="In Progress" value="2,345" delta="↑ 12.4%" color="text-amber-600" />
              <KPI label="Resolved" value="9,213" delta="↑ 22.1%" color="text-emerald-600" />
              <KPI label="Avg. Resolution Time" value="2.4 hrs" delta="↓ 35%" color="text-emerald-600" />
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <Card className="col-span-1 md:col-span-2 p-3 border-0 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold">Complaints Overview</span>
                  <Badge variant="outline" className="text-[10px] h-5">This Week ▾</Badge>
                </div>
                <svg viewBox="0 0 200 60" className="w-full h-16">
                  <polyline
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2"
                    points="0,50 30,40 60,35 90,30 120,20 150,15 180,10 200,5"
                  />
                  <polyline
                    fill="rgba(99,102,241,0.15)"
                    stroke="none"
                    points="0,50 30,40 60,35 90,30 120,20 150,15 180,10 200,5 200,60 0,60"
                  />
                </svg>
              </Card>
              <Card className="p-3 border-0 shadow-sm">
                <div className="text-xs font-semibold mb-2">By Category</div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full border-[6px] border-indigo-500 border-r-emerald-500 border-b-amber-500 border-l-rose-500" />
                  <div className="text-[9px] space-y-0.5">
                    <Legend color="bg-indigo-500" label="Billing" val="28%" />
                    <Legend color="bg-blue-500" label="Service" val="24%" />
                    <Legend color="bg-amber-500" label="Product" val="20%" />
                    <Legend color="bg-rose-500" label="Support" val="16%" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Tickets */}
            <Card className="p-3 border-0 shadow-sm overflow-x-auto">
              <div className="text-xs font-semibold mb-2">Recent Tickets</div>
              <table className="w-full text-[10px] min-w-[450px] md:min-w-0">
                <thead className="text-slate-400">
                  <tr>
                    <th className="text-left font-normal pb-1">ID</th>
                    <th className="text-left font-normal pb-1">Customer</th>
                    <th className="text-left font-normal pb-1">Category</th>
                    <th className="text-left font-normal pb-1">Priority</th>
                    <th className="text-left font-normal pb-1">Status</th>
                    <th className="text-left font-normal pb-1">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  <TicketRow id="#12458" name="Jane Cooper" cat="Billing" prio="High" prioColor="text-rose-500" status="In Progress" statusColor="bg-blue-100 text-blue-700" time="2m ago" />
                  <TicketRow id="#12457" name="Robert Fox" cat="Service" prio="Medium" prioColor="text-amber-500" status="In Progress" statusColor="bg-blue-100 text-blue-700" time="10m ago" />
                  <TicketRow id="#12456" name="Leslie Alexander" cat="Product" prio="Low" prioColor="text-emerald-500" status="Resolved" statusColor="bg-emerald-100 text-emerald-700" time="1h ago" />
                  <TicketRow id="#12455" name="Brooklyn Simmons" cat="Support" prio="High" prioColor="text-rose-500" status="Open" statusColor="bg-amber-100 text-amber-700" time="2h ago" />
                </tbody>
              </table>
            </Card>
          </div>
        </div>
        </Card>
      </div>
    </div>
  );
}

function KPI({ label, value, delta, color }: { label: string; value: string; delta: string; color: string }) {
  return (
    <Card className="p-2.5 border-0 shadow-sm">
      <div className="text-[10px] text-slate-500 mb-1">{label}</div>
      <div className="text-lg font-bold">{value}</div>
      <div className={`text-[9px] ${color}`}>{delta} vs last month</div>
    </Card>
  );
}

function Legend({ color, label, val }: { color: string; label: string; val: string }) {
  return (
    <div className="flex items-center gap-1">
      <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
      <span className="text-slate-600">{label}</span>
      <span className="ml-auto font-semibold">{val}</span>
    </div>
  );
}

function TicketRow({ id, name, cat, prio, prioColor, status, statusColor, time }: any) {
  return (
    <tr className="border-t">
      <td className="py-1.5 text-indigo-600 font-medium">{id}</td>
      <td>{name}</td>
      <td>{cat}</td>
      <td className={prioColor + " font-semibold"}>{prio}</td>
      <td>
        <span className={`px-2 py-0.5 rounded ${statusColor}`}>{status}</span>
      </td>
      <td className="text-slate-500">{time}</td>
    </tr>
  );
}

function FeatureCard({ icon, bg, title, desc }: { icon: React.ReactNode; bg: string; title: string; desc: string }) {
  return (
    <Card className="border border-slate-200 hover:shadow-lg transition-shadow">
      <CardContent className="p-8 flex gap-5">
        <div className={`w-16 h-16 rounded-2xl ${bg} flex items-center justify-center shrink-0`}>
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-slate-600 text-sm">{desc}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function StepCard({ num, icon, bg, numBg, title, desc }: any) {
  return (
    <div className="text-center relative">
      <div className="relative inline-block mb-6">
        <div className={`w-24 h-24 rounded-full ${bg} flex items-center justify-center mx-auto`}>
          {icon}
        </div>
        <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full ${numBg} text-white font-bold flex items-center justify-center text-sm border-4 border-white`}>
          {num}
        </div>
      </div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-slate-600 max-w-[200px] mx-auto">{desc}</p>
    </div>
  );
}

function StatCard({ icon, value, label, desc }: { icon: React.ReactNode; value: string; label: string; desc: string }) {
  return (
    <div className="flex items-center gap-5 px-6 pt-8 md:pt-0">
      {icon}
      <div>
        <div className="text-4xl font-bold">{value}</div>
        <div className="font-semibold mb-1">{label}</div>
        <div className="text-xs text-slate-400">{desc}</div>
      </div>
    </div>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-semibold mb-4">{title}</h4>
      <ul className="space-y-2 text-sm text-slate-400">
        {items.map((i) => (
          <li key={i} className="hover:text-white cursor-pointer">{i}</li>
        ))}
      </ul>
    </div>
  );
}