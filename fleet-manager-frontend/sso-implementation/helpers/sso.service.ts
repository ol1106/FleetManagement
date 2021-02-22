import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Environment_Injection_Token} from "../config/Environment_Injection_Token";

@Injectable()
export class SsoService {

    user;
    private logoutUrl;
    private readonly refreshUrl;
    private readonly loginUrl;

    constructor(private http: HttpClient,
                private cookies: CookieService,
                @Inject(Environment_Injection_Token) private environment
    ) {

        this.logoutUrl = this.environment.SSO_SERVER_URI + '/api/v1/logout';
        this.refreshUrl = this.getRefreshUrl()
        this.loginUrl = this.getLoginUrl();

    }

    getLoginUrl() {
        let host = location.host.replace("//", '');
        let pathname = location.pathname !== '/' ? location.pathname.replace("//", '') : '';
        return this.environment.SSO_APPLICATION_URI + '/login?url=http://' + host + pathname;
    }

    getRefreshUrl() {
        let host = location.host.replace("//", '');
        let pathname = location.pathname.endsWith('/') ? location.pathname.substring(0, location.pathname.length - 1) : location.pathname;
        return this.environment.SSO_APPLICATION_URI + '/login/refresh?url=http://' + host + pathname;
    }

    getUser() {
        return this.user;
    }

    getToken() {
        return this.cookies.get('currentUser');
    }

    hasRole(role: string) {
        return !!(this.user && this.user.roles.indexOf(role) >= 0);
    }

    isAuthenticated() {
        return !!this.user;
    }

    refreshToken() {

        this.cookies.delete('currentUser');
        window.location.href = this.getRefreshUrl();
    }

    logout() {
        return this.http.get(this.logoutUrl).subscribe(null, null,
            () => {

                this.cookies.delete('currentUser');
                window.location.href = this.getLoginUrl();
            }
        );
    }

}
