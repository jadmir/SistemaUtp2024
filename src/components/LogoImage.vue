<template>
  <img
    :width="props.width"
    src="https://res.cloudinary.com/dvs9fbw5f/image/upload/v1706219557/logoutp_bo8xma.png"
    alt="Logo"
  />
</template>

<script setup>
const props = defineProps({
  width: {
    type: Number,
    default: 100,
  },
});
</script>

<style scoped></style>
