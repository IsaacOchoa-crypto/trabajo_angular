import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.services";

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.auth.getUser().subscribe(user => {
            if (user) {
                this.router.navigate(['/']);
            }
        });
    }

    login() {
        this.auth.login().then(() => {
            this.router.navigate(['/']);
        });
    }
}
