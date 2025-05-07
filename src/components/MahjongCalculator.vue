<script setup lang="ts">
import { ref, watch } from 'vue';
import PlayerRoleSelector from './PlayerRoleSelector.vue';
import WinningMethodSelector from './WinningMethodSelector.vue';
import HandValueSelector from './HandValueSelector.vue';
import CalculationResult from './CalculationResult.vue';
import { WinningMethod, CalculatorState } from '../types/mahjong';
import { calculatePoints } from '../utils/calculationUtils';

// Calculator state
const state = ref<CalculatorState>({
  isDealer: false,
  winningMethod: WinningMethod.RON,
  han: 1,
  fu: 30,
  showFuSelection: true,
  result: null
});

// Calculate points whenever relevant parameters change
watch(
  () => [state.value.isDealer, state.value.winningMethod, state.value.han, state.value.fu],
  () => {
    calculateResult();
  }
);

// Calculate result based on current parameters
const calculateResult = () => {
  state.value.result = calculatePoints(
    state.value.isDealer,
    state.value.winningMethod,
    state.value.han,
    state.value.fu
  );
};

// Call calculation once on component creation
calculateResult();
</script>

<template>
  <div class="mahjong-calculator">
    <div class="header">
      <h1>麻将点数计算器</h1>
      <h2>Mahjong Point Calculator</h2>
    </div>
    
    <PlayerRoleSelector 
      v-model:isDealer="state.isDealer" 
    />
    
    <WinningMethodSelector 
      v-model:winningMethod="state.winningMethod" 
    />
    
    <HandValueSelector 
      v-model:han="state.han"
      v-model:fu="state.fu"
      v-model:showFuSelection="state.showFuSelection"
      :winningMethod="state.winningMethod"
    />
    
    <CalculationResult 
      :result="state.result"
      :isDealer="state.isDealer"
      :winningMethod="state.winningMethod"
      :han="state.han"
      :fu="state.fu"
    />
  </div>
</template>

<style scoped>
.mahjong-calculator {
  padding: 16px;
  max-width: 100%;
  width: 100%;
}

.header {
  margin-bottom: 24px;
  background-color: var(--primary-color);
  color: white;
  padding: 24px 16px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  margin: 0;
  color: white;
}

h2 {
  font-size: 1.2rem;
  font-weight: 400;
  opacity: 0.9;
}

@media (min-width: 768px) {
  .mahjong-calculator {
    padding: 24px;
  }
}
</style>