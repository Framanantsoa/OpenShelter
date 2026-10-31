<script setup lang="ts">
import { ref, computed } from 'vue'
import IconButton from './IconButton.vue';
defineOptions({ inheritAttrs: false });

const props = defineProps<{ 
    id: string; 
    label: string; 
    error?: string;
    type?: string;
}>();

const model = defineModel<string>();
const showPassword = ref(false);

// Check if the input is actually a password type
const isPassword = computed(() => 
    props.type === 'password'
);

// Toggle state
const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
    <div class="flex flex-col gap-1.5">
        <label :for="id" class="text-sm font-semibold text-base-content">{{ label }}</label>

        <!-- Wrapper to position the icon button absolutely inside -->
        <div class="flex items-center gap-2">
            <input :id="id" v-model="model"
             v-bind="$attrs"
             :type="isPassword ? (showPassword ? 'text' : 'password') : (type || 'text')"
             class="input flex-1 border-1 border-base-300 dark:border-slate-600
                hover:border-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
             :class="{ 'input-error': error }"
             :aria-invalid="!!error"
             :aria-describedby="error ? `${id}-error` : undefined"
            />

            <!-- Toggle button (only shown if it's a password field) -->
            <IconButton v-if="isPassword"
             :icon="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'"
             :label="showPassword ? 'Hide' : 'Show'"
             class="border-1 border-base-300 dark:border-slate-600 hover:border-slate-400"
             @click="togglePassword"
            />
        </div>

        <!-- Error message -->
        <p v-if="error" :id="`${id}-error`" role="alert" class="text-sm text-error">{{ error }}</p>
    </div>
</template>
