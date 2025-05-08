<script setup lang="ts">
import { WinningMethod } from '../types/mahjong';

defineProps<{
  winningMethod: WinningMethod;
}>();

const emit = defineEmits<{
  (e: 'update:winningMethod', value: WinningMethod): void;
}>();

const setWinningMethod = (method: WinningMethod) => {
  emit('update:winningMethod', method);
};
</script>

<template>
  <div class="winning-method-selector card">
    <h3>和牌方式 (Winning Method)</h3>
    
    <div class="tooltip info-icon">
      <span>?</span>
      <span class="tooltip-text">荣和 (Ron) 是通过他人打出的牌和牌。自摸 (Tsumo) 是自己摸到和牌。</span>
    </div>
    
    <div class="options">
      <button 
        :class="{ selected: winningMethod === WinningMethod.RON }" 
        @click="setWinningMethod(WinningMethod.RON)"
      >
        荣和 (Ron)
      </button>
      <button 
        :class="{ selected: winningMethod === WinningMethod.TSUMO }" 
        @click="setWinningMethod(WinningMethod.TSUMO)"
      >
        自摸 (Tsumo)
      </button>
    </div>
  </div>
</template>

<style scoped>
.winning-method-selector {
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