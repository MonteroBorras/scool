<?php

namespace App\Http\Middleware;

use Closure;
use Config;

/**
 * Class EnforceTenancy.
 *
 * @package App\Http\Middleware
 */
class EnforceTenancy
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (env('APP_ENV') === 'testing') {
            return $next($request);
        }
        Config::set('database.default', 'tenant');
        return $next($request);
    }
}
