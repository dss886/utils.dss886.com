<script setup lang="ts" generic="T extends boolean | string | number">
import { SelectOption } from "../types/mahjong";

defineProps<{
  title: string;
  options: SelectOption<T>[];
  selected?: T;
}>();
const emit = defineEmits<{
  (e: "update:selected", value: T): void;
}>();
const setSelected = (value: T) => {
  emit("update:selected", value);
};
</script>

<template>
  <div class="select-view">
    <h3>{{ title }}</h3>

    <div class="options-layout">
      <button
        class="option-btn"
        v-for="option in options"
        :key="`option-${option.value}`"
        :class="{ selected: selected === option.value }"
        @click="setSelected(option.value)"
        v-html="option.label"></button>
    </div>
  </div>
</template>

<style scoped>
.select-view {
  padding: 1.5rem;
  border-radius: 12px;
  background-color: var(--card-background);
  box-shadow: 0 2px 8px var(--card-shadow);
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.1rem;
  line-height: 1.2;
  font-weight: 500;
  margin-top: -4px;
  margin-bottom: 0.5rem;
}

.options-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 16px;
  justify-content: center;
}

.option-btn {
  flex: 1 1 calc(25% - 0.5rem);
  min-height: 44px;
  padding: 0.75rem 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  color: var(--text-color);
  border-radius: 8px;
  border: 2px solid var(--border-color);
  background-color: var(--card-background);
  transition:
    background-color 0.3s,
    border-color 0.3s,
    transform 0.1s;
}

.option-btn.selected {
  color: white;
  border-color: var(--primary-color);
  background-color: var(--primary-color);
}

.option-btn:active:not(.selected) {
  color: white;
  border-color: var(--primary-light);
  background-color: var(--primary-light);
}

.option-btn:active {
  transform: scale(0.98);
}
</style>
