<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Customer Management</h1>
        <p class="mt-2 text-gray-600">Manage customer information and order history</p>
      </div>
      <div class="flex space-x-3">
        <NuxtLink to="/customers/new" class="btn-primary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Add Customer
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
          Export Customers
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Customers</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalCustomers }}</p>
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Active Customers</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.activeCustomers }}</p>
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Avg Order Value</p>
              <p class="text-2xl font-semibold text-gray-900">${{ stats.avgOrderValue }}</p>
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">New This Month</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.newThisMonth }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="card mb-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <label class="sr-only">Search customers</label>
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
              placeholder="Search by name, email, or phone..."
            />
          </div>
        </div>
        <div class="flex gap-3">
          <select v-model="statusFilter" class="input-field">
            <option value="">All Customers</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select v-model="sortBy" class="input-field">
            <option value="name">Sort by Name</option>
            <option value="orders">Sort by Orders</option>
            <option value="spending">Sort by Spending</option>
            <option value="lastOrder">Sort by Last Order</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Customers Table -->
    <div class="card">
      <div class="overflow-x-auto">
        <table class="table">
          <thead class="bg-gray-50">
            <tr>
              <th class="table-header">Customer</th>
              <th class="table-header">Contact</th>
              <th class="table-header">Orders</th>
              <th class="table-header">Total Spent</th>
              <th class="table-header">Last Order</th>
              <th class="table-header">Status</th>
              <th class="table-header">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="customer in filteredCustomers" :key="customer.id">
              <td class="table-cell">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div
                      class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center"
                    >
                      <span class="text-sm font-medium text-gray-700">
                        {{ customer.name.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ customer.name }}</div>
                    <div class="text-sm text-gray-500">
                      Customer since {{ formatDate(customer.createdAt) }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="table-cell">
                <div>
                  <div class="text-sm text-gray-900">{{ customer.email }}</div>
                  <div class="text-sm text-gray-500">{{ customer.phone || "No phone" }}</div>
                </div>
              </td>
              <td class="table-cell">
                <span class="text-sm text-gray-900">{{ customer.totalOrders }} orders</span>
              </td>
              <td class="table-cell">
                <span class="text-sm font-medium text-gray-900">
                  ${{ customer.totalSpent.toFixed(2) }}
                </span>
              </td>
              <td class="table-cell">
                <div v-if="customer.lastOrder">
                  <div class="text-sm text-gray-900">{{ formatDate(customer.lastOrder) }}</div>
                  <div class="text-sm text-gray-500">{{ getTimeSince(customer.lastOrder) }}</div>
                </div>
                <span v-else class="text-sm text-gray-500">No orders</span>
              </td>
              <td class="table-cell">
                <span :class="getStatusClass(customer.status)">
                  {{ customer.status.charAt(0).toUpperCase() + customer.status.slice(1) }}
                </span>
              </td>
              <td class="table-cell">
                <div class="flex space-x-2">
                  <button @click="viewCustomer(customer)" class="text-blue-600 hover:text-blue-900">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    @click="editCustomer(customer)"
                    class="text-green-600 hover:text-green-900"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    @click="contactCustomer(customer)"
                    class="text-purple-600 hover:text-purple-900"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="filteredCustomers.length === 0" class="text-center py-12">
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            ></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No customers found</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by adding your first customer.</p>
          <div class="mt-6">
            <NuxtLink to="/customers/new" class="btn-primary">Add Customer</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
definePageMeta({
  title: "Customer Management",
});

// Reactive data
const searchQuery = ref("");
const statusFilter = ref("");
const sortBy = ref("name");

// Mock data
const stats = ref({
  totalCustomers: 156,
  activeCustomers: 142,
  avgOrderValue: 85.5,
  newThisMonth: 23,
});

const customers = ref([
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    phone: "+1-555-0123",
    totalOrders: 15,
    totalSpent: 1250.75,
    lastOrder: new Date("2024-01-10"),
    createdAt: new Date("2023-06-15"),
    status: "active",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1-555-0456",
    totalOrders: 8,
    totalSpent: 680.25,
    lastOrder: new Date("2024-01-05"),
    createdAt: new Date("2023-08-20"),
    status: "active",
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike@example.com",
    phone: null,
    totalOrders: 3,
    totalSpent: 245.5,
    lastOrder: new Date("2023-12-15"),
    createdAt: new Date("2023-11-10"),
    status: "inactive",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily@example.com",
    phone: "+1-555-0789",
    totalOrders: 22,
    totalSpent: 1890.4,
    lastOrder: new Date("2024-01-12"),
    createdAt: new Date("2023-03-08"),
    status: "active",
  },
]);

// Computed properties
const filteredCustomers = computed(() => {
  let filtered = customers.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        (customer.phone && customer.phone.includes(query))
    );
  }

  if (statusFilter.value) {
    filtered = filtered.filter((customer) => customer.status === statusFilter.value);
  }

  // Sort customers
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case "name":
        return a.name.localeCompare(b.name);
      case "orders":
        return b.totalOrders - a.totalOrders;
      case "spending":
        return b.totalSpent - a.totalSpent;
      case "lastOrder":
        return new Date(b.lastOrder) - new Date(a.lastOrder);
      default:
        return 0;
    }
  });

  return filtered;
});

// Methods
const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const getTimeSince = (date) => {
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "1 day ago";
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

const getStatusClass = (status) => {
  const baseClasses = "inline-flex px-2 py-1 text-xs font-semibold rounded-full";

  switch (status) {
    case "active":
      return `${baseClasses} bg-green-100 text-green-800`;
    case "inactive":
      return `${baseClasses} bg-gray-100 text-gray-800`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`;
  }
};

const viewCustomer = (customer) => {
  navigateTo(`/customers/${customer.id}`);
};

const editCustomer = (customer) => {
  navigateTo(`/customers/${customer.id}/edit`);
};

const contactCustomer = (customer) => {
  // WhatsApp integration or email
  const message = `Hello ${customer.name}, thank you for being our valued customer!`;
  if (customer.phone) {
    window.open(
      `https://wa.me/${customer.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`
    );
  } else {
    window.open(`mailto:${customer.email}?subject=Thank you&body=${message}`);
  }
};
</script>
