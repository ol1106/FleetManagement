import {Inject, Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SsoService} from "../helpers/sso.service";
import {Environment_Injection_Token} from "./Environment_Injection_Token";
import * as jwt_decode from "jwt-decode";
@Injectable()
export class SSOConfigService {

    private token;
    private authUrl: string;
    private readonly socketUrl: string;
    private readonly loginUrl: string;
    private readonly serverUrl: string;
    private readonly appName: string;

    constructor(private cookies: CookieService,
                private  http: HttpClient,
                private sso: SsoService,
                @Inject(Environment_Injection_Token) private environment
    ) {
        this.token = this.cookies.get('currentUser') ? this.cookies.get('currentUser') : null;
        this.socketUrl = 'ws://' + this.environment.SSO_SERVER_URI.split('://')[1] + '/socket';
        this.loginUrl = this.sso.getLoginUrl();
        this.authUrl = this.environment.SSO_SERVER_URI + '/api/v1/auth';
        this.serverUrl = this.environment.SERVER_URI;
        this.appName = this.environment.SSO_APP_NAME;


    }

    load(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (!this.token) {
                this.token = window.location.href.split("token=")[1] ?
                    window.location.href.split("token=")[1].split("%22").join("\"") : null;
                if (this.token == null || this.token == undefined) {
                    window.location.href = this.loginUrl;
                }
                let expToken = JSON.parse(this.token).token;
                this.cookies.set('currentUser', expToken, this.getTokenExpirationDate(expToken), location.host, '', false, 'Strict');

            }
            if (window.location.href.split("token=")[1]) {
                window.location.href = window.location.href.split("?")[0];
            }

            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'url': this.serverUrl,
                'appName': this.appName
            });

            this.http.get<any>(this.authUrl, {headers: headers})
                .subscribe(user => {
                        this.sso.user = user.user;
                        resolve(true);
                    },
                    error => {
                        console.log(error)
                    });
            this.initializeWebSocketConnection();
        });
    }

    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);
        console.log(decoded)
        if (decoded['exp'] === undefined) {
            return null;
        }
        const date = new Date(0);
        date.setUTCSeconds(decoded['exp']);
        console.log(date);
        return date;
    }

    initializeWebSocketConnection() {
        console.log("initiate websocket connection");
        const that = this;
        const socket = new WebSocket(this.socketUrl);
        socket.addEventListener('open', function (event) {
            socket.send('Hello Server!');
        });
        socket.addEventListener('message', function (event) {
            if (that.token === event['data']) {
                that.sso.logout();
            }
        });
        socket.onclose = (e) => {
            console.log("closed websocket connection");
        };
    }
}

export function SSOConfigFactory(config: SSOConfigService) {
    return () => config.load();
}