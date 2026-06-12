import { Link, usePage } from '@inertiajs/react';
import { route } from '../utils/route';

export default function GuestLayout({ children, title, subtitle, footer }) {
    const { appName, appTagline } = usePage().props;

    return (
        <div className="min-h-screen health-gradient">
            <div className="mx-auto flex min-h-screen max-w-6xl flex-col lg:flex-row">
                {/* Brand panel */}
                <div className="relative flex flex-col justify-between overflow-hidden px-6 py-10 lg:w-[44%] lg:px-12 lg:py-14">
                    <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl" />
                    <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

                    <Link href={route('home')} className="relative flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-600 shadow-lg shadow-teal-500/30">
                            <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-display text-xl font-semibold text-white">{appName}</p>
                            <p className="text-xs text-teal-400/80">Clinical trial recommender</p>
                        </div>
                    </Link>

                    <div className="relative mt-10 lg:mt-0">
                        <h2 className="font-display text-3xl font-semibold leading-tight text-white lg:text-4xl">
                            {appTagline}
                        </h2>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
                            Build your health profile once. We search ClinicalTrials.gov and rank studies by how well they match you.
                        </p>

                        <ul className="mt-8 hidden space-y-3 lg:block">
                            {['Profile-based matching', 'Live ClinicalTrials.gov data', 'Match scores & eligibility reasons'].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500/15 text-teal-400">
                                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="relative mt-8 hidden text-xs text-slate-600 lg:block">
                        For research & education only — not medical advice.
                    </p>
                </div>

                {/* Form panel */}
                <div className="flex flex-1 items-center justify-center px-4 py-10 lg:px-10">
                    <div className="w-full max-w-md">
                        <div className="glass-strong rounded-3xl border border-white/[0.08] p-8 shadow-2xl sm:p-10">
                            {title && (
                                <div className="mb-8">
                                    <h1 className="font-display text-2xl font-semibold text-white">{title}</h1>
                                    {subtitle && <p className="mt-2 text-sm leading-relaxed text-slate-400">{subtitle}</p>}
                                </div>
                            )}
                            {children}
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
