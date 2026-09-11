import { Link } from "react-router-dom";
import {
  Leaf,
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  Heart,
} from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Labs",
      path: "/labs",
    },
    {
      name: "Analytics",
      path: "/analytics",
    },
  ];

  const platformLinks = [
    {
      name: "Computers",
      path: "/computers",
    },
    {
      name: "Carbon Tracker",
      path: "/carbon",
    },
    {
      name: "Reports",
      path: "/reports",
    },
    {
      name: "Settings",
      path: "/settings",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 shadow-lg shadow-emerald-600/20">
                <Leaf
                  size={24}
                  strokeWidth={2.2}
                  className="text-white"
                />
              </div>

              <div>
                <span className="text-xl font-bold tracking-tight">
                  Green<span className="text-emerald-400">Compute</span>
                </span>

                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-slate-500">
                  Digital Sustainability
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400">
              An AI-powered digital sustainability platform that helps
              educational institutions monitor computer energy usage,
              reduce carbon emissions, and build a greener future.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition-all duration-200 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
              >
                <Github size={18} />
              </a>

              <a
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn" 
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition-all duration-200 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white" 
              > 
                <Linkedin size={18} /> 
              </a> 
 
              <a 
                href="mailto:hello@greencompute.com" 
                aria-label="Email" 
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition-all duration-200 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white" 
              > 
                <Mail size={18} /> 
              </a> 
            </div> 
          </div> 
 
          {/* Quick Links */} 
          <div> 
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white"> 
              Quick Links 
            </h3> 
 
            <ul className="mt-5 space-y-3"> 
              {quickLinks.map((link) => ( 
                <li key={link.path}> 
                  <Link 
                    to={link.path} 
                    className="text-sm text-slate-400 transition-colors hover:text-emerald-400" 
                  > 
                    {link.name} 
                  </Link> 
                </li> 
              ))} 
            </ul> 
          </div> 
 
          {/* Platform */} 
          <div> 
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white"> 
              Platform 
            </h3> 
 
            <ul className="mt-5 space-y-3"> 
              {platformLinks.map((link) => ( 
                <li key={link.path}> 
                  <Link 
                    to={link.path} 
                    className="text-sm text-slate-400 transition-colors hover:text-emerald-400" 
                  > 
                    {link.name} 
                  </Link> 
                </li> 
              ))} 
            </ul> 
          </div> 
        </div> 
 
        {/* Sustainability Banner */} 
        <div className="mt-12 overflow-hidden rounded-2xl border border-emerald-900/50 bg-emerald-950/40 p-5"> 
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"> 
            <div className="flex items-center gap-4"> 
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600/20"> 
                <Leaf 
                  size={20} 
                  className="text-emerald-400" 
                /> 
              </div> 
 
              <div> 
                <p className="text-sm font-semibold text-emerald-300"> 
                  Building a greener digital future 
                </p> 
 
                <p className="mt-1 text-xs text-slate-500"> 
                  Every watt saved contributes to a more sustainable campus. 
                </p> 
              </div> 
            </div> 
 
            <span className="rounded-full border border-emerald-800 bg-emerald-950 px-4 py-2 text-xs font-semibold text-emerald-400"> 
              🌱 Sustainability First 
            </span> 
          </div> 
        </div> 
      </div> 
 
      {/* Bottom Footer */} 
      <div className="border-t border-slate-800"> 
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:px-6 md:flex-row lg:px-8"> 
          <p className="text-center text-xs text-slate-500 md:text-left"> 
            © {currentYear} GreenCompute. All rights reserved. 
          </p> 
 
          <p className="flex items-center gap-1 text-xs text-slate-500"> 
            Made with 
            <Heart 
              size={13} 
              className="fill-current text-emerald-500" 
            /> 
            for a greener future 
          </p> 
 
          {/* Back To Top */} 
          <button 
            type="button" 
            onClick={scrollToTop} 
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-slate-900 hover:text-emerald-400" 
            aria-label="Back to top" 
          > 
            Back to top 
            <ArrowUp size={15} /> 
          </button> 
        </div> 
      </div> 
    </footer> 
  ); 
} 
 
export default Footer;