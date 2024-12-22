
import serwist from '@serwist/next';

/** @type {import('next').NextConfig} */
const withSerwist = serwist({
    // Note: This is only an example. If you use Pages Router,
    // use something else that works, such as "service-worker/index.ts".
    cacheOnNavigation: true,
    register: false,
    swSrc: 'src/app/sw.ts',
    swDest: 'public/sw.js',
});

const nextConfig = withSerwist({
    async rewrites() {
        return [
            { source: '/healthz', destination: '/api/health' },
            { source: '/api/healthz', destination: '/api/health' },
            { source: '/health', destination: '/api/health' },
            { source: '/ping', destination: '/api/health' },
            {
                source: '/tag-manager/:path*',
                destination:
                    'https://www.googletagmanager.com/gtm.js/:path*',
            },
            {
                source: '/tag-manager-analytics/:path*',
                destination: 'https://www.googletagmanager.com/gtag/js/:path*',
            },
        ];
    },
})

export default nextConfig;
