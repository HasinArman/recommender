import { Link } from '@inertiajs/react';
import MatchRing from './MatchRing';
import { route } from '../utils/route';

const statusStyles = {
    RECRUITING: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
    ACTIVE_NOT_RECRUITING: 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
    COMPLETED: 'bg-slate-500/15 text-slate-400 ring-slate-500/30',
};

export default function TrialCard({ trial }) {
    const statusClass = statusStyles[trial.status] ?? 'bg-slate-500/15 text-slate-400 ring-slate-500/30';

    return (
        <Link
            href={route('trials.show', trial.nct_id)}
            className="group glass-strong flex flex-col overflow-hidden rounded-2xl transition duration-300 hover:border-teal-500/30 hover:shadow-teal-500/10 hover:shadow-xl sm:flex-row"
        >
            <div className="flex shrink-0 items-center justify-center border-b border-white/[0.06] bg-gradient-to-br from-teal-500/10 to-cyan-500/5 p-6 sm:w-28 sm:border-b-0 sm:border-r">
                <MatchRing percent={trial.match_percent} />
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ${statusClass}`}>
                        {trial.status?.replace(/_/g, ' ')}
                    </span>
                    <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-medium text-cyan-300 ring-1 ring-cyan-500/20">
                        {trial.phase_label}
                    </span>
                    <span className="font-mono text-[10px] text-slate-600">{trial.nct_id}</span>
                </div>

                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-white transition group-hover:text-teal-300">
                    {trial.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">{trial.summary}</p>

                {trial.locations?.length > 0 && (
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                        <svg className="h-3.5 w-3.5 shrink-0 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {trial.locations[0]}
                        {trial.locations.length > 1 && ` +${trial.locations.length - 1} more`}
                    </p>
                )}

                <ul className="mt-4 space-y-1 border-t border-white/[0.06] pt-4">
                    {trial.reasons?.slice(0, 2).map((reason, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-teal-200/80">
                            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-teal-400" />
                            {reason}
                        </li>
                    ))}
                </ul>
            </div>
        </Link>
    );
}
