<script setup lang="ts">
import {
  onMounted, provide, ref,
  watch,
} from 'vue';
import './assets/scss/main.scss';
import { RouterView } from 'vue-router';
import { THEME_COLORS } from './types';
import setTheme from './helpers/setTheme';

const themeRef = ref<THEME_COLORS>(THEME_COLORS.DARK);

onMounted(() => {
  setTheme(THEME_COLORS.DARK);
});

provide('themeRef', themeRef);
watch(themeRef, () => setTheme(themeRef.value));
</script>

<template>
  <RouterView />
</template>
