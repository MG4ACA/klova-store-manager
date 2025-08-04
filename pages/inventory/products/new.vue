<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Add New Product</h1>
        <p class="mt-2 text-gray-600">Create a new product with variants and inventory details</p>
      </div>
      <div class="flex space-x-3">
        <NuxtLink to="/inventory" class="btn-secondary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to Inventory
        </NuxtLink>
        <button
          @click="saveProduct"
          :disabled="!canSaveProduct"
          class="btn-primary"
          :class="{ 'opacity-50 cursor-not-allowed': !canSaveProduct }"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          Save Product
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Product Form -->
      <div class="lg:col-span-2">
        <!-- Basic Information -->
        <div class="card mb-6">
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <label class="form-label">Product Name *</label>
                <input
                  v-model="product.name"
                  type="text"
                  class="input-field"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label class="form-label">SKU *</label>
                <input
                  v-model="product.sku"
                  type="text"
                  class="input-field"
                  placeholder="e.g., SKU001"
                />
              </div>

              <div>
                <label class="form-label">Category</label>
                <select v-model="product.categoryId" class="input-field">
                  <option value="">Select Category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>

              <div class="md:col-span-2">
                <label class="form-label">Description</label>
                <textarea
                  v-model="product.description"
                  rows="3"
                  class="input-field"
                  placeholder="Product description..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Pricing & Inventory -->
        <div class="card mb-6">
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Pricing & Inventory</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="form-label">Price *</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    v-model="product.price"
                    type="number"
                    step="0.01"
                    class="input-field pl-7"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label class="form-label">Cost Price</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    v-model="product.costPrice"
                    type="number"
                    step="0.01"
                    class="input-field pl-7"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label class="form-label">Compare at Price</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    v-model="product.comparePrice"
                    type="number"
                    step="0.01"
                    class="input-field pl-7"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label class="form-label">Initial Stock Quantity *</label>
                <input
                  v-model="product.stockQuantity"
                  type="number"
                  class="input-field"
                  placeholder="0"
                />
              </div>

              <div>
                <label class="form-label">Low Stock Threshold</label>
                <input
                  v-model="product.lowStockThreshold"
                  type="number"
                  class="input-field"
                  placeholder="10"
                />
              </div>

              <div>
                <label class="form-label">Track Inventory</label>
                <select v-model="product.trackInventory" class="input-field">
                  <option :value="true">Yes</option>
                  <option :value="false">No</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Variants -->
        <div class="card mb-6">
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">Product Variants</h3>
              <button @click="addVariant" class="btn-secondary text-sm">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                Add Variant
              </button>
            </div>

            <div
              v-if="product.variants.length === 0"
              class="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg"
            >
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
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                ></path>
              </svg>
              <p class="mt-2 text-sm text-gray-500">No variants added yet</p>
              <p class="text-xs text-gray-400">Add size, color, or style variants</p>
            </div>

            <div v-else class="space-y-3">
              <div
                v-for="(variant, index) in product.variants"
                :key="index"
                class="flex items-center space-x-4 p-4 border rounded-lg"
              >
                <div class="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <input
                      v-model="variant.size"
                      type="text"
                      class="input-field text-sm"
                      placeholder="Size (S, M, L)"
                    />
                  </div>
                  <div>
                    <input
                      v-model="variant.color"
                      type="text"
                      class="input-field text-sm"
                      placeholder="Color"
                    />
                  </div>
                  <div>
                    <input
                      v-model="variant.style"
                      type="text"
                      class="input-field text-sm"
                      placeholder="Style"
                    />
                  </div>
                  <div>
                    <input
                      v-model="variant.stock"
                      type="number"
                      class="input-field text-sm"
                      placeholder="Stock"
                    />
                  </div>
                </div>
                <button @click="removeVariant(index)" class="text-red-600 hover:text-red-900">
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

      <!-- Product Images -->
      <div class="card">
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Product Images</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="(image, index) in product.images" :key="index" class="relative group">
              <img
                :src="image.url"
                :alt="`Product image ${index + 1}`"
                class="w-full h-32 object-cover rounded-lg border"
              />
              <button
                @click="removeImage(index)"
                class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <!-- Add Image Button -->
            <div
              class="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 cursor-pointer"
              @click="addImage"
            >
              <div class="text-center">
                <svg
                  class="mx-auto h-8 w-8 text-gray-400"
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
                <p class="text-xs text-gray-500 mt-1">Add Image</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Preview -->
    <div class="lg:col-span-1">
      <div class="card sticky top-4">
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Product Preview</h3>

          <!-- Product Image -->
          <div class="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
            <img
              v-if="product.images.length > 0"
              :src="product.images[0].url"
              :alt="product.name"
              class="w-full h-full object-cover rounded-lg"
            />
            <div v-else class="text-center">
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
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z"
                ></path>
              </svg>
              <p class="text-sm text-gray-500 mt-2">No image</p>
            </div>
          </div>

          <!-- Product Details -->
          <div class="space-y-3">
            <div>
              <h4 class="font-medium text-gray-900">{{ product.name || "Product Name" }}</h4>
              <p class="text-sm text-gray-500">{{ product.sku || "SKU" }}</p>
            </div>

            <div>
              <p class="text-lg font-semibold text-gray-900">
                ${{ product.price || "0.00" }}
                <span v-if="product.comparePrice" class="text-sm text-gray-500 line-through ml-2">
                  ${{ product.comparePrice }}
                </span>
              </p>
            </div>

            <div v-if="product.description">
              <p class="text-sm text-gray-600">{{ product.description }}</p>
            </div>

            <div v-if="product.variants.length > 0">
              <h5 class="text-sm font-medium text-gray-900 mb-2">Available Variants</h5>
              <div class="space-y-1">
                <div
                  v-for="(variant, index) in product.variants"
                  :key="index"
                  class="text-xs text-gray-600 flex justify-between"
                >
                  <span>
                    {{ [variant.size, variant.color, variant.style].filter(Boolean).join(" / ") }}
                  </span>
                  <span>{{ variant.stock }} in stock</span>
                </div>
              </div>
            </div>

            <div class="pt-3 border-t">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Total Stock:</span>
                <span class="font-medium">{{ totalStock }}</span>
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
  title: "Add New Product",
});

