<template>
  <article class="legal">
    <h2>{{ $t('terms.using') }}</h2>
    <p>{{ $t('terms.usingBody') }}</p>

    <h2>{{ $t('terms.what') }}</h2>
    <p>{{ $t('terms.whatBody') }}</p>

    <h2>{{ $t('terms.advice') }}</h2>
    <p>{{ $t('terms.adviceBody') }}</p>

    <h2>{{ $t('terms.liability') }}</h2>
    <p>{{ $t('terms.liabilityBody') }}</p>

    <h2>{{ $t('terms.changes') }}</h2>
    <p>{{ $t('terms.changesBody') }}</p>

    <h2>{{ $t('terms.contact') }}</h2>
    <dl>
      <dt>{{ $t('terms.email') }}</dt>
      <dd>
        <a :href="`mailto:${supportEmail}`">{{ supportEmail }}</a>
      </dd>
    </dl>

    <p>{{ $t('terms.effective') }}</p>
  </article>
</template>

<script setup lang="ts">
const supportEmail = 'slavoyarmc@gmail.com';
</script>
