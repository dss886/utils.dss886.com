<script setup lang="ts">
import { ref, watch } from 'vue';
import { HAN_OPTIONS, FU_OPTIONS } from '../utils/constants';
import { WinningMethod } from '../types/mahjong';
import { isFuSelectionNeeded, getAvailableFuOptions } from '../utils/calculationUtils';

const props = defineProps<{
  han: number;
  fu: number;
  winningMethod: WinningMethod;
}>();

const emit = defineEmits<{
  (e: 'update:han', value: number): void;
  (e: 'update:fu', value: number): void;
  (e: 'update:showFuSelection', value: boolean): void;
}>();

const availableFuOptions = ref<number[]>([]);

// Update available fu options when han or winning method changes
watch(
  () => [props.han, props.winningMethod],
  ([newHan, newWinningMethod]) => {
    const showFuSelection = isFuSelectionNeeded(newHan);
    emit('update:showFuSelection', showFuSelection);
    
    if (showFuSelection) {
      availableFuOptions.value = getAvailableFuOptions(newHan, newWinningMethod);
      
      // Set default fu if current fu is not available
      if (!availableFuOptions.value.includes(props.fu)) {
        emit('update:fu', availableFuOptions.value[0]);
      }
    }
  },
  { immediate: true }
);

// Set han value
const setHan = (value: number) => {
  emit('update:han', value);
};

// Set fu value
const setFu = (value: number) => {
  emit('update:fu', value);
};

// Get the limit name for display if available
const getLimitNameForHan = (hanOption: typeof HAN_OPTIONS[number]) => {
  return hanOption.limitName ? ` (${hanOption.limitName})` : '';
};
</script>

<template>
  <div class="hand-value-selector">
    <div class="card">
      <h3>番数 (Han/Fan)</h3>
      
      <div class="tooltip info-icon">
        <span>?</span>
        <span class="tooltip-text">番数代表和牌的价值。通常由和牌的牌型和条件决定。</span>
      </div>
      
      <div class="option-grid han-grid">
        <button 
          v-for="option in HAN_OPTIONS" 
          :key="`han-${option.value}`"
          :class="{ selected: han === option.value }" 
          @click="setHan(option.value)"
        >
          {{ option.label }}{{ getLimitNameForHan(option) }}
        </button>
      </div>
    </div>
    
    <div v-if="isFuSelectionNeeded(han)" class="card">
      <h3>符数 (Fu/Minipoints)</h3>
      
      <div class="tooltip info-icon">
        <span>?</span>
        <span class="tooltip-text">符数是根据和牌的构成计算的额外点数。</span>
      </div>
      
      <div class="option-grid fu-grid">
        <button 
          v-for="fuValue in availableFuOptions" 
          :key="`fu-${fuValue}`"
          :class="{ selected: fu === fuValue }" 
          @click="setFu(fuValue)"
        >
          {{ fuValue }}符
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hand-value-selector {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card {
  position: relative;
}

.han-grid, .fu-grid {
  grid-template-columns: repeat(3, 1fr);
}

button {
  background-color: var(--card-background);
  color: var(--text-color);
  border: 2px solid var(--border-color);
  padding: 12px 8px;
  transition: background-color 0.3s, border-color 0.3s, transform 0.1s;
  font-size: 0.9rem;
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

@media (min-width: 480px) {
  .han-grid, .fu-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>