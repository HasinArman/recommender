<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        if ($request->user()->healthProfile) {
            return redirect()->route('trials.index');
        }

        return redirect()->route('profile.edit');
    }
}
