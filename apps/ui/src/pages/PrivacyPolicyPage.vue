<template>
  <a-layout>
    <a-layout-content>
      <a-row>
        <a-col :span="24" :md="{ span: 18, offset: 3 }">
          <a-card :title="$t('privacy.title')">
            <h2>{{ $t('privacy.informationWeCollect') }}</h2>
            <p>{{ $t('privacy.informationWeCollectDescription') }}</p>
            <ul>
              <li>
                <strong>{{ $t('privacy.apiTokenLabel') }}</strong>
              </li>
              <li>
                <strong>{{ $t('privacy.telegramUserIdLabel') }}</strong>
              </li>
              <li>
                <strong>{{ $t('privacy.connectionTimestampLabel') }}</strong>
              </li>
            </ul>

            <h2>{{ $t('privacy.howWeUseYourData') }}</h2>
            <p>{{ $t('privacy.howWeUseYourDataDescription') }}</p>
            <ul>
              <li>{{ $t('privacy.fetchPortfolioData') }}</li>
              <li>{{ $t('privacy.maintainSecureConnection') }}</li>
              <li>{{ $t('privacy.historicalPerformanceTracking') }}</li>
            </ul>

            <h2>{{ $t('privacy.dataStorageSecurity') }}</h2>
            <p>{{ $t('privacy.dataStorageSecurityDescription') }}</p>
            <ul>
              <li>{{ $t('privacy.sslTlsEncryption') }}</li>
              <li>{{ $t('privacy.strictAccessControls') }}</li>
              <li>{{ $t('privacy.automaticDeletion') }}</li>
            </ul>

            <h2>{{ $t('privacy.dataSharing') }}</h2>
            <p>{{ $t('privacy.dataSharingDescription') }}</p>
            <ul>
              <li>{{ $t('privacy.apiTokens') }}</li>
              <li>{{ $t('privacy.financialData') }}</li>
              <li>{{ $t('privacy.personalIdentifiers') }}</li>
            </ul>
            <p>{{ $t('privacy.noThirdParties') }}</p>

            <h2>{{ $t('privacy.yourRights') }}</h2>
            <p>{{ $t('privacy.yourRightsDescription') }}</p>
            <ul>
              <li>{{ $t('privacy.requestDeletion') }}</li>
              <li>{{ $t('privacy.revokeApiAccess') }}</li>
              <li>{{ $t('privacy.exportData') }}</li>
            </ul>

            <h2>{{ $t('privacy.contactInformation') }}</h2>
            <a-descriptions bordered :column="1">
              <a-descriptions-item :label="$t('privacy.dataController')">{{
                $t('privacy.dataControllerValue')
              }}</a-descriptions-item>
              <a-descriptions-item :label="$t('privacy.emailLabel')">
                <a :href="`mailto:${supportEmail}`">{{ supportEmail }}</a>
              </a-descriptions-item>
            </a-descriptions>

            <p>{{ $t('privacy.lastUpdated', { date: currentDate }) }}</p>
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
