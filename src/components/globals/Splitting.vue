<template>
  <span
    v-for="(item, index) in textContentData"
    :key="`${item.word}-${index}`"
    :class="getWordClass(index)"
  >
    <span
      v-for="(char, charIndex) in item.chars"
      :key="`${char}-${charIndex}`"
      :ref="pushChar"
      :class="[
        getCharClass(charIndex, item.startIndex),
        specialChars.includes(char) ? specialCharClasses : '',
        extraClassNames ? extraClassNames : ''
      ]"
      @mouseover="$emit('charHover', {
        event: $event,
        item: charArray[indexSequence(charIndex, item.startIndex)]
      })"
    >
      {{ char }}
    </span>
    <span
      v-if="item.word !== textContentData[textContentData.length - 1].word"
      class="word--space"
    >
      &nbsp;
    </span>
  </span>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, onMounted, watch } from 'vue'
const props = defineProps({
  textContent: {
    type: String,
    required: true
  },
  specialChars: {
    type: Array,
    required: false
  },
  wordClass: {
    type: String,
    required: false
  },
  charClass: {
    type: String,
    required: false
  },
  specialCharClasses: {
    type: Array,
    required: false
  },
  extraClassNames: {
    type: Array,
    required: false
  }
})

const emits = defineEmits(['charHover'])

const charArray = ref([])

const indexSequence = (index, startAt) => {
  return index + startAt
}

const getWordClass = (index) => {
  return props.wordClass ? `${props.wordClass} ${props.wordClass}--${index}` : ''
}

const getCharClass = (index, startAt) => {
  return props.charClass ? `${props.charClass} ${props.charClass}--${indexSequence(index, startAt)}` : ''
}

const pushChar = (char) => {
  charArray.value.push(char)
}

const textContentData = computed(() => {
  const splitTextContent = props.textContent.split(' ')

  return splitTextContent.reduce((data, item, index) => {
    const lastWord = data[data.length - 1]
    
    data.push({
      word: item,
      wordLength: item.length,
      startIndex: lastWord ? lastWord.startIndex + lastWord.wordLength : 0,
      chars: [...item]
    })
    
    return data
  }, [])
})

watch(charArray, (val) => {
  console.log(val)
})

onMounted(() => {
})
</script>

<style lang="scss" scoped>
  .word--space,
  .char {
    display: inline-block;
  }
</style>