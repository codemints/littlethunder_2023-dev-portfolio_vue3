<template>
  <div ref="mapRef" class="map-container"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'

const mapRef = ref(null)
let map = null

onMounted(() => {
  const loader = new Loader({
    apiKey: 'AIzaSyDlccH4pNX4LR8MPn0KbbczdKDU__2YFHQ',
    version: 'weekly',
  })

  loader.load().then(() => {
    map = new google.maps.Map(mapRef.value, {
      center: { lat: 40.7128, lng: -74.0060 },
      zoom: 8,
    })
  })
})
</script>

<style lang="scss" scoped>
.map-container {
  height: 100%;
  width: 100%;
}
</style>