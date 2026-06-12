import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import { route } from '../utils/route';

export default function Welcome() {
    const { appName, appTagline, appDescription } = usePage().props;

    return (
        <AppLayout>
            <Head title="Find clinical trials matched to you" />

            <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/40 px-6 py-16 sm:px-14 sm:py-24">
                <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="relative max-w-2xl">
                    <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-4 py-1.5 text-xs font-medium text-teal-300 ring-1 ring-teal-500/25">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" />
                        Powered by ClinicalTrials.gov API
                    </span>

                    <h1 className="mt-8 font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                        Clinical trials <span className="text-gradient">matched</span> to your health profile
                    </h1>

                    <p className="mt-6 text-lg leading-relaxed text-slate-400">
                        Tell us your condition, age, and location. TrialMatch ranks recruiting studies by eligibility
                        fit — content-based matching for your FWP-3 recommender research.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <Link
                            href={route('register')}
                            className="rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-teal-500/25 transition hover:from-teal-400 hover:to-cyan-500"
                        >
                            Create free account
                        </Link>
                        <Link
                            href={route('login')}
                            className="rounded-2xl bg-white/5 px-8 py-3.5 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/10"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mt-16 grid gap-6 md:grid-cols-3">
                {[
                    {
                        step: '01',
                        title: 'Complete health profile',
                        text: 'Condition, age, sex, country, and optional keywords.',
                        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
                    },
                    {
                        step: '02',
                        title: 'API + matching engine',
                        text: 'Fetches trials from ClinicalTrials.gov and scores eligibility fit.',
                        icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z',
                    },
                    {
                        step: '03',
                        title: 'Review ranked trials',
                        text: 'Match %, phase, status, locations, and why each trial fits you.',
                        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                    },
                ].map((item) => (
                    <div key={item.step} className="glass-strong rounded-2xl p-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/15 text-teal-400">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                            </svg>
                        </div>
                        <span className="mt-4 block text-[10px] font-bold tracking-widest text-teal-500">{item.step}</span>
                        <h3 className="mt-2 font-display text-xl font-semibold text-white">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.text}</p>
                    </div>
                ))}
            </section>

            <div className="mt-12 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-5 py-4 text-sm text-amber-200/90">
                <strong className="font-medium text-amber-200">Disclaimer:</strong> TrialMatch is for academic research and education only. It does not provide medical advice. Always speak with a doctor before joining a clinical trial.
            </div>
        </AppLayout>
    );
}
