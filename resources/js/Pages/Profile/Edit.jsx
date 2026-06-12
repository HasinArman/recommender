import { Head, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { route } from '../../utils/route';

const inputClass =
    'w-full rounded-xl border-0 bg-slate-900/60 px-4 py-3.5 text-white ring-1 ring-white/10 placeholder:text-slate-600 focus:ring-2 focus:ring-teal-500/50 transition';

export default function Edit({ profile, conditions }) {
    const { data, setData, post, processing, errors } = useForm({
        condition: profile?.condition ?? '',
        age: profile?.age ?? '',
        sex: profile?.sex ?? 'ALL',
        country: profile?.country ?? '',
        city: profile?.city ?? '',
        keywords: profile?.keywords ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.store'));
    };

    const pickCondition = (value) => setData('condition', value);

    return (
        <AppLayout
            title="Your health profile"
            subtitle="We use this information to search ClinicalTrials.gov and rank trials by how well they match you."
        >
            <Head title="Health profile" />

            <form onSubmit={submit} className="mx-auto max-w-2xl">
                <div className="glass-strong space-y-8 rounded-3xl p-6 sm:p-10">
                    <section>
                        <label className="block text-sm font-medium text-slate-300">Medical condition *</label>
                        <p className="mt-1 text-sm text-slate-500">
                            Can&apos;t find yours below? <span className="text-teal-400/90">Type it in the box</span> — any condition works.
                        </p>
                        <input
                            type="text"
                            value={data.condition}
                            onChange={(e) => setData('condition', e.target.value)}
                            className={`mt-3 ${inputClass}`}
                            placeholder="Type your condition, e.g. Lupus, Crohn's Disease, Hypertension…"
                        />
                        {errors.condition && <p className="mt-1 text-sm text-red-400">{errors.condition}</p>}
                        <p className="mt-2 text-xs text-slate-600">Popular conditions — tap to fill the box, or enter your own.</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {conditions.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => pickCondition(c)}
                                    className={`rounded-full px-3 py-1 text-xs transition ring-1 ${
                                        data.condition === c
                                            ? 'bg-teal-500/20 text-teal-300 ring-teal-500/40'
                                            : 'bg-white/5 text-slate-400 ring-white/10 hover:text-white'
                                    }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </section>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <section>
                            <label className="block text-sm font-medium text-slate-300">Age *</label>
                            <input
                                type="number"
                                min={18}
                                max={100}
                                value={data.age}
                                onChange={(e) => setData('age', e.target.value)}
                                className={`mt-2 ${inputClass}`}
                            />
                            {errors.age && <p className="mt-1 text-sm text-red-400">{errors.age}</p>}
                        </section>

                        <section>
                            <label className="block text-sm font-medium text-slate-300">Sex *</label>
                            <select
                                value={data.sex}
                                onChange={(e) => setData('sex', e.target.value)}
                                className={`mt-2 ${inputClass}`}
                            >
                                <option value="ALL">All / Any</option>
                                <option value="FEMALE">Female</option>
                                <option value="MALE">Male</option>
                            </select>
                        </section>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <section>
                            <label className="block text-sm font-medium text-slate-300">Country *</label>
                            <input
                                type="text"
                                value={data.country}
                                onChange={(e) => setData('country', e.target.value)}
                                className={`mt-2 ${inputClass}`}
                                placeholder="Germany"
                            />
                            {errors.country && <p className="mt-1 text-sm text-red-400">{errors.country}</p>}
                        </section>

                        <section>
                            <label className="block text-sm font-medium text-slate-300">City (optional)</label>
                            <input
                                type="text"
                                value={data.city}
                                onChange={(e) => setData('city', e.target.value)}
                                className={`mt-2 ${inputClass}`}
                                placeholder="Munich"
                            />
                        </section>
                    </div>

                    <section>
                        <label className="block text-sm font-medium text-slate-300">Keywords (optional)</label>
                        <input
                            type="text"
                            value={data.keywords}
                            onChange={(e) => setData('keywords', e.target.value)}
                            className={`mt-2 ${inputClass}`}
                            placeholder="metformin, lifestyle (comma-separated)"
                        />
                        <p className="mt-2 text-xs text-slate-600">Helps match trials that mention treatments or topics you care about.</p>
                    </section>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-600 py-4 text-sm font-semibold text-white shadow-xl shadow-teal-500/20 transition hover:from-teal-400 hover:to-cyan-500 disabled:opacity-50"
                    >
                        {processing ? 'Searching trials…' : 'Find matching clinical trials →'}
                    </button>
                </div>
            </form>
        </AppLayout>
    );
}
