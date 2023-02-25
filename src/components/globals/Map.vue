<template>
  <div ref="mapRef" class="map-container"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import mapStylesArray from '@lib/map-styles.js'

const mapRef = ref(null)
let map = null

onMounted(() => {
  const loader = new Loader({
    apiKey: 'AIzaSyDlccH4pNX4LR8MPn0KbbczdKDU__2YFHQ',
    version: 'weekly',
  })

  loader.load().then(() => {
    map = new google.maps.Map(mapRef.value, {
      center: { lat: 40.5853, lng: -105.0844 },
      zoom: 13,
      styles: mapStylesArray,
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