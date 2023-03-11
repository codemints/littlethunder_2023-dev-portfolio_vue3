<template>
  <div ref="mapRef" class="map-container"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useDarkModeStore } from '@store/darkmode.js'
import mapStylesArray from '@lib/map-styles.js'
import axios from 'axios'

const darkModeStore = useDarkModeStore()
const { darkMap, lightMap } = mapStylesArray

const mapRef = ref(null)
const map = ref(null)

window.initMap = () => {
  map.value = new google.maps.Map(mapRef.value, {
    center: { lat: 40.5853, lng: -105.0844 },
    zoom: 14,
    styles: darkModeStore.isDark ? darkMap : lightMap,
  })
}

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
  const res = await axios.get('/api/google_map')
  const { data } = res
  
  const initMapScript = new Function(data)
  initMapScript()
})
</script>

<style lang="scss" scoped>
.map-container {
  height: 100%;
  width: 100%;
}
</style>