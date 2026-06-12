import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '../../Layouts/GuestLayout';
import AuthField, { buttonClass } from '../../Components/Auth/AuthField';
import { route } from '../../utils/route';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout
            title="Welcome back"
            subtitle="Sign in to view clinical trials matched to your health profile."
            footer={
                <p className="mt-8 text-center text-sm text-slate-400">
                    No account?{' '}
                    <Link href={route('register')} className="font-semibold text-teal-400 hover:text-teal-300">
                        Create one free
                    </Link>
                </p>
            }
        >
            <Head title="Log in" />

            <form onSubmit={submit} className="space-y-5">
                <AuthField
                    label="Email address"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                    placeholder="you@example.com"
                    autoComplete="email"
                />

                <AuthField
                    label="Password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    placeholder="••••••••"
                    autoComplete="current-password"
                />

                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-400">
                    <input
                        type="checkbox"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="h-4 w-4 rounded border-white/20 bg-slate-950/50 text-teal-500 focus:ring-teal-500/50"
                    />
                    Keep me signed in
                </label>

                <button type="submit" disabled={processing} className={buttonClass}>
                    {processing ? 'Signing in…' : 'Sign in'}
                </button>
            </form>

            <div className="mt-6 rounded-xl border border-teal-500/20 bg-teal-500/5 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wider text-teal-400/80">Demo account</p>
                <p className="mt-1 font-mono text-sm text-slate-300">
                    demo@trialmatch.test <span className="text-slate-600">/</span> password
                </p>
            </div>
        </GuestLayout>
    );
}
