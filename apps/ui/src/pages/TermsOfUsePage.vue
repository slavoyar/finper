<template>
  <a-layout>
    <a-layout-content>
      <a-row>
        <a-col :span="24" :md="{ span: 18, offset: 3 }">
          <a-card :title="$t('terms.title')">
            <h2>{{ $t('terms.acceptance') }}</h2>
            <p>{{ $t('terms.acceptanceDescription') }}</p>

            <h2>{{ $t('terms.serviceDescription.title') }}</h2>
            <p>{{ $t('terms.serviceDescription.intro') }}</p>
            <ul>
              <li>{{ $t('terms.serviceDescription.features.1') }}</li>
              <li>{{ $t('terms.serviceDescription.features.2') }}</li>
              <li>{{ $t('terms.serviceDescription.features.3') }}</li>
            </ul>

            <h2>{{ $t('terms.userObligations.title') }}</h2>
            <p>{{ $t('terms.userObligations.intro') }}</p>
            <ul>
              <li>{{ $t('terms.userObligations.items.1') }}</li>
              <li>{{ $t('terms.userObligations.items.2') }}</li>
              <li>{{ $t('terms.userObligations.items.3') }}</li>
              <li>{{ $t('terms.userObligations.items.4') }}</li>
            </ul>

            <h2>{{ $t('terms.apiTokenUsage.title') }}</h2>
            <p>{{ $t('terms.apiTokenUsage.intro') }}</p>
            <ul>
              <li>{{ $t('terms.apiTokenUsage.items.1') }}</li>
              <li>{{ $t('terms.apiTokenUsage.items.2') }}</li>
              <li>{{ $t('terms.apiTokenUsage.items.3') }}</li>
              <li>{{ $t('terms.apiTokenUsage.items.4') }}</li>
            </ul>

            <h2>{{ $t('terms.disclaimer.title') }}</h2>
            <p>{{ $t('terms.disclaimer.intro') }}</p>
            <ul>
              <li>{{ $t('terms.disclaimer.items.1') }}</li>
              <li>{{ $t('terms.disclaimer.items.2') }}</li>
              <li>{{ $t('terms.disclaimer.items.3') }}</li>
            </ul>

            <h2>{{ $t('terms.limitationOfLiability.title') }}</h2>
            <p>{{ $t('terms.limitationOfLiability.intro') }}</p>
            <ul>
              <li>{{ $t('terms.limitationOfLiability.items.1') }}</li>
              <li>{{ $t('terms.limitationOfLiability.items.2') }}</li>
              <li>{{ $t('terms.limitationOfLiability.items.3') }}</li>
            </ul>

            <h2>{{ $t('terms.termination.title') }}</h2>
            <p>{{ $t('terms.termination.intro') }}</p>
            <ul>
              <li>{{ $t('terms.termination.items.1') }}</li>
              <li>{{ $t('terms.termination.items.2') }}</li>
              <li>{{ $t('terms.termination.items.3') }}</li>
            </ul>

            <h2>{{ $t('terms.changesToTerms') }}</h2>
            <p>{{ $t('terms.changesToTermsIntro') }}</p>

            <h2>{{ $t('terms.contact') }}</h2>
            <a-descriptions bordered :column="1">
              <a-descriptions-item :label="$t('terms.legalInquiries')">
                <a :href="`mailto:${legalEmail}`">{{ legalEmail }}</a>
              </a-descriptions-item>
              <a-descriptions-item :label="$t('terms.support')">
                <a :href="`mailto:${supportEmail}`">{{ supportEmail }}</a>
              </a-descriptions-item>
            </a-descriptions>

            <p class="update-notice">{{ $t('terms.effectiveDate', { date: currentDate }) }}</p>
          </a-card>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      legalEmail: 'slavoyarmc@gmail.com',
      supportEmail: 'slavoyarmc@gmail.com',
      currentDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };
  },
};
</script>
