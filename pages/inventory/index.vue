<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <p class="mt-2 text-gray-600">Manage your products, variants, and stock levels</p>
      </div>
      <div class="flex space-x-3">
        <NuxtLink to="/inventory/products/new" class="btn-primary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Add Product
        </NuxtLink>
        <button class="btn-secondary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            ></path>
          </svg>
          Import Products
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="stat-card">
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  class="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Products</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalProducts }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="stat-card">
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  class="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">In Stock</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.inStock }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="stat-card">
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg
                  class="w-4 h-4 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 14.5c-.77.833.192 2.5 1.732 2.5z"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Low Stock</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.lowStock }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="stat-card">
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  class="w-4 h-4 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Out of Stock</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.outOfStock }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="card mb-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <label class="sr-only">Search products</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              class="input-field pl-10"
              placeholder="Search products by name, SKU, or category..."
            />
          </div>
        </div>
        <div class="flex gap-3">
          <select v-model="selectedCategory" class="input-field">
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
          <select v-model="stockFilter" class="input-field">
            <option value="">All Stock Levels</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Products Table -->
    <div class="card">
      <div class="overflow-x-auto">
        <table class="table">
          <thead class="bg-gray-50">
            <tr>
              <th class="table-header">Product</th>
              <th class="table-header">SKU</th>
              <th class="table-header">Category</th>
              <th class="table-header">Price</th>
              <th class="table-header">Stock</th>
              <th class="table-header">Status</th>
              <th class="table-header">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in filteredProducts" :key="product.id">
              <td class="table-cell">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-12 w-12">
                    <img
                      class="h-12 w-12 rounded-md object-cover"
                      :src="product.image || '/placeholder-product.jpg'"
                      :alt="product.name"
                    />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                    <div class="text-sm text-gray-500">{{ product.description }}</div>
                  </div>
                </div>
              </td>
              <td class="table-cell">
                <span class="text-sm font-mono text-gray-900">{{ product.sku }}</span>
              </td>
              <td class="table-cell">
                <span class="text-sm text-gray-900">
                  {{ product.category?.name || "Uncategorized" }}
                </span>
              </td>
              <td class="table-cell">
                <span class="text-sm text-gray-900">${{ product.price.toFixed(2) }}</span>
              </td>
              <td class="table-cell">
                <span class="text-sm text-gray-900">{{ product.stockQuantity }}</span>
              </td>
              <td class="table-cell">
                <span
                  :class="getStockStatusClass(product.stockQuantity, product.lowStockThreshold)"
                >
                  {{ getStockStatus(product.stockQuantity, product.lowStockThreshold) }}
                </span>
              </td>
              <td class="table-cell">
                <div class="flex space-x-2">
                  <button @click="editProduct(product)" class="text-blue-600 hover:text-blue-900">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                  </button>
                  <button @click="deleteProduct(product)" class="text-red-600 hover:text-red-900">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="filteredProducts.length === 0" class="text-center py-12">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7"
            ></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No products found</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by adding your first product.</p>
          <div class="mt-6">
            <NuxtLink to="/inventory/products/new" class="btn-primary">Add Product</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
definePageMeta({
  title: "Inventory Management",
});

// Reactive data
const searchQuery = ref("");
const selectedCategory = ref("");
const stockFilter = ref("");

// API data
const { data: statsData } = await $fetch("/api/inventory/stats");
const { data: categoriesData } = await $fetch("/api/inventory/categories");
const { data: productsData } = await $fetch("/api/inventory/products");

const stats = ref(
  statsData || {
    totalProducts: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
  }
);

const categories = ref(categoriesData || []);
const products = ref(productsData || []);

// Computed properties
const filteredProducts = computed(() => {
  let filtered = products.value;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.category?.name.toLowerCase().includes(query)
    );
  }

  // Category filter
  if (selectedCategory.value) {
    filtered = filtered.filter(
      (product) => product.category?.id === parseInt(selectedCategory.value)
    );
  }

  // Stock filter
  if (stockFilter.value) {
    filtered = filtered.filter((product) => {
      const status = getStockStatus(product.stockQuantity, product.lowStockThreshold);
      switch (stockFilter.value) {
        case "in-stock":
          return status === "In Stock";
        case "low-stock":
          return status === "Low Stock";
        case "out-of-stock":
          return status === "Out of Stock";
        default:
          return true;
      }
    });
  }

  return filtered;
});

// Methods
const getStockStatus = (quantity, threshold) => {
  if (quantity === 0) return "Out of Stock";
  if (quantity <= threshold) return "Low Stock";
  return "In Stock";
};

const getStockStatusClass = (quantity, threshold) => {
  const status = getStockStatus(quantity, threshold);
  const baseClasses = "inline-flex px-2 py-1 text-xs font-semibold rounded-full";

  switch (status) {
    case "In Stock":
      return `${baseClasses} bg-green-100 text-green-800`;
    case "Low Stock":
      return `${baseClasses} bg-yellow-100 text-yellow-800`;
    case "Out of Stock":
      return `${baseClasses} bg-red-100 text-red-800`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`;
  }
};

const editProduct = (product) => {
  // Navigate to edit page or open modal
  navigateTo(`/inventory/products/${product.id}/edit`);
};

const deleteProduct = async (product) => {
  if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
    try {
      await $fetch(`/api/inventory/products/${product.id}`, {
        method: "DELETE",
      });

      // Remove from local array
      const index = products.value.findIndex((p) => p.id === product.id);
      if (index > -1) {
        products.value.splice(index, 1);
      }

      // Refresh stats
      const { data: newStats } = await $fetch("/api/inventory/stats");
      stats.value = newStats;
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product. Please try again.");
    }
  }
};
</script>
