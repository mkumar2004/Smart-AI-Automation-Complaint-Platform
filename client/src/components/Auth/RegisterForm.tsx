"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2, X, Check, User, Mail, Phone, Lock } from "lucide-react";

function getPasswordStrength(password: string) {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { score: 1, label: "Weak", color: "#ef4444" };
  if (score === 2) return { score: 2, label: "Fair", color: "#f97316" };
  if (score === 3) return { score: 3, label: "Good", color: "#eab308" };
  return { score: 4, label: "Strong", color: "#22c55e" };
}

type Fields = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type FieldValidity = Record<keyof Fields, boolean | null>;

const validators: Record<keyof Fields, (v: string, all?: Fields) => boolean> = {
  fullName: (v) => v.trim().length >= 2,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  phone: (v) => /^\+?[\d\s\-().]{7,}$/.test(v),
  password: (v) => v.length >= 8,
  confirmPassword: (v, all) => !!all && v === all.password && v.length > 0,
};

export default function RegisterForm() {
  const [fields, setFields] = useState<Fields>({
    fullName: "", email: "", phone: "", password: "", confirmPassword: "",
  });
  const [validity, setValidity] = useState<FieldValidity>({
    fullName: null, email: null, phone: null, password: null, confirmPassword: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [error, setError] = useState("");

  const setField = (key: keyof Fields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    setValidity((v) => ({ ...v, [key]: null }));
  };

  const blurField = (key: keyof Fields) => {
    setValidity((v) => ({
      ...v,
      [key]: validators[key](fields[key], fields),
    }));
  };

  const strength = getPasswordStrength(fields.password);

  const fieldClass = (valid: boolean | null) =>
    `flex items-center gap-3 border rounded-xl px-4 h-12 transition-all ${
      valid === null
        ? "border-slate-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100"
        : valid
        ? "border-green-400 focus-within:ring-2 focus-within:ring-green-100"
        : "border-red-400 focus-within:ring-2 focus-within:ring-red-100"
    }`;

  const Checkmark = () => (
    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0">
      <Check className="w-3 h-3 text-white" />
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const newValidity = Object.fromEntries(
      (Object.keys(fields) as (keyof Fields)[]).map((k) => [k, validators[k](fields[k], fields)])
    ) as FieldValidity;
    setValidity(newValidity);

    if (Object.values(newValidity).some((v) => !v) || !agreed) {
      setError("Please fill in all fields correctly and agree to the terms.");
      return;
    }
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setToast(true);
      setTimeout(() => setToast(false), 4000);
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-white px-8 py-6 relative overflow-hidden">

      {/* Success Toast */}
      {toast && (
        <div className="absolute top-5 right-5 flex items-center gap-3 bg-white border border-green-200 shadow-lg rounded-2xl px-4 py-3 z-50">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-medium text-slate-700">Account created! Please login</span>
          <button onClick={() => setToast(false)} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex flex-col justify-center h-full max-w-md w-full mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 text-center mb-1">Create Your Account</h1>
        <p className="text-slate-500 text-center text-sm mb-5">Register as a customer to get started</p>

        {error && (
          <div className="flex items-center justify-between gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-2.5 mb-4">
            <span>{error}</span>
            <button type="button" onClick={() => setError("")}><X className="w-4 h-4" /></button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3" autoComplete="off">
          {/* Honeypot: tricks password managers into filling these instead of real fields */}
          <input type="text" name="username" style={{ display: "none" }} readOnly tabIndex={-1} />
          <input type="password" name="password" style={{ display: "none" }} readOnly tabIndex={-1} />

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
            <div className={fieldClass(validity.fullName)}>
              <User className="w-4 h-4 text-slate-400 shrink-0" />
              <input type="text" value={fields.fullName} placeholder="John Doe" suppressHydrationWarning
                autoComplete="name"
                onChange={(e) => setField("fullName", e.target.value)}
                onBlur={() => blurField("fullName")}
                className="flex-1 outline-none text-sm text-slate-700 placeholder:text-slate-400 bg-transparent" />
              {validity.fullName === true && <Checkmark />}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
            <div className={fieldClass(validity.email)}>
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <input type="email" value={fields.email} placeholder="john.doe@example.com" suppressHydrationWarning
                autoComplete="email"
                onChange={(e) => setField("email", e.target.value)}
                onBlur={() => blurField("email")}
                className="flex-1 outline-none text-sm text-slate-700 placeholder:text-slate-400 bg-transparent" />
              {validity.email === true && <Checkmark />}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
            <div className={fieldClass(validity.phone)}>
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <input type="tel" value={fields.phone} placeholder="+1 987 654 3210" suppressHydrationWarning
                autoComplete="off"
                onChange={(e) => setField("phone", e.target.value)}
                onBlur={() => blurField("phone")}
                className="flex-1 outline-none text-sm text-slate-700 placeholder:text-slate-400 bg-transparent" />
              {validity.phone === true && <Checkmark />}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
            <div className={fieldClass(validity.password)}>
              <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              <input type={showPassword ? "text" : "password"} value={fields.password} placeholder="••••••••" suppressHydrationWarning
                autoComplete="new-password"
                onChange={(e) => setField("password", e.target.value)}
                onBlur={() => blurField("password")}
                className="flex-1 outline-none text-sm text-slate-700 placeholder:text-slate-400 bg-transparent" />
              <button type="button" suppressHydrationWarning onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-600 shrink-0">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              {validity.password === true && <Checkmark />}
            </div>
            {fields.password.length > 0 && (
              <div className="mt-1.5 flex items-center gap-2">
                <div className="flex gap-1 flex-1 h-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex-1 rounded-full transition-all duration-300"
                      style={{ backgroundColor: i <= strength.score ? strength.color : "#e2e8f0" }} />
                  ))}
                </div>
                <span className="text-xs font-semibold shrink-0" style={{ color: strength.color }}>{strength.label}</span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm Password</label>
            <div className={fieldClass(validity.confirmPassword)}>
              <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              <input type={showConfirm ? "text" : "password"} value={fields.confirmPassword} placeholder="••••••••" suppressHydrationWarning
                autoComplete="new-password"
                onChange={(e) => setField("confirmPassword", e.target.value)}
                onBlur={() => blurField("confirmPassword")}
                className="flex-1 outline-none text-sm text-slate-700 placeholder:text-slate-400 bg-transparent" />
              <button type="button" suppressHydrationWarning onClick={() => setShowConfirm(!showConfirm)} className="text-slate-400 hover:text-slate-600 shrink-0">
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              {validity.confirmPassword === true && <Checkmark />}
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-center gap-2.5 cursor-pointer">
            <div
              className={`w-4 h-4 rounded flex items-center justify-center border-2 transition-colors shrink-0 ${agreed ? "bg-indigo-600 border-indigo-600" : "border-slate-300"}`}
              onClick={() => setAgreed(!agreed)}
            >
              {agreed && <Check className="w-2.5 h-2.5 text-white" />}
            </div>
            <span className="text-xs text-slate-600">
              I agree to the{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Terms &amp; Conditions</a>
              {" "}and{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Privacy Policy</a>
            </span>
          </label>

          {/* Submit */}
          <button type="submit" disabled={isLoading} suppressHydrationWarning
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors text-sm">
            {isLoading ? (<><Loader2 className="w-4 h-4 animate-spin" />Creating account…</>) : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-4">
          Already have an account?{" "}
          <a href="/Auth/Login" className="text-indigo-600 hover:text-indigo-800 font-semibold">Login here</a>
        </p>
      </div>
    </div>
  );
}