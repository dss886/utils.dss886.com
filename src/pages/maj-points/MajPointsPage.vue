<script setup lang="ts">
import { ref, watch } from "vue";
import SelectView from "./components/SelectView.vue";
import TitleView from "./components/TitleView.vue";
import ResultView from "./components/ResultView.vue";
import { ROLE_OPTIONS, WIN_OPTIONS, HAN_OPTIONS, FU_1HAN_OPTIONS, FU_OPTIONS } from "./utils/constants";
import { MahjongPointState, WinningMethod } from "./types/mahjong";

const state = ref<MahjongPointState>({
  isDealer: true,
  winningMethod: WinningMethod.TSUMO,
  han: 1,
  fu: 30,
});

watch(
  () => state.value.han,
  (newHan) => {
    console.log("Han changed to:", newHan, state.value.fu);
    if (newHan === 1 && state.value.fu < 30) {
      state.value.fu = 30;
    }
  }
);
</script>

<template>
  <div class="page-container">
    <TitleView />
    <SelectView v-model:selected="state.isDealer" title="选择角色（Player Role）" :options="ROLE_OPTIONS" />
    <SelectView v-model:selected="state.winningMethod" title="和牌方式（Winning Method）" :options="WIN_OPTIONS" />
    <SelectView v-model:selected="state.han" title="番数（Han/Fan）" :options="HAN_OPTIONS" />
    <SelectView
      v-if="state.han < 5"
      v-model:selected="state.fu"
      title="符数（Fu/Minipoints）"
      :options="state.han === 1 ? FU_1HAN_OPTIONS : FU_OPTIONS" />
    <ResultView :state="state" />
  </div>
</template>

<style>
:root {
  --primary-color: #006633;
  --primary-light: #007a3d;
  --primary-dark: #00552b;
  --text-color: #333333;
  --background-color: #f5f5f5;
  --card-background: #ffffff;
  --card-shadow: rgba(0, 0, 0, 0.1);
  --card-item-background: rgba(255, 255, 255, 0.1);
  --border-color: #dddddd;

  font-family: "Noto Sans JP", sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color: var(--text-color);
  background-color: var(--background-color);
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page-container {
  max-width: 100%;
  width: 100%;
  padding: 16px;
  margin: 0 auto;
  text-align: center;
}

@media (min-width: 768px) {
  .page-container {
    max-width: 768px;
    padding: 24px;
  }
}
</style>
