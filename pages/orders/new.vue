<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Create New Order</h1>
        <p class="mt-2 text-gray-600">
          Add products and customer information to create a new order
        </p>
      </div>
      <div class="flex space-x-3">
        <NuxtLink to="/orders" class="btn-secondary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to Orders
        </NuxtLink>
        <button
          @click="saveOrder"
          :disabled="!canSaveOrder"
          class="btn-primary"
          :class="{ 'opacity-50 cursor-not-allowed': !canSaveOrder }"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          Create Order
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Order Form -->
      <div class="lg:col-span-2">
        <!-- Customer Selection -->
        <div class="card mb-6">
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="form-label">Customer</label>
                <select v-model="order.customerId" class="input-field">
                  <option value="">Select Customer</option>
                  <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                    {{ customer.name }} ({{ customer.email }})
                  </option>
                </select>
              </div>
              <div class="flex items-end">
                <NuxtLink to="/customers/new" class="btn-secondary text-sm">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  Add New Customer
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Selection -->
        <div class="card mb-6">
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Add Products</h3>

            <!-- Product Search -->
            <div class="mb-4">
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
                  v-model="productSearch"
                  type="text"
                  class="input-field pl-10"
                  placeholder="Search products by name or SKU..."
                />
              </div>
            </div>

            <!-- Product List -->
            <div class="max-h-60 overflow-y-auto border rounded-lg">
              <div
                v-for="product in filteredProducts"
                :key="product.id"
                class="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-gray-50"
              >
                <div class="flex items-center">
                  <img
                    :src="product.image || '/placeholder-product.jpg'"
                    :alt="product.name"
                    class="w-12 h-12 rounded-md object-cover mr-3"
                  />
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
                    <p class="text-xs text-gray-500">{{ product.sku }} • ${{ product.price }}</p>
                    <p class="text-xs text-gray-500">Stock: {{ product.stockQuantity }}</p>
                  </div>
                </div>
                <button
                  @click="addProductToOrder(product)"
                  :disabled="product.stockQuantity === 0"
                  class="btn-primary text-sm"
                  :class="{ 'opacity-50 cursor-not-allowed': product.stockQuantity === 0 }"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="card">
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Order Items</h3>

            <div v-if="order.items.length === 0" class="text-center py-8">
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
              <p class="mt-2 text-sm text-gray-500">No items in this order yet</p>
              <p class="text-xs text-gray-400">Search and add products above</p>
            </div>

            <div v-else class="space-y-3">
              <div
                v-for="(item, index) in order.items"
                :key="index"
                class="flex items-center justify-between p-3 border rounded-lg"
              >
                <div class="flex items-center">
                  <img
                    :src="item.image || '/placeholder-product.jpg'"
                    :alt="item.name"
                    class="w-10 h-10 rounded-md object-cover mr-3"
                  />
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ item.name }}</p>
                    <p class="text-xs text-gray-500">{{ item.sku }} • ${{ item.price }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="flex items-center">
                    <button
                      @click="updateQuantity(index, item.quantity - 1)"
                      :disabled="item.quantity <= 1"
                      class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                      :class="{ 'opacity-50 cursor-not-allowed': item.quantity <= 1 }"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 12H4"
                        ></path>
                      </svg>
                    </button>
                    <span class="mx-3 text-sm font-medium">{{ item.quantity }}</span>
                    <button
                      @click="updateQuantity(index, item.quantity + 1)"
                      class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium text-gray-900">
                      ${{ (item.price * item.quantity).toFixed(2) }}
                    </p>
                  </div>
                  <button @click="removeItem(index)" class="text-red-600 hover:text-red-900">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="card sticky top-4">
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>

            <div class="space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Subtotal</span>
                <span class="text-gray-900">${{ orderSummary.subtotal.toFixed(2) }}</span>
              </div>

              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Tax (8.5%)</span>
                <span class="text-gray-900">${{ orderSummary.tax.toFixed(2) }}</span>
              </div>

              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Shipping</span>
                <span class="text-gray-900">${{ orderSummary.shipping.toFixed(2) }}</span>
              </div>

              <div class="border-t pt-3">
                <div class="flex justify-between text-lg font-medium">
                  <span class="text-gray-900">Total</span>
                  <span class="text-gray-900">${{ orderSummary.total.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <div class="mt-6 space-y-4">
              <div>
                <label class="form-label">Order Notes</label>
                <textarea
                  v-model="order.notes"
                  rows="3"
                  class="input-field"
                  placeholder="Special instructions or notes..."
                ></textarea>
              </div>

              <div>
                <label class="form-label">Payment Method</label>
                <select v-model="order.paymentMethod" class="input-field">
                  <option value="cash">Cash</option>
                  <option value="card">Credit Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="check">Check</option>
                </select>
              </div>

              <div>
                <label class="form-label">Order Status</label>
                <select v-model="order.status" class="input-field">
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
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
  title: "Create New Order",
});

// Reactive data
const productSearch = ref("");
const order = ref({
  customerId: "",
  items: [],
  notes: "",
  paymentMethod: "cash",
  status: "pending",
});

// Mock data
const customers = ref([
  { id: 1, name: "John Smith", email: "john@example.com" },
  { id: 2, name: "Sarah Johnson", email: "sarah@example.com" },
  { id: 3, name: "Mike Davis", email: "mike@example.com" },
]);

const products = ref([
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    sku: "SKU001",
    price: 25.99,
    stockQuantity: 50,
    image: "/placeholder-product.jpg",
  },
  {
    id: 2,
    name: "Denim Jeans",
    sku: "SKU002",
    price: 79.99,
    stockQuantity: 25,
    image: "/placeholder-product.jpg",
  },
  {
    id: 3,
    name: "Summer Dress",
    sku: "SKU003",
    price: 65.99,
    stockQuantity: 15,
    image: "/placeholder-product.jpg",
  },
]);

// Computed properties
const filteredProducts = computed(() => {
  if (!productSearch.value) return products.value;

  const query = productSearch.value.toLowerCase();
  return products.value.filter(
    (product) =>
      product.name.toLowerCase().includes(query) || product.sku.toLowerCase().includes(query)
  );
});

const orderSummary = computed(() => {
  const subtotal = order.value.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.085; // 8.5% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;

  return {
    subtotal,
    tax,
    shipping,
    total,
  };
});

const canSaveOrder = computed(() => {
  return order.value.customerId && order.value.items.length > 0;
});

// Methods
const addProductToOrder = (product) => {
  const existingItem = order.value.items.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    order.value.items.push({
      id: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  }
};

const updateQuantity = (index, newQuantity) => {
  if (newQuantity >= 1) {
    order.value.items[index].quantity = newQuantity;
  }
};

const removeItem = (index) => {
  order.value.items.splice(index, 1);
};

const saveOrder = async () => {
  try {
    // Here you would make an API call to save the order
    const orderData = {
      ...order.value,
      subtotal: orderSummary.value.subtotal,
      tax: orderSummary.value.tax,
      shipping: orderSummary.value.shipping,
      total: orderSummary.value.total,
    };

    console.log("Saving order:", orderData);

    // Show success message
    alert("Order created successfully!");

    // Redirect to orders list
    await navigateTo("/orders");
  } catch (error) {
    console.error("Error saving order:", error);
    alert("Error creating order. Please try again.");
  }
};
</script>
