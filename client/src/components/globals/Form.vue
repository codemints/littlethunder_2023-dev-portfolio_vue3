<template>
  <div class="form-wrapper--contact bg-clr-100/30 dark:bg-clr-400/20">
    <FormKit
      ref="contactForm"
      type="form"
      id="contact-form"
      name="contact-form"
      @submit="handleSubmit"
      :classes="{
        message: 'text-clr-orange dark:text-clr-blue',
        input: 'bg-clr-blue dark:bg-clr-orange',
      }"
      :form-class="formSubmitted ? 'is-hidden' : ''"
      :actions="false"
      #default="{ value }">

      <div class="form-control-group">
        <FormKit
          type="text"
          name="name"
          id="submit-name"
          placeholder="first and last name"
          validation="required"
          validation-visibility="dirty"
          label="Name"
          :classes="{
            outer: 'group-col group-col-9',
            inner: 'bg-clr-100 dark:bg-clr-400',
            input: 'bg-transparent text-clr-400 dark:text-white',
            label: 'text-clr-400 dark:text-white is-required',
            message: 'text-clr-orange dark:text-clr-blue'
          }" />
  
        <FormKit
          type="text"
          name="company"
          id="submit-company"
          class="group-col-4"
          placeholder="your company"
          validation-visibility="dirty"
          label="Company"
          :classes="{
            outer: 'group-col group-col-3',
            inner: 'bg-clr-100 dark:bg-clr-400',
            input: 'bg-transparent text-clr-400 dark:text-white',
            label: 'text-clr-400 dark:text-white',
            message: 'text-clr-orange dark:text-clr-blue'
          }" />
      </div>

      <div class="form-control-group">
        <FormKit
          type="text"
          name="email"
          id="submit-email"
          class="group-col-6"
          placeholder="example@example.com"
          validation="required | email"
          validation-visibility="dirty"
          label="Email"
          :classes="{
            outer: 'group-col group-col-6',
            inner: 'bg-clr-100 dark:bg-clr-400',
            input: 'bg-transparent text-clr-400 dark:text-white',
            label: 'text-clr-400 dark:text-white is-required',
            message: 'text-clr-orange dark:text-clr-blue'
          }" />

        <FormKit
          v-model="phoneInput"
          @keydown="formatPhone"
          type="text"
          name="phone"
          id="submit-phone"
          class="group-col-6"
          placeholder="xxxxxxxxxx (no dashes or spaces)"
          validation="required | number"
          validation-visibility="dirty"
          autocomplete="off"
          label="Phone"
          :classes="{
            outer: 'group-col group-col-6',
            inner: 'bg-clr-100 dark:bg-clr-400',
            input: 'bg-transparent text-clr-400 dark:text-white',
            label: 'text-clr-400 dark:text-white is-required',
            message: 'text-clr-orange dark:text-clr-blue'
          }" />
      </div>

      <FormKit
        type="text"
        name="website"
        id="submit-website"
        class="group-col-6"
        placeholder="https://example.com"
        validation="required | email"
        validation-visibility="dirty"
        label="Website"
        :classes="{
          outer: 'group-col group-col-6',
          inner: 'bg-clr-100 dark:bg-clr-400',
          input: 'bg-transparent text-clr-400 dark:text-white',
          label: 'text-clr-400 dark:text-white',
          message: 'text-clr-orange dark:text-clr-blue'
        }" />

      <FormKit
        type="radio"
        name="concern"
        id="submit-concern"
        label="What does this email concern?"
        :options="['Full-time', 'Part-time', 'Contract', 'Freelance', 'Other']"
        :classes="{
          legend: 'text-clr-400 dark:text-white',
          input: 'appearance-none border-white dark:border-clr-600 bg-clr-200 dark:bg-clr-400 ring-2 ring-clr-400 dark:ring-clr-200 hover:ring-clr-orange dark:hover:ring-clr-blue focus:ring-clr-orange dark:focus:ring-clr-blue active:ring-clr-orange dark:active:ring-clr-blue checked:ring-clr-orange dark:checked:ring-clr-blue',
          label: 'text-clr-200 dark:text-clr-200',
          message: 'text-clr-orange dark:text-clr-blue'
        }" />

      <FormKit
        v-if="value.concern === 'Other'"
        type="textarea"
        name="description"
        id="submit-description"
        validation="required"
        label="Please give a brief description"
        :classes="{
          inner: 'bg-clr-100 dark:bg-clr-400',
          input: 'bg-transparent text-clr-400 dark:text-white',
          label: 'text-clr-400 dark:text-white',
          message: 'text-clr-orange dark:text-clr-blue'
        }" />

      <FormKit
        type="textarea"
        name="message"
        id="submit-message"
        label="Message"
        :classes="{
          inner: 'bg-clr-100 dark:bg-clr-400',
          input: 'bg-transparent text-clr-400 dark:text-white',
          label: 'text-clr-400 dark:text-white',
          message: 'text-clr-orange dark:text-clr-blue'
        }" />

      <FormKit
        @click.prevent="verifyUser"
        type="submit"
        name="submit-form"
        id="submit-form"
        label="Submit Your Contact Info"
      />
    </FormKit>
    <h3 v-if="formSubmitted" class="form-submission-message text-clr-400 dark:text-white">Thank you! I look forward to speaking with you soon!</h3>
    <p v-if="formError" class="form-error text-clr-blue dark:text-clr-orange">{{ formError }}</p>
    <p class="text-clr-orange">{{ phoneInput }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { reset } from '@formkit/core'
import axios from 'axios';

const formSubmitted = ref(false)
const formError = ref(null)
const formData = ref(null)
const contactForm = ref(null)
const phoneInput = ref(null)

const formatPhone = (e) => {
}

const verifyUser = () => {
  grecaptcha.ready(() => {
    grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, {action: 'submit'}).then(async (token) => {
      if (token) {
        await axios.post('/api/recaptcha', { token })
        .then(res => {
          if ( res.data.success && res.status === 200 ) {
            contactForm.value.node.submit()
          }
        }).catch(err => {
          console.log(err)
          formError.value('reCAPTCHA verification failed. Please try again.')
        })
      } else {
        formError.value = 'reCAPTCHA verification failed. Please try again.'
      }
    })
  })
}

