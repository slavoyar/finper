<template>
  <a-layout>
    <a-layout-content>
      <a-row>
        <a-col :span="24" :md="{ span: 18, offset: 3 }">
          <a-card title="Privacy Policy">
            <h2>1. Information We Collect</h2>
            <p>When you use our Telegram bot, we store:</p>
            <ul>
              <li>
                <strong>Tinkoff Investment API Token</strong> - Used for read-only access to your investment
                portfolio
              </li>
              <li><strong>Telegram User ID</strong> - Your unique Telegram identifier</li>
              <li><strong>Connection Timestamp</strong> - Date/time of your last connection</li>
            </ul>

            <h2>2. How We Use Your Data</h2>
            <p>We use your information exclusively to:</p>
            <ul>
              <li>Fetch and display your investment portfolio data within Telegram</li>
              <li>Maintain secure connection between our service and Tinkoff API</li>
              <li>Provide historical performance tracking (read-only)</li>
            </ul>

            <h2>3. Data Storage & Security</h2>
            <p>All sensitive data is protected with:</p>
            <ul>
              <li>AES-256 encryption at rest</li>
              <li>SSL/TLS encryption in transit</li>
              <li>Strict access controls</li>
              <li>Automatic deletion after <strong>30 days</strong> of inactivity</li>
            </ul>

            <h2>4. Data Sharing</h2>
            <p>We <strong>never</strong> share, sell, or expose your:</p>
            <ul>
              <li>Tinkoff API tokens</li>
              <li>Financial data</li>
              <li>Personal identifiers</li>
            </ul>
            <p>No third parties have access to your investment information.</p>

            <h2>5. Your Rights</h2>
            <p>You can:</p>
            <ul>
              <li>Request immediate deletion of your data via our support channel</li>
              <li>Revoke Tinkoff API access at any time through Tinkoff's platform</li>
              <li>Export your stored non-sensitive data</li>
            </ul>

            <h2>6. Contact Information</h2>
            <a-descriptions bordered :column="1">
              <a-descriptions-item label="Data Controller"> Yaroslav Zaprudskii </a-descriptions-item>
              <a-descriptions-item label="Email">
                <a :href="`mailto:${supportEmail}`">{{ supportEmail }}</a>
              </a-descriptions-item>
            </a-descriptions>

            <p>Last Updated: {{ currentDate }}</p>
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
