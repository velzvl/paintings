<script setup lang="ts">
import { RouterLink } from 'vue-router';
import LogoIcon from '@/shared/icons/LogoIcon.vue';
import ThemeIcon from '@/shared/icons/ThemeIcon.vue';
import { inject } from 'vue';
import { THEME_COLORS } from '@/types';

const themeRef = inject<{ value: THEME_COLORS }>('themeRef');

const handleChangeThemeClick = () => {
  if (themeRef) {
    themeRef.value = themeRef?.value === THEME_COLORS.LIGHT
      ? THEME_COLORS.DARK
      : THEME_COLORS.LIGHT;
  }
};
</script>

<template>
  <header class="header">
    <div class="container">
      <RouterLink to='/'>
        <LogoIcon />
      </RouterLink>
      <button class="header__button" @click="handleChangeThemeClick" type="button">
        <ThemeIcon />
      </button>
    </div>
  </header>
</template>

<style lang="scss">

.header {

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: var(--gap-section);
  }

  &__button {
    margin-left: auto;

    svg {
      fill: var(--color-text);
    }
  }

  @include media-sm {
    & {
      padding-top: 20px;
    }
  }
}
</style>
