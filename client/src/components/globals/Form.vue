<template>
  <div class="form-wrapper--contact bg-clr-100/30 dark:bg-clr-400/20">
    <FormKit
      type="form"
      id="contact-form"
      name="contact-form"
      @submit="handleSubmit"
      submit-label="Contact Me"
      :classes="{
        message: 'text-clr-blue dark:text-clr-orange',
        input: 'bg-clr-blue dark:bg-clr-orange',
      }"
      :form-class="formSubmitted ? 'is-hidden' : ''"
      #default="{ value }">

      <FormKit
        type="text"
        name="name"
        id="submit-name"
        placeholder="first and last name"
        validation="required"
        validation-visibility="dirty"
        label="Name"
        :classes="{
          inner: 'bg-clr-100 dark:bg-clr-400',
          input: 'bg-transparent text-clr-400 dark:text-white',
          label: 'text-clr-400 dark:text-white',
          message: 'text-clr-blue dark:text-clrorangee'
        }" />

      <div class="form-control-group form-control-group--6">
        <FormKit
        type="text"
        name="email"
        id="submit-email"
        placeholder="example@example.com"
        validation="required|email"
        validation-visibility="dirty"
        label="Email"
        :classes="{
          inner: 'bg-clr-100 dark:bg-clr-400',
          input: 'bg-transparent text-clr-400 dark:text-white',
          label: 'text-clr-400 dark:text-white',
          message: 'text-clr-blue dark:text-clrorangee'
        }" />

      <FormKit
        type="text"
        name="phone"
        id="submit-phone"
        placeholder="(xxx) xxx-xxxx"
        validation="required | number | length:10"
        validation-visibility="dirty"
        autocomplete="off"
        label="Phone"
        :classes="{
          inner: 'bg-clr-100 dark:bg-clr-400',
          input: 'bg-transparent text-clr-400 dark:text-white',
          label: 'text-clr-400 dark:text-white',
          message: 'text-clr-blue dark:text-clrorangee'
        }" />
      </div>

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
          message: 'text-clr-blue dark:text-clrorangee'
        }" />

      <FormKit
        v-if="value.concern === 'Other'"
        type="textarea"
        name="explain"
        id="submit-explain"
        validation="required"
        label="Please give a brief description"
        :classes="{
          inner: 'bg-clr-100 dark:bg-clr-400',
          input: 'bg-transparent text-clr-400 dark:text-white',
          label: 'text-clr-400 dark:text-white',
          message: 'text-clr-blue dark:text-clrorangee'
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
    </FormKit>
    <h3 v-if="formSubmitted" class="form-submission-message text-clr-400 dark:text-white">Thank you! I look forward to speaking with you soon!</h3>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const formSubmitted = ref(false)

const handleSubmit = (fields) => {
  formSubmitted.value = true
}

onMounted(() => {

})
</script>

<style lang="scss">
@use '@style/abstracts/variables' as *;

.form-wrapper--contact {
  padding: 5rem;

  .is-hidden {
    display: none;
  }

  .form-control-group {
    display: flex;
    flex-flow: row wrap;
    gap: 0 2rem;

    > div {
      flex: 1 0 50%;
      min-width: 20rem;
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
        flex-flow: row wrap;
        gap: 2rem;

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

  .formkit-actions {
    margin-top: 5rem;
    
    .formkit-input {
      color: white;
      font-family: $heading;
      text-transform: uppercase;
      font-size: 1.5rem;
      letter-spacing: 0.1rem;
      width: 100%;
      border: 0.3rem solid transparent;
      padding: 1.2rem 2.4rem;
      background-color: $clr-orange;
      transition: all 0.2s ease-in-out;

      &:hover {
        color: $clr-400;
        border-color: $clr-blue;
        background-color: $clr-100;
      }
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

    .formkit-actions {
    
      .formkit-input {

        &:hover {
          color: white;
          border-color: $clr-orange;
          background-color: $clr-600;
        }
      }
    }
  }
}
</style>