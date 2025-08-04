<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
      <p class="mt-2 text-gray-600">
        View sales reports, inventory analytics, and business insights
      </p>
    </div>

    <!-- Date Range Selector -->
    <div class="card mb-8">
      <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div class="flex gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <input v-model="dateRange.from" type="date" class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <input v-model="dateRange.to" type="date" class="input-field" />
          </div>
        </div>
        <div class="flex gap-2">
          <button @click="setDateRange('today')" class="btn-secondary">Today</button>
          <button @click="setDateRange('week')" class="btn-secondary">This Week</button>
          <button @click="setDateRange('month')" class="btn-secondary">This Month</button>
          <button @click="exportReports" class="btn-primary">Export Report</button>
        </div>
      </div>
    </div>

    <!-- Overview Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Revenue</p>
              <p class="text-2xl font-semibold text-gray-900">
                ${{ stats.totalRevenue.toLocaleString() }}
              </p>
              <p class="text-sm text-green-600">+12% from last period</p>
            </div>
          </div>
        </div>
      </div>

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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Orders</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalOrders }}</p>
              <p class="text-sm text-blue-600">+8% from last period</p>
            </div>
          </div>
        </div>
      </div>

      <div class="stat-card">
        <div class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <svg
                  class="w-4 h-4 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Avg Order Value</p>
              <p class="text-2xl font-semibold text-gray-900">${{ stats.avgOrderValue }}</p>
              <p class="text-sm text-purple-600">+5% from last period</p>
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
                    d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Products Sold</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.productsSold }}</p>
              <p class="text-sm text-yellow-600">+15% from last period</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Sales Trend Chart -->
      <div class="card">
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Sales Trend</h3>
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
              <p class="mt-2 text-sm text-gray-500">Sales trend chart will appear here</p>
              <p class="text-xs text-gray-400">Chart library integration needed</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Products Chart -->
      <div class="card">
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Top Selling Products</h3>
          <div class="space-y-4">
            <div
              v-for="product in topProducts"
              :key="product.id"
              class="flex items-center justify-between"
            >
              <div class="flex items-center">
                <div class="w-10 h-10 bg-gray-200 rounded-md mr-3"></div>
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
                  <p class="text-xs text-gray-500">{{ product.category }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">{{ product.sold }} sold</p>
                <p class="text-xs text-gray-500">${{ product.revenue.toLocaleString() }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Reports -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Sales by Category -->
      <div class="card">
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Sales by Category</h3>
          <div class="space-y-3">
            <div
              v-for="category in salesByCategory"
              :key="category.name"
              class="flex items-center justify-between"
            >
              <div class="flex items-center">
                <div
                  class="w-3 h-3 rounded-full mr-3"
                  :style="{ backgroundColor: category.color }"
                ></div>
                <span class="text-sm text-gray-700">{{ category.name }}</span>
              </div>
              <div class="text-right">
                <span class="text-sm font-medium text-gray-900">
                  ${{ category.revenue.toLocaleString() }}
                </span>
                <span class="text-xs text-gray-500 ml-2">{{ category.percentage }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Low Stock Alert -->
      <div class="card">
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Low Stock Alert</h3>
          <div class="space-y-3">
            <div
              v-for="item in lowStockItems"
              :key="item.id"
              class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg"
            >
              <div>
                <p class="text-sm font-medium text-gray-900">{{ item.name }}</p>
                <p class="text-xs text-gray-500">SKU: {{ item.sku }}</p>
              </div>
              <div class="text-right">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800"
                >
                  {{ item.stock }} left
                </span>
              </div>
            </div>
            <div v-if="lowStockItems.length === 0" class="text-center py-4">
              <p class="text-sm text-gray-500">All products are well stocked!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
definePageMeta({
  title: "Reports & Analytics",
});

// Reactive data
const dateRange = ref({
  from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 30 days ago
  to: new Date().toISOString().split("T")[0], // today
});

// Mock data
const stats = ref({
  totalRevenue: 45230,
  totalOrders: 156,
  avgOrderValue: 89.5,
  productsSold: 342,
});

const topProducts = ref([
  { id: 1, name: "Classic Cotton T-Shirt", category: "Shirts", sold: 45, revenue: 1169.55 },
  { id: 2, name: "Denim Jeans", category: "Pants", sold: 32, revenue: 2559.68 },
  { id: 3, name: "Summer Dress", category: "Dresses", sold: 28, revenue: 1847.72 },
  { id: 4, name: "Casual Hoodie", category: "Outerwear", sold: 22, revenue: 1537.78 },
  { id: 5, name: "Sports Shoes", category: "Footwear", sold: 18, revenue: 1619.82 },
]);

const salesByCategory = ref([
  { name: "Shirts", revenue: 12500, percentage: 28, color: "#3B82F6" },
  { name: "Pants", revenue: 10200, percentage: 23, color: "#10B981" },
  { name: "Dresses", revenue: 8800, percentage: 19, color: "#8B5CF6" },
  { name: "Outerwear", revenue: 7300, percentage: 16, color: "#F59E0B" },
  { name: "Accessories", revenue: 6430, percentage: 14, color: "#EF4444" },
]);

const lowStockItems = ref([
  { id: 1, name: "Classic White Shirt", sku: "SKU001", stock: 3 },
  { id: 2, name: "Blue Denim Jeans", sku: "SKU002", stock: 5 },
  { id: 3, name: "Red Summer Dress", sku: "SKU003", stock: 2 },
]);

// Methods
const setDateRange = (period) => {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  switch (period) {
    case "today":
      dateRange.value.from = todayStr;
      dateRange.value.to = todayStr;
      break;
    case "week":
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      dateRange.value.from = weekAgo.toISOString().split("T")[0];
      dateRange.value.to = todayStr;
      break;
    case "month":
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      dateRange.value.from = monthAgo.toISOString().split("T")[0];
      dateRange.value.to = todayStr;
      break;
  }
};

const exportReports = () => {
  // Generate CSV or PDF report
  const reportData = {
    dateRange: dateRange.value,
    stats: stats.value,
    topProducts: topProducts.value,
    salesByCategory: salesByCategory.value,
  };

  // For now, just download as JSON
  const dataStr = JSON.stringify(reportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `sales-report-${dateRange.value.from}-to-${dateRange.value.to}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

// Watch for date range changes
watch(
  dateRange,
  () => {
    // Fetch new data based on date range
    console.log("Date range changed:", dateRange.value);
  },
  { deep: true }
);
</script>
