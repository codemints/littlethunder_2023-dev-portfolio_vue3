<template>
  <div>
    <p v-if="getError">{{ getError }}</p>
    <div
      v-if="submissions"
      v-for="(sub, index) in submissions"
      :key="sub.id"
      class="submissions"
    >
      <p>{{ sub.name }}</p>
      <p>{{ sub.email }}</p>
      <p>{{ sub.phone }}</p>
      <p>{{ sub.company }}</p>
      <p>{{ sub.message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import supabase from '@lib/supabase.js'

const getError = ref(null)
const submissions = ref([])

const getSubmissions = async () => {
  const { data, error } = await supabase
    .from('form_submissions')
    .select('*')
    .order('id', { ascending: false })

  if (error) {
    getError.value = error.message
  } else {
    submissions.value = data
  }
}

onMounted(() => {
  getSubmissions()
})
</script>

<style lang="scss" scoped>

</style>