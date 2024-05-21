<script setup lang="ts">
import type { IPaintingClient } from '@/types';

interface IPaintingProps {
  info: IPaintingClient;
}

defineProps<IPaintingProps>();
</script>

<template>
  <div class="painting">
    <img
      class="painting__img"
      :src="info.image.src"
      alt="img"
    >
    <div class="painting__info">
      <div class="painting__info-title">
        <h3 class="painting__info-title-text">
          {{ info.name }}
        </h3>
      </div>
      <p class="painting__info-text">
        <span class="painting__info-subtitle">Author:</span> {{ info.author?.name }}
      </p>
      <p class="painting__info-text"><span class="painting__info-subtitle">Created:</span> {{ info.created }}</p>
      <p class="painting__info-text"><span class="painting__info-subtitle">Location:</span> {{ info.location?.location }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

.painting {
  position: relative;
  overflow: hidden;
  border-radius: 20px;

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: white;
  }

  &__info {
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    width: 100%;
    padding: 0 15px 44px 15px;
    background-color: #FFFFFFBF;
    transition: .3s all;

    &-title {
      position: relative;
      width: calc(100% + 30px);

      &-text {
        width: 100%;
        position: absolute;
        bottom: 100%;
        left: 0;
        margin: 0 -15px;
        padding: 5px 15px 5px 15px;
        font-size: 18px;
        font-weight: 700;
        line-height: 20px;
        background-color: #FFFFFFBF;
        color: var(--color-black);
      }
    }

    &-text {
      margin-bottom: 5px;
      font-size: 13px;
      font-weight: 300;
      line-height: 20px;
      color: var(--color-black);
    }

    &-subtitle {
      font-weight: 500;
    }

    @include media-lg {
      & {
        padding: 0 15px 22px 15px;
      }
    }

    @include media-sm {
      & {
        padding: 0 15px 5px 15px;
      }
    }
  }

  &:hover {
    .painting__info {
      transform: translateY(0%);
    }
  }
}
</style>
