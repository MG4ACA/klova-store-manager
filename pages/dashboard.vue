<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="mt-2 text-gray-600">Welcome to Klova Store Manager</p>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Today's Sales -->
      <div class="card">
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
            <p class="text-sm font-medium text-gray-600">Today's Sales</p>
            <p class="text-2xl font-semibold text-gray-900">Rs {{ formatCurrency(todaysSales) }}</p>
          </div>
        </div>
      </div>

      <!-- Total Orders -->
      <div class="card">
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Orders</p>
            <p class="text-2xl font-semibold text-gray-900">{{ totalOrders }}</p>
          </div>
        </div>
      </div>

      <!-- Low Stock Items -->
      <div class="card">
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Low Stock Items</p>
            <p class="text-2xl font-semibold text-gray-900">{{ lowStockCount }}</p>
          </div>
        </div>
      </div>

      <!-- Total Customers -->
      <div class="card">
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Customers</p>
            <p class="text-2xl font-semibold text-gray-900">{{ totalCustomers }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Recent Orders -->
      <div class="card">
        <div class="card-header">
          <h3 class="text-lg font-medium text-gray-900">Recent Orders</h3>
        </div>
        <div class="space-y-4">
          <div
            v-for="order in recentOrders"
            :key="order.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <p class="font-medium text-gray-900">#{{ order.orderNumber }}</p>
              <p class="text-sm text-gray-600">{{ order.customer || "Walk-in Customer" }}</p>
            </div>
            <div class="text-right">
              <p class="font-medium text-gray-900">Rs {{ formatCurrency(order.total) }}</p>
              <span :class="getStatusBadgeClass(order.status)">
                {{ order.status }}
              </span>
            </div>
          </div>
          <div v-if="recentOrders.length === 0" class="text-center text-gray-500 py-4">
            No recent orders
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card">
        <div class="card-header">
          <h3 class="text-lg font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <NuxtLink
            to="/orders/new"
            class="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <svg
              class="w-8 h-8 text-blue-600 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            <span class="text-sm font-medium text-blue-900">New Order</span>
          </NuxtLink>

          <NuxtLink
            to="/inventory/products/new"
            class="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <svg
              class="w-8 h-8 text-green-600 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              ></path>
            </svg>
            <span class="text-sm font-medium text-green-900">Add Product</span>
          </NuxtLink>

          <NuxtLink
            to="/customers/new"
            class="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <svg
              class="w-8 h-8 text-purple-600 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              ></path>
            </svg>
            <span class="text-sm font-medium text-purple-900">Add Customer</span>
          </NuxtLink>

          <NuxtLink
            to="/reports"
            class="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              class="w-8 h-8 text-gray-600 mb-2"
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
            <span class="text-sm font-medium text-gray-900">View Reports</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Low Stock Alert -->
    <div v-if="lowStockItems.length > 0" class="card">
      <div class="card-header">
        <h3 class="text-lg font-medium text-gray-900">Low Stock Alert</h3>
      </div>
      <div class="space-y-3">
        <div
          v-for="item in lowStockItems"
          :key="item.id"
          class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200"
        >
          <div>
            <p class="font-medium text-gray-900">{{ item.product.name }}</p>
            <p class="text-sm text-gray-600">{{ item.size }} - {{ item.color }}</p>
          </div>
          <div class="text-right">
            <p class="font-medium text-red-600">{{ item.stock }} remaining</p>
            <p class="text-xs text-gray-500">Min: {{ item.minStock }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

// Set page layout
definePageMeta({
  layout: "default",
});

// Reactive data
const todaysSales = ref(125000);
const totalOrders = ref(45);
const lowStockCount = ref(8);
const totalCustomers = ref(156);
const recentOrders = ref([]);
const lowStockItems = ref([]);

// Mock data for development
const mockRecentOrders = [
  {
    id: "1",
    orderNumber: "ORD-001",
    customer: "John Doe",
    total: 15000,
    status: "COMPLETED",
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    customer: "Jane Smith",
    total: 25000,
    status: "PENDING",
  },
  {
    id: "3",
    orderNumber: "ORD-003",
    customer: null,
    total: 8500,
    status: "PROCESSING",
  },
];

const mockLowStockItems = [
  {
    id: "1",
    product: { name: "Cotton T-Shirt" },
    size: "L",
    color: "Blue",
    stock: 3,
    minStock: 5,
  },
  {
    id: "2",
    product: { name: "Denim Jeans" },
    size: "M",
    color: "Black",
    stock: 2,
    minStock: 5,
  },
];

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-LK").format(amount);
};

const getStatusBadgeClass = (status) => {
  const classes = {
    COMPLETED: "badge-success",
    PENDING: "badge-warning",
    PROCESSING: "badge-warning",
    CANCELLED: "badge-danger",
  };
  return classes[status] || "badge-warning";
};

const loadDashboardData = async () => {
  try {
    // In a real app, these would be API calls
    recentOrders.value = mockRecentOrders;
    lowStockItems.value = mockLowStockItems;

    // TODO: Implement real API calls
    // const [ordersRes, stockRes] = await Promise.all([
    //   $fetch('/api/orders/recent'),
    //   $fetch('/api/inventory/low-stock')
    // ])
    // recentOrders.value = ordersRes
    // lowStockItems.value = stockRes
  } catch (error) {
    console.error("Error loading dashboard data:", error);
  }
};

// Load data on component mount
onMounted(() => {
  loadDashboardData();
});
</script>
