<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        if (is_file(public_path('hot')) && getenv('CODESPACE_NAME')) {
            @unlink(public_path('hot'));
        }

        // Relative /build/... paths work in Codespaces (APP_URL=localhost breaks absolute asset URLs).
        Vite::createAssetPathsUsing(
            fn (string $path) => '/'.ltrim($path, '/')
        );

        if ($this->app->runningInConsole() || ! getenv('CODESPACE_NAME')) {
            return;
        }

        $request = request();

        if ($request->getHost()) {
            URL::forceRootUrl($request->getSchemeAndHttpHost());
        }
    }
}
