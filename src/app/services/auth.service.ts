import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environment";

interface LoginResponse {
  token: string;
  // other fields if your API returns user info
}

@Injectable({
    providedIn: "root"
})

export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth/login`;
    private fakeToken : string | null = null;

    constructor(private readonly router : Router, private readonly http: HttpClient) {}

    login(username: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.apiUrl, { username, password });
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    logout(): void {
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return localStorage.getItem('token') !== null;
    }
}