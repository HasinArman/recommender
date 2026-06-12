import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '../../Layouts/GuestLayout';
import AuthField, { buttonClass } from '../../Components/Auth/AuthField';
import { route } from '../../utils/route';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout
            title="Create your account"
            subtitle="Join TrialMatch to find clinical trials tailored to your condition and location."
            footer={
                <p className="mt-8 text-center text-sm text-slate-400">
                    Already registered?{' '}
                    <Link href={route('login')} className="font-semibold text-teal-400 hover:text-teal-300">
                        Sign in
                    </Link>
                </p>
            }
        >
            <Head title="Register" />

            <form onSubmit={submit} className="space-y-5">
                <AuthField
                    label="Full name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                    placeholder="Jane Doe"
                    autoComplete="name"
                />

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
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
                />

                <AuthField
                    label="Confirm password"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    error={errors.password_confirmation}
                    placeholder="Repeat password"
                    autoComplete="new-password"
                />

                <button type="submit" disabled={processing} className={buttonClass}>
                    {processing ? 'Creating account…' : 'Create account'}
                </button>
            </form>

            <p className="mt-6 text-center text-xs leading-relaxed text-slate-600">
                By creating an account you agree this tool is for academic research only and does not provide medical advice.
            </p>
        </GuestLayout>
    );
}