// Reactive data
const product = ref({
  name: "",
  sku: "",
  description: "",
  categoryId: "",
  price: null,
  costPrice: null,
  comparePrice: null,
  stockQuantity: 0,
  lowStockThreshold: 10,
  trackInventory: true,
  variants: [],
  images: [],
});

// Mock data
const categories = ref([
  { id: 1, name: "Shirts" },
  { id: 2, name: "Pants" },
  { id: 3, name: "Dresses" },
  { id: 4, name: "Accessories" },
  { id: 5, name: "Outerwear" },
]);

// Computed properties
const canSaveProduct = computed(() => {
  return product.value.name && product.value.sku && product.value.price;
});

const totalStock = computed(() => {
  if (product.value.variants.length > 0) {
    return product.value.variants.reduce(
      (total, variant) => total + (parseInt(variant.stock) || 0),
      0
    );
  }
  return product.value.stockQuantity || 0;
});

// Methods
const addVariant = () => {
  product.value.variants.push({
    size: "",
    color: "",
    style: "",
    stock: 0,
  });
};

const removeVariant = (index) => {
  product.value.variants.splice(index, 1);
};

const addImage = () => {
  // In a real app, this would open a file picker
  const imageUrl = prompt("Enter image URL (in a real app, this would be a file upload):");
  if (imageUrl) {
    product.value.images.push({
      url: imageUrl,
      alt: product.value.name,
    });
  }
};

const removeImage = (index) => {
  product.value.images.splice(index, 1);
};

const saveProduct = async () => {
  try {
    // Here you would make an API call to save the product
    const productData = {
      ...product.value,
      totalStock: totalStock.value,
    };

    console.log("Saving product:", productData);

    // Show success message
    alert("Product created successfully!");

    // Redirect to inventory
    await navigateTo("/inventory");
  } catch (error) {
    console.error("Error saving product:", error);
    alert("Error creating product. Please try again.");
  }
};
</script>
