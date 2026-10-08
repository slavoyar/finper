<template>
  <article class="legal">
    <p>{{ $t('privacy.lead') }}</p>

    <h2>{{ $t('privacy.onThisPhone') }}</h2>
    <p>{{ $t('privacy.onThisPhoneBody') }}</p>

    <h2>{{ $t('privacy.openBond') }}</h2>
    <p>{{ $t('privacy.openBondBody') }}</p>

    <h2>{{ $t('privacy.contact') }}</h2>
    <dl>
      <dt>{{ $t('privacy.controller') }}</dt>
      <dd>{{ $t('privacy.controllerValue') }}</dd>
      <dt>{{ $t('privacy.email') }}</dt>
      <dd>
        <a :href="`mailto:${supportEmail}`">{{ supportEmail }}</a>
      </dd>
    </dl>

    <p>{{ $t('privacy.updated') }}</p>
  </article>
</template>

<script setup lang="ts">
const supportEmail = 'slavoyarmc@gmail.com';
</script>
