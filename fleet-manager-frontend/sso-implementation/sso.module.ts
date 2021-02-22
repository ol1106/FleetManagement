import {ModuleWithProviders, NgModule} from "@angular/core";
import {SsoService} from "./helpers/sso.service";
import {SSOConfigService} from "./config/SSOConfigService";
import {Environment_Injection_Token} from "./config/Environment_Injection_Token";
import {EnvInterface} from "./config/Env-Interface";


@NgModule()
export class SsoModule {

    static forRoot(env: EnvInterface): ModuleWithProviders {
        return {
            ngModule: SsoModule,
            providers: [
                SsoService,
                SSOConfigService,
                {
                    provide: Environment_Injection_Token,
                    useValue: env
                }
            ]
        }
    }
}