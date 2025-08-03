// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    // Private keys (only available on the server)
    jwtSecret: process.env.JWT_SECRET || 'klova-pos-secret-key',
    // Public keys (exposed to the client)
    public: {
      appName: 'Klova Store Manager',
      whatsappBusinessApiUrl: process.env.WHATSAPP_API_URL || '',
      whatsappBusinessToken: process.env.WHATSAPP_TOKEN || ''
    }
  },
  ssr: true,
  pages: true,
  app: {
    head: {
      title: 'Klova Store Manager - POS & Inventory System',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Complete POS and inventory management system for clothing business with ecommerce showcase' 
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
