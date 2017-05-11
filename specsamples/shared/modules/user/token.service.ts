import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class TokenService implements ITokenService {

    constructor(private http: Http) {}

    public getToken(): Observable<any> {
        return this.http.get("api/kaka").map(response => response.json());
    }

}

export interface ITokenService {

    getToken(): Observable<any>;

}