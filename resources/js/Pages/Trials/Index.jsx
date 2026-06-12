import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import TrialCard from '../../Components/TrialCard';
import { route } from '../../utils/route';

export default function Index({ profile, trials, total }) {
    return (
        <AppLayout
            title="Recommended clinical trials"
            subtitle={`Ranked for ${profile.condition} · age ${profile.age} · ${profile.city ? `${profile.city}, ` : ''}${profile.country}`}
        >
            <Head title="Your trial matches" />

            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div className="glass rounded-2xl px-5 py-3">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Results</p>
                    <p className="font-display text-2xl font-semibold text-white">
                        {total} <span className="text-base font-normal text-slate-400">studies found</span>
                    </p>
                </div>
                <Link
                    href={route('profile.edit')}
                    className="rounded-xl bg-white/5 px-4 py-2.5 text-sm text-slate-300 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-teal-300"
                >
                    Edit health profile
                </Link>
            </div>

            {trials.length === 0 ? (
                <div className="glass-strong rounded-3xl p-16 text-center">
                    <p className="text-slate-400">No trials found. Try a broader condition or different country.</p>
                    <Link href={route('profile.edit')} className="mt-4 inline-block text-teal-400 hover:text-teal-300">
                        Update profile →
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {trials.map((trial) => (
                        <TrialCard key={trial.nct_id} trial={trial} />
                    ))}
                </div>
            )}

            <div className="mt-10 rounded-2xl border border-white/[0.06] bg-slate-900/50 p-5 text-xs leading-relaxed text-slate-500">
                Data sourced from ClinicalTrials.gov. Match scores are estimated from condition, age, sex, location, and keywords — not a guarantee of eligibility. Consult your healthcare provider before enrolling.
            </div>
        </AppLayout>
    );
}
