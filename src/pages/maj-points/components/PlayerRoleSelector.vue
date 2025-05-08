<script setup lang="ts">
defineProps<{
  isDealer: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:isDealer', value: boolean): void;
}>();

const toggleRole = (value: boolean) => {
  emit('update:isDealer', value);
};
</script>

<template>
  <div class="role-selector card">
    <h3>选择角色 (Player Role)</h3>
    
    <div class="tooltip info-icon">
      <span>?</span>
      <span class="tooltip-text">庄家 (Dealer) 是当前局的东家。非庄家 (Non-dealer) 是其他三家。</span>
    </div>
    
    <div class="options">
      <button 
        :class="{ selected: isDealer }" 
        @click="toggleRole(true)"
      >
        庄家 (Dealer)
      </button>
      <button 
        :class="{ selected: !isDealer }" 
        @click="toggleRole(false)"
      >
        闲家 (Non-dealer)
      </button>
    </div>
  </div>
</template>

<style scoped>
.role-selector {
  position: relative;
}

.options {
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-top: 12px;
  justify-content: center;
}

button {
  flex: 1;
  background-color: var(--card-background);
  color: var(--text-color);
  border: 2px solid var(--border-color);
  padding: 12px;
  transition: background-color 0.3s, border-color 0.3s, transform 0.1s;
  max-width: 150px;
}

button.selected {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-dark);
}

.info-icon {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--text-light);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}
</style>