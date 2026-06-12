export const inputClass =
    'w-full rounded-xl border-0 bg-slate-950/50 px-4 py-3.5 text-white ring-1 ring-white/10 placeholder:text-slate-600 transition focus:outline-none focus:ring-2 focus:ring-teal-500/60';

export const labelClass = 'mb-1.5 block text-sm font-medium text-slate-300';

export const buttonClass =
    'w-full rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition hover:from-teal-400 hover:to-cyan-500 disabled:cursor-not-allowed disabled:opacity-50';

export default function AuthField({ label, type = 'text', value, onChange, error, placeholder, autoComplete }) {
    return (
        <div>
            <label className={labelClass}>{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className={inputClass}
            />
            {error && <p className="mt-1.5 text-sm text-rose-400">{error}</p>}
        </div>
    );
}
