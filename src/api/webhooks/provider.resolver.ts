import { ConfigurationManager } from "../../config/configuration.manager";
import { Loader } from "../../startup/loader";
import Dictionary from "../../common/dictionary";
import { IWebhooksService } from "./interfaces/webhooks.service.interface";
import { TeraWebhookController } from "./providers/terra/terra.webhook.controller";
import { Injector } from "../../startup/injector";

////////////////////////////////////////////////////////////////////////

export class ProviderResolver {

    public static resolve() {

        var services = new Dictionary<IWebhooksService>();
        var providers = ConfigurationManager.webhookControllerProviders();

        for (var cp of providers) {
            if (cp.Provider === 'Terra') {
                services.add(cp.Provider, Injector.Container.resolve(TeraWebhookController));
            }
        }
        return services;
    }

}
