/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    apiGatewayHost: 'http://localhost:4000/',
    enableAuth: false,
    language: 'en',

    SERVER_URI: 'http://localhost:4000',
    SSO_APP_NAME: 'dss',
    SSO_APPLICATION_URI: 'http://ovh1.rayonit.com:9456',
    SSO_SERVER_URI: 'http://ovh1.rayonit.com:9455',

    hmr: false

};
