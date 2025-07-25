<template>
  <a-layout>
    <a-layout-content>
      <a-row>
        <a-col :span="24" :md="{ span: 18, offset: 3 }">
          <a-card title="Terms of Use">
            <h2>1. Acceptance of Terms</h2>
            <p>By using this Telegram bot, you agree to these binding terms.</p>

            <h2>2. Service Description</h2>
            <p>Our bot provides:</p>
            <ul>
              <li>Read-only access to Tinkoff investment portfolios</li>
              <li>Financial data visualization within Telegram</li>
              <li>Historical performance tracking</li>
            </ul>

            <h2>3. User Obligations</h2>
            <p>You agree to:</p>
            <ul>
              <li>Provide only <strong>read-only</strong> Tinkoff API tokens</li>
              <li>Maintain security of your credentials</li>
              <li>Comply with Tinkoff's API terms</li>
              <li>Use the service only for personal purposes</li>
            </ul>

            <h2>4. API Token Usage</h2>
            <p>We:</p>
            <ul>
              <li>Store tokens using bank-grade encryption</li>
              <li>Access your portfolio <strong>only when requested</strong> by you</li>
              <li>Perform <strong>no write operations</strong></li>
              <li>Never initiate trades or withdrawals</li>
            </ul>

            <h2>5. Disclaimer of Warranties</h2>
            <p>The service is provided "AS IS" without warranties of:</p>
            <ul>
              <li>Accuracy of financial data</li>
              <li>Uninterrupted operation</li>
              <li>Fitness for specific purposes</li>
            </ul>

            <h2>6. Limitation of Liability</h2>
            <p>We are not liable for:</p>
            <ul>
              <li>Financial losses from using this service</li>
              <li>Data inaccuracies or delays</li>
              <li>Security breaches originating outside our systems</li>
            </ul>

            <h2>7. Termination</h2>
            <p>We may terminate access for:</p>
            <ul>
              <li>Violation of these terms</li>
              <li>Suspicious activity</li>
              <li>Non-usage for 90+ days</li>
            </ul>

            <h2>8. Changes to Terms</h2>
            <p>We will notify users of material changes via Telegram 7 days before implementation.</p>

            <h2>9. Contact</h2>
            <a-descriptions bordered :column="1">
              <a-descriptions-item label="Legal Inquiries">
                <a :href="`mailto:${legalEmail}`">{{ legalEmail }}</a>
              </a-descriptions-item>
              <a-descriptions-item label="Support">
                <a :href="`mailto:${supportEmail}`">{{ supportEmail }}</a>
              </a-descriptions-item>
            </a-descriptions>

            <p class="update-notice">Effective: {{ currentDate }}</p>
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
