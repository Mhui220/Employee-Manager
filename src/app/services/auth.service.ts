import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class AuthService {
    private fakeToken : string | null = null;

    constructor(private readonly router : Router) {}

    login(email: string, password: string): boolean {
        if(email === 'admin@example.com' && password === 'admin') {
            this.fakeToken = 'FAKE_JWT_TOKEN';
            return true;
        }

        return false;
    }

    logout(): void {
        this.fakeToken = null;
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return this.fakeToken !== null;
    }
}