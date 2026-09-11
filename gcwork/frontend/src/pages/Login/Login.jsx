import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Leaf,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }

    if (errors.general) {
      setErrors((previous) => ({
        ...previous,
        general: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must contain at least 6 characters.";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      /*
       * IMPORTANT:
       * Do NOT hard-code 127.0.0.1:8000 here.
       *
       * Local:
       * http://localhost:8000
       *
       * Production:
       * https://greencompute-backend.onrender.com
       */
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        setErrors({
          general:
            data?.detail ||
            data?.message ||
            "Invalid email or password.",
        });
        return;
      }

      /*
       * Backend may return:
       *
       * {
       *   "access_token": "...",
       *   "token_type": "bearer"
       * }
       *
       * If your current backend still uses the demo token,
       * keep the fallback below.
       */
      const token =
        data?.access_token || "greencompute_demo_token";

      const userInfo = {
        id: data?.user?.id || data?.id || "demo-user",
        name:
          data?.user?.name ||
          data?.name ||
          formData.email.split("@")[0],
        email:
          data?.user?.email ||
          data?.email ||
          formData.email.trim(),
        role:
          data?.user?.role ||
          data?.role ||
          "Administrator",
      };

      const loginSuccess = login(token, userInfo);

      if (!loginSuccess) {
        setErrors({
          general: "Unable to save login session.",
        });
        return;
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);

      setErrors({
        general:
          "Unable to connect to the backend. Please make sure the backend is running.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Forgot password feature coming soon.");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="relative hidden overflow-hidden bg-emerald-600 lg:flex">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl" />

          <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Logo */}
            <Link
              to="/"
              className="inline-flex w-fit items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                <Leaf size={25} className="text-white" />
              </div>

              <span className="text-xl font-bold text-white">
                GreenCompute
              </span>
            </Link>

            {/* Main Content */}
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-emerald-50">
                <ShieldCheck size={16} />
                Secure Sustainability Platform
              </div>

              <h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
                Make your campus smarter, greener and more efficient.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-emerald-50">
                Monitor computer energy consumption, reduce carbon
                emissions and build a more sustainable digital
                campus with GreenCompute.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Real-time computer monitoring",
                  "AI-powered energy insights",
                  "Automated idle detection",
                  "Carbon emission tracking",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-white"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                      <ShieldCheck size={14} />
                    </div>

                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <p className="text-sm text-emerald-100">
              © {new Date().getFullYear()} GreenCompute.
              Building greener digital campuses.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-12">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-8 flex justify-center lg:hidden">
              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <Leaf size={25} />
                </div>

                <span className="text-xl font-bold text-slate-900">
                  GreenCompute
                </span>
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Sign in to your GreenCompute dashboard.
              </p>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0 text-red-500"
                />

                <p className="text-sm text-red-600">
                  {errors.general}
                </p>
              </div>
            )}

            {/* LOGIN FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@example.com"
                    autoComplete="email"
                    disabled={isLoading}
                    className={`w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                        : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                    }`}
                  />
                </div>

                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    disabled={isLoading}
                    className="text-xs font-medium text-emerald-600 hover:text-emerald-700 disabled:opacity-50"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <Lock
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={isLoading}
                    className={`w-full rounded-xl border bg-white py-3 pl-11 pr-11 text-sm text-slate-900 outline-none focus:ring-2 ${
                      errors.password
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                        : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    disabled={isLoading}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="h-4 w-4 accent-emerald-600"
                />

                <span className="text-sm text-slate-600">
                  Remember me
                </span>
              </label>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Back */}
            <div className="mt-8 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600"
              >
                <ArrowRight
                  size={15}
                  className="rotate-180"
                />
                Back to homepage
              </Link>
            </div>

            {/* Security */}
            <div className="mt-8 flex items-start gap-3 rounded-xl bg-slate-100 p-4">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-emerald-600"
              />

              <p className="text-xs leading-5 text-slate-500">
                Your account is protected with secure authentication.
                Never share your password or access token with anyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;