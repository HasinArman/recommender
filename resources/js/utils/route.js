export function route(name, params = {}) {
    const routes = {
        home: '/',
        login: '/login',
        register: '/register',
        logout: '/logout',
        dashboard: '/dashboard',
        'profile.edit': '/profile',
        'profile.store': '/profile',
        'trials.index': '/trials',
        'trials.show': `/trials/${params.nctId ?? params}`,
    };

    return routes[name] ?? '/';
}
