import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environment";

@Injectable({
    providedIn: "root"
})

export class ApiService {
    private apiUrl = `${environment.apiUrl}/Employees`;

    constructor(private readonly http: HttpClient) {}

    employeeList(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    addEmployee(reqto: Object): Observable<any> {
        return this.http.post(this.apiUrl, reqto);
    }

    viewEmployee(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`);
    }

    editEmployee(reqto: any, id: string): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, reqto);
    }

    removeEmployee(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}