const handleSubmit = async (fields) => {
  formData.value=fields
  reset('contact-form')

  if ( !formData.value.name || !formData.value.email || !formData.value.phone ) {
    formError.value = 'Some fields are missing. Please fill out all fields and try again.'
    return
  }

  try {
    const res = await axios.post('/api/form_submission', fields)
    
    if (res.status === 200) {
      formSubmitted.value = true
      formError.value = null
      formData.value = null
    }
  } catch (err) {
    console.log('There has been an error submitting the form', err)
  }
}

onMounted(() => {

})
</script>

<style lang="scss">
@use '@style/abstracts/variables' as *;

.form-wrapper--contact {
  padding: clamp(2rem, 5vw, 5rem);

  .is-hidden {
    display: none;
  }

  .form-control-group {
    $colGap: 2rem;

    display: flex;
    flex-flow: row wrap;
    column-gap: $colGap;
    width: 100%;
    
    .group-col-3 {
      flex: 1 0 calc(25% - $colGap);
    }
    
    .group-col-6 {
      flex: 1 0 calc(50% - $colGap);
      min-width: 20rem;
    }

    .group-col-9 {
      flex: 1 0 calc(75% - $colGap);
    }
  }

  h3 {
    font-size: 2.4rem;
    text-align: center;
  }
}



#contact-form {
  
  .formkit-outer {
    margin-top: 2rem;

    .formkit-wrapper {

      .formkit-inner {
        margin-top: 0.75rem;

        .formkit-input {
          font-size: 1.6rem;
          width: 100%;
          min-height: 4.8rem;
          padding: 1rem;

          &:focus {
            outline: none;
            border: transparent;
          }

          &:is(textarea) {
            min-height: 7.5rem;
          }
        }
      }

      .formkit-label {
        font-family: $heading;
        font-size: 1.6rem;
        text-transform: uppercase;

        &.is-required {
          &:after {
            content: ' *';
            color: $clr-orange;
          }
        }
      }
    }

    .formkit-fieldset {

      .formkit-legend {
        font-family: $heading;
        font-size: 1.6rem;
        text-transform: uppercase;
      }

      .formkit-options {
        display: flex;
        justify-content: center;
        flex-flow: row wrap;
        gap: 2rem;

        @media (min-width: 768px) {
          justify-content: flex-start;
        }

        .formkit-option {

          .formkit-input {
            --borderDims: 0.5rem;
            --inputDims: 2.4rem;

            display: block;
            width: auto;
            height: var(--inputDims);
            min-height: 0;
            border-style: solid;
            border-width: var(--borderDims);
            border-radius: 50%;
            margin-inline: auto;
            cursor: pointer;

            &:hover {
              border-width: cal(var(--borderDims) / 1.25);
              height: calc(var(--inputDims) + var(--borderDims));
              width: calc(var(--inputDims) + var(--borderDims));
            }

            &:checked, &:focus, &:active {
              appearance: none;
              border-color: white;
            }

            &:checked {
              background-color: $clr-blue;
            }
          }

          .formkit-label {
            display: block;
            font-size: 1.25rem;
            font-family: $body;
            text-transform: lowercase;
            margin-top: 1rem;
          }
        }
      }
    }
  }

  .formkit-messages {
    margin-top: 0.5rem;

    .formkit-message {
      font-size: 1.2rem;
      text-transform: lowercase;
    }
  }

  #submit-form {
    color: white;
    font-family: $heading;
    text-transform: uppercase;
    font-size: 1.5rem;
    letter-spacing: 0.1rem;
    width: 100%;
    border: 0.3rem solid transparent;
    padding: 1.2rem 2.4rem;
    margin-top: 3.5rem;
    background-color: $clr-orange;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: $clr-400;
      border-color: $clr-blue;
      background-color: $clr-100;
    }
  }
}

[data-invalid] .formkit-inner {
  border-width: 0.2rem;
  border-style: solid;
  border-color: $clr-blue;
}

.dark {
  #contact-form {
    [data-invalid] .formkit-inner {
      border-color: $clr-orange;
    }

    .formkit-option {

      .formkit-input {

        &:checked, &:focus, &:active {
          appearance: none;
          border-color: $clr-600 !important;
        }

        &:checked {
          background-color: $clr-orange !important;
        }
      }
    }

    #submit-form {

      &:hover {
        color: white;
        border-color: $clr-orange;
        background-color: $clr-600;
      }
    }
  }
}
</style>