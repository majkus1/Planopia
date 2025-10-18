import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Planopia - Darmowa aplikacja do ewidencji czasu pracy i urlopów',
    short_name: 'Planopia',
    description: 'Darmowa aplikacja online do ewidencji czasu pracy i zarządzania urlopami dla zespołów do 8 osób.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
