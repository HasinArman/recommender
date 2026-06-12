import { Link, usePage } from '@inertiajs/react';
import { route } from '../utils/route';

export default function AppLayout({ children, title, subtitle }) {
    const { auth, appName, appTagline, flash } = usePage().props;
    const user = auth?.user;

    return (
        <div className="min-h-screen health-gradient">
            <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-slate-950/70 backdrop-blur-2xl">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
                    <Link href={route('home')} className="group flex items-center gap-3">
                        <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-600 shadow-lg shadow-teal-500/25">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-display text-lg font-semibold tracking-tight text-white group-hover:text-teal-300 transition">{appName}</p>
                            <p className="max-w-[200px] text-[11px] leading-snug text-slate-500 sm:max-w-none">{appTagline}</p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-1 sm:gap-2">
                        {user ? (
                            <>
                                <NavLink href={route('profile.edit')}>Health profile</NavLink>
                                <NavLink href={route('trials.index')}>My trials</NavLink>
                                <span className="mx-2 hidden h-5 w-px bg-white/10 sm:block" />
                                <span className="hidden max-w-[120px] truncate text-sm text-slate-400 sm:block">{user.name}</span>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="ml-2 rounded-xl px-3 py-2 text-sm text-slate-400 ring-1 ring-white/10 transition hover:bg-white/5 hover:text-white"
                                >
                                    Sign out
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href={route('login')} className="rounded-xl px-4 py-2 text-sm text-slate-300 hover:text-white">
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 hover:from-teal-400 hover:to-cyan-500"
                                >
                                    Get started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {flash?.success && (
                <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
                    <div className="rounded-xl border border-teal-500/30 bg-teal-500/10 px-4 py-3 text-sm text-teal-200">
                        {flash.success}
                    </div>
                </div>
            )}

            {(title || subtitle) && (
                <header className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
                    {title && <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">{title}</h1>}
                    {subtitle && <p className="mt-2 max-w-2xl text-slate-400">{subtitle}</p>}
                </header>
            )}

            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>

            <footer className="mx-auto max-w-6xl border-t border-white/[0.06] px-4 py-8 text-center text-xs text-slate-600 sm:px-6">
                For research & education only — not medical advice. Always consult a healthcare professional.
            </footer>
        </div>
    );
}

function NavLink({ href, children }) {
    return (
        <Link href={href} className="rounded-xl px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-teal-300">
            {children}
        </Link>
    );
}
