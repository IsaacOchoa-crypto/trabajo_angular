import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.services";



//permite a la clase ejecutarce como componente
@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})

//declaracion de componente
export class LoginComponent implements OnInit {
    constructor(private auth: AuthService) { }

    ngOnInit(): void {
        //this.auth.login().then(console.log)
        this.auth.getUser().subscribe(console.log)
    }
    login() {
        this.auth.login().then(console.log)
    }
}




