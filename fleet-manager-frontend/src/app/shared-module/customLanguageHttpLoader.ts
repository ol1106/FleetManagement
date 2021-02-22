import {Injectable} from '@angular/core';
import {TranslateLoader} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CustomTranslateHttpLoader implements TranslateLoader {
    public prefix: string = 'language/api/v1/';

    constructor(private http: HttpClient) {}

    public getTranslation(lang: string): any {
        // const filename = environment.apiGatewayHost + this.prefix + lang;
        // return this.http.get(filename);
        return of({});
    }
}

export function CustomHttpLoaderFactory(httpClient: HttpClient) {
    return new CustomTranslateHttpLoader(httpClient);
}
