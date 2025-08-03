<template>
  <div class="min-h-screen bg-white">
    <!-- Public Header -->
    <header class="bg-white shadow">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <h1 class="text-2xl font-bold text-gray-900">Klova Store</h1>
            </div>
            <div class="hidden sm:ml-10 sm:flex sm:space-x-8">
              <NuxtLink
                to="/showcase"
                class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                active-class="border-blue-500 text-blue-600"
              >
                Products
              </NuxtLink>
              <NuxtLink
                to="/showcase/categories"
                class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                active-class="border-blue-500 text-blue-600"
              >
                Categories
              </NuxtLink>
              <NuxtLink
                to="/showcase/contact"
                class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                active-class="border-blue-500 text-blue-600"
              >
                Contact
              </NuxtLink>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <!-- WhatsApp Contact -->
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.703"
                />
              </svg>
              WhatsApp Order
            </a>

            <!-- Admin Login -->
            <NuxtLink to="/login" class="text-gray-500 hover:text-gray-700 text-sm font-medium">
              Admin Login
            </NuxtLink>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-50 border-t border-gray-200">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="col-span-1 md:col-span-2">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Klova Store</h3>
            <p class="text-gray-600">
              Premium clothing for bulk and retail sales. Quality garments with excellent service.
            </p>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Products
            </h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-600 hover:text-gray-900">Men's Clothing</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-900">Women's Clothing</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-900">Kids' Clothing</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul class="space-y-2">
              <li class="text-gray-600">Phone: +94 123 456 789</li>
              <li class="text-gray-600">Email: info@klovastore.com</li>
              <li class="text-gray-600">Address: Colombo, Sri Lanka</li>
            </ul>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-200">
          <p class="text-center text-gray-600">&copy; 2025 Klova Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// This layout is for the public showcase/ecommerce pages
</script>
