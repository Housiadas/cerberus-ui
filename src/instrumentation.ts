import { registerOTel } from "@vercel/otel";

import { APP_CONFIG } from "@/config";

export function register() {
  registerOTel({
    serviceName: APP_CONFIG.name,
    instrumentationConfig: {
      fetch: {
        // This URLs will have the tracing context propagated to them.
        propagateContextUrls: ["your-service-domain.com", "your-database-domain.com"],
        // This URLs will not have the tracing context propagated to them.
        dontPropagateContextUrls: ["some-third-party-service-domain.com"],
        // This URLs will be ignored and will not be traced.
        ignoreUrls: ["my-internal-private-tool.com"],
      },
    },
  });
}
