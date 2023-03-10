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
const map = ref(null)
const apiKey = ref(null)
const apiURL = import.meta.env.VITE_API_BASE_URL


watch(() => darkModeStore.isDark, (val) => {
  const lat = map.value.getCenter().lat()
  const lng = map.value.getCenter().lng()
  const zoom = map.value.getZoom()
  const style = val ? darkMap : lightMap

  map.value.setOptions({ styles: style })
  map.value.setCenter({ lat, lng })
  map.value.setZoom(zoom)
})

onMounted(async () => {
  const response = await axios.get(`${apiURL}/maps_api_key`)
  apiKey.value = response.data

  const loader = new Loader({
    apiKey: apiKey.value,
    version: 'weekly',
  })

  loader
  .load()
  .then(() => {
    map.value = new google.maps.Map(mapRef.value, {
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