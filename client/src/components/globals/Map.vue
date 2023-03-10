<template>
  <div ref="mapRef" class="map-container"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useDarkModeStore } from '@store/darkmode.js'
import { Loader } from '@googlemaps/js-api-loader'
import mapStylesArray from '@lib/map-styles.js'

const darkModeStore = useDarkModeStore()
const { darkMap, lightMap } = mapStylesArray
const mapRef = ref(null)
let map = ref(null)

watch(() => darkModeStore.isDark, (val) => {
  const lat = map.getCenter().lat()
  const lng = map.getCenter().lng()
  const zoom = map.getZoom()
  const style = val ? darkMap : lightMap

  map.setOptions({ styles: style })
  map.setCenter({ lat, lng })
  map.setZoom(zoom)
})

onMounted(() => {
  const loader = new Loader({
    apiKey: 'AIzaSyDlccH4pNX4LR8MPn0KbbczdKDU__2YFHQ',
    version: 'weekly',
  })
  loader.load().then(() => {
    map = new google.maps.Map(mapRef.value, {
      center: { lat: 40.5853, lng: -105.0844 },
      zoom: 14,
      styles: darkModeStore.isDark ? darkMap : lightMap,
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