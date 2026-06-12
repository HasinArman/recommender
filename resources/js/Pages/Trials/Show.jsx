import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import MatchRing from '../../Components/MatchRing';
import { route } from '../../utils/route';

export default function Show({ trial, profile }) {
    return (
        <AppLayout>
            <Head title={trial.title} />

            <Link href={route('trials.index')} className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-teal-400">
                ← Back to recommendations
            </Link>

            <div className="glass-strong overflow-hidden rounded-3xl">
                <div className="border-b border-white/[0.06] bg-gradient-to-r from-teal-500/10 via-transparent to-cyan-500/10 p-6 sm:p-10">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                            <div className="flex flex-wrap gap-2">
                                <span className="rounded-full bg-teal-500/15 px-3 py-1 text-xs font-medium text-teal-300 ring-1 ring-teal-500/30">
                                    {trial.status?.replace(/_/g, ' ')}
                                </span>
                                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300 ring-1 ring-cyan-500/20">
                                    {trial.phase_label}
                                </span>
                                <span className="font-mono text-xs text-slate-600">{trial.nct_id}</span>
                            </div>
                            <h1 className="mt-4 font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
                                {trial.title}
                            </h1>
                        </div>
                        <MatchRing percent={trial.match_percent} size="lg" />
                    </div>
                </div>

                <div className="grid gap-8 p-6 sm:grid-cols-3 sm:p-10">
                    <div className="sm:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Summary</h2>
                            <p className="mt-3 leading-relaxed text-slate-300">{trial.summary || 'No summary available.'}</p>
                        </section>

                        <section>
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Why this matches you</h2>
                            <ul className="mt-3 space-y-2">
                                {trial.reasons?.map((reason, i) => (
                                    <li key={i} className="flex items-start gap-3 rounded-xl bg-teal-500/5 px-4 py-3 text-sm text-teal-100/90 ring-1 ring-teal-500/10">
                                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        {reason}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {trial.eligibility_criteria && (
                            <section>
                                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Eligibility criteria</h2>
                                <div className="mt-3 max-h-64 overflow-y-auto rounded-xl bg-slate-900/60 p-4 text-sm leading-relaxed text-slate-400 ring-1 ring-white/[0.06]">
                                    {trial.eligibility_criteria.slice(0, 1500)}
                                    {trial.eligibility_criteria.length > 1500 && '…'}
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="space-y-4">
                        <InfoBox label="Your condition" value={profile.condition} />
                        <InfoBox label="Your age" value={String(profile.age)} />
                        <InfoBox label="Age range" value={`${trial.min_age ?? '—'} – ${trial.max_age ?? '—'}`} />
                        <InfoBox label="Sex eligibility" value={trial.sex} />

                        {trial.locations?.length > 0 && (
                            <div className="rounded-2xl bg-slate-900/60 p-4 ring-1 ring-white/[0.06]">
                                <p className="text-xs uppercase tracking-wider text-slate-500">Locations</p>
                                <ul className="mt-2 space-y-1 text-sm text-slate-300">
                                    {trial.locations.map((loc, i) => (
                                        <li key={i}>{loc}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <a
                            href={trial.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 hover:from-teal-400 hover:to-cyan-500"
                        >
                            View on ClinicalTrials.gov
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function InfoBox({ label, value }) {
    return (
        <div className="rounded-2xl bg-slate-900/60 p-4 ring-1 ring-white/[0.06]">
            <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
            <p className="mt-1 font-medium text-white">{value}</p>
        </div>
    );
}
