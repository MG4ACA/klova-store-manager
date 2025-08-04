<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Add New Customer</h1>
        <p class="mt-2 text-gray-600">Create a new customer profile for your store</p>
      </div>
      <div class="flex space-x-3">
        <NuxtLink to="/customers" class="btn-secondary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to Customers
        </NuxtLink>
        <button
          @click="saveCustomer"
          :disabled="!canSaveCustomer"
          class="btn-primary"
          :class="{ 'opacity-50 cursor-not-allowed': !canSaveCustomer }"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          Save Customer
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Customer Form -->
      <div class="lg:col-span-2">
        <!-- Basic Information -->
        <div class="card mb-6">
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="form-label">First Name *</label>
                <input
                  v-model="customer.firstName"
                  type="text"
                  class="input-field"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label class="form-label">Last Name *</label>
                <input
                  v-model="customer.lastName"
                  type="text"
                  class="input-field"
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label class="form-label">Email</label>
                <input
                  v-model="customer.email"
                  type="email"
                  class="input-field"
                  placeholder="customer@example.com"
                />
              </div>

              <div>
                <label class="form-label">Phone Number *</label>
                <input
                  v-model="customer.phone"
                  type="tel"
                  class="input-field"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label class="form-label">Date of Birth</label>
                <input v-model="customer.dateOfBirth" type="date" class="input-field" />
              </div>

              <div>
                <label class="form-label">Gender</label>
                <select v-model="customer.gender" class="input-field">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="card mb-6">
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="form-label">Address Line 1</label>
                <input
                  v-model="customer.address.line1"
                  type="text"
                  class="input-field"
                  placeholder="Street address"
                />
              </div>

              <div>
                <label class="form-label">Address Line 2</label>
                <input
                  v-model="customer.address.line2"
                  type="text"
                  class="input-field"
                  placeholder="Apartment, suite, etc. (optional)"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="form-label">City</label>
                  <input
                    v-model="customer.address.city"
                    type="text"
                    class="input-field"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label class="form-label">State/Province</label>
                  <input
                    v-model="customer.address.state"
                    type="text"
                    class="input-field"
                    placeholder="State"
                  />
                </div>

                <div>
                  <label class="form-label">ZIP/Postal Code</label>
                  <input
                    v-model="customer.address.zipCode"
                    type="text"
                    class="input-field"
                    placeholder="ZIP Code"
                  />
                </div>
              </div>

              <div>
                <label class="form-label">Country</label>
                <select v-model="customer.address.country" class="input-field">
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="IT">Italy</option>
                  <option value="ES">Spain</option>
                  <option value="BR">Brazil</option>
                  <option value="IN">India</option>
                  <option value="JP">Japan</option>
                  <option value="CN">China</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Customer Preferences -->
        <div class="card mb-6">
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Customer Preferences</h3>
            <div class="space-y-4">
              <div>
                <label class="form-label">Preferred Size</label>
                <select v-model="customer.preferences.preferredSize" class="input-field">
                  <option value="">Select Size</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                  <option value="XXXL">XXXL</option>
                </select>
              </div>

              <div>
                <label class="form-label">Favorite Colors</label>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <label v-for="color in colors" :key="color" class="flex items-center">
                    <input
                      type="checkbox"
                      :value="color"
                      v-model="customer.preferences.favoriteColors"
                      class="mr-2"
                    />
                    <span class="text-sm">{{ color }}</span>
                  </label>
                </div>
              </div>

              <div>
                <label class="form-label">Style Preferences</label>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <label v-for="style in styles" :key="style" class="flex items-center">
                    <input
                      type="checkbox"
                      :value="style"
                      v-model="customer.preferences.stylePreferences"
                      class="mr-2"
                    />
                    <span class="text-sm">{{ style }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Communication Preferences -->
        <div class="card">
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Communication Preferences</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Email Notifications</h4>
                  <p class="text-sm text-gray-500">
                    Receive order updates and promotions via email
                  </p>
                </div>
                <button
                  @click="
                    customer.preferences.emailNotifications =
                      !customer.preferences.emailNotifications
                  "
                  :class="customer.preferences.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'"
                  class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span
                    :class="
                      customer.preferences.emailNotifications ? 'translate-x-5' : 'translate-x-0'
                    "
                    class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  ></span>
                </button>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">WhatsApp Messages</h4>
                  <p class="text-sm text-gray-500">
                    Receive order confirmations and updates via WhatsApp
                  </p>
                </div>
                <button
                  @click="
                    customer.preferences.whatsappNotifications =
                      !customer.preferences.whatsappNotifications
                  "
                  :class="
                    customer.preferences.whatsappNotifications ? 'bg-green-600' : 'bg-gray-200'
                  "
                  class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <span
                    :class="
                      customer.preferences.whatsappNotifications ? 'translate-x-5' : 'translate-x-0'
                    "
                    class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  ></span>
                </button>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Marketing Promotions</h4>
                  <p class="text-sm text-gray-500">Receive promotional offers and discount codes</p>
                </div>
                <button
                  @click="
                    customer.preferences.marketingEmails = !customer.preferences.marketingEmails
                  "
                  :class="customer.preferences.marketingEmails ? 'bg-purple-600' : 'bg-gray-200'"
                  class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <span
                    :class="
                      customer.preferences.marketingEmails ? 'translate-x-5' : 'translate-x-0'
                    "
                    class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Customer Preview -->
      <div class="lg:col-span-1">
        <div class="card sticky top-4">
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Customer Preview</h3>

            <!-- Customer Avatar -->
            <div class="flex justify-center mb-4">
              <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </div>

            <!-- Customer Details -->
            <div class="space-y-3 text-center">
              <div>
                <h4 class="font-medium text-gray-900">
                  {{ fullName || "Customer Name" }}
                </h4>
                <p class="text-sm text-gray-500">{{ customer.email || "customer@example.com" }}</p>
              </div>

              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Phone:</span>
                  <span>{{ customer.phone || "Not provided" }}</span>
                </div>

                <div
                  v-if="customer.address.city || customer.address.country"
                  class="flex justify-between"
                >
                  <span class="text-gray-600">Location:</span>
                  <span>{{ location || "Not provided" }}</span>
                </div>

                <div v-if="customer.preferences.preferredSize" class="flex justify-between">
                  <span class="text-gray-600">Size:</span>
                  <span>{{ customer.preferences.preferredSize }}</span>
                </div>
              </div>

              <div v-if="customer.preferences.favoriteColors.length > 0" class="pt-3 border-t">
                <h5 class="text-sm font-medium text-gray-900 mb-2">Favorite Colors</h5>
                <div class="flex flex-wrap gap-1 justify-center">
                  <span
                    v-for="color in customer.preferences.favoriteColors"
                    :key="color"
                    class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                  >
                    {{ color }}
                  </span>
                </div>
              </div>

              <div v-if="customer.preferences.stylePreferences.length > 0" class="pt-3 border-t">
                <h5 class="text-sm font-medium text-gray-900 mb-2">Style Preferences</h5>
                <div class="flex flex-wrap gap-1 justify-center">
                  <span
                    v-for="style in customer.preferences.stylePreferences"
                    :key="style"
                    class="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                  >
                    {{ style }}
                  </span>
                </div>
              </div>

              <div class="pt-3 border-t">
                <h5 class="text-sm font-medium text-gray-900 mb-2">Notifications</h5>
                <div class="space-y-1 text-xs text-gray-600">
                  <div class="flex justify-between">
                    <span>Email:</span>
                    <span
                      :class="
                        customer.preferences.emailNotifications ? 'text-green-600' : 'text-red-600'
                      "
                    >
                      {{ customer.preferences.emailNotifications ? "Enabled" : "Disabled" }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span>WhatsApp:</span>
                    <span
                      :class="
                        customer.preferences.whatsappNotifications
                          ? 'text-green-600'
                          : 'text-red-600'
                      "
                    >
                      {{ customer.preferences.whatsappNotifications ? "Enabled" : "Disabled" }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span>Marketing:</span>
                    <span
                      :class="
                        customer.preferences.marketingEmails ? 'text-green-600' : 'text-red-600'
                      "
                    >
                      {{ customer.preferences.marketingEmails ? "Enabled" : "Disabled" }}
                    </span>
                  </div>
                </div>
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
  title: "Add New Customer",
});

// Reactive data
const customer = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  address: {
    line1: "",
    line2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  },
  preferences: {
    preferredSize: "",
    favoriteColors: [],
    stylePreferences: [],
    emailNotifications: true,
    whatsappNotifications: true,
    marketingEmails: false,
  },
});

// Options data
const colors = ["Black", "White", "Navy", "Gray", "Red", "Blue", "Green", "Pink", "Brown", "Beige"];
const styles = ["Casual", "Formal", "Business", "Sporty", "Trendy", "Classic"];

// Computed properties
const canSaveCustomer = computed(() => {
  return customer.value.firstName && customer.value.lastName && customer.value.phone;
});

const fullName = computed(() => {
  return `${customer.value.firstName} ${customer.value.lastName}`.trim();
});

const location = computed(() => {
  const parts = [];
  if (customer.value.address.city) parts.push(customer.value.address.city);
  if (customer.value.address.country) parts.push(customer.value.address.country);
  return parts.join(", ");
});

// Methods
const saveCustomer = async () => {
  try {
    // Here you would make an API call to save the customer
    const customerData = {
      ...customer.value,
      fullName: fullName.value,
      createdAt: new Date().toISOString(),
    };

    console.log("Saving customer:", customerData);

    // Show success message
    alert("Customer created successfully!");

    // Redirect to customers list
    await navigateTo("/customers");
  } catch (error) {
    console.error("Error saving customer:", error);
    alert("Error creating customer. Please try again.");
  }
};
</script>
