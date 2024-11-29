<template>
  <MazInputCode v-model="code" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
  import MazInputCode from 'maz-ui/components/MazInputCode'

  const code = ref()
  console.log('re',code)
</script>