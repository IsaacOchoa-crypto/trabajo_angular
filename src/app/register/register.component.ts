import { Component, OnInit } from "@angular/core";
import { IUser } from '../structures/user';

//permite a la clase ejecutarce como componente
@Component({
    selector: 'Register',
    templateUrl: 'register.component.html'
})

//declaracion de componente
export class RegisterComponent implements OnInit {

    public user: IUser = { email: '', password: '' }

    ngOnInit(): void {

    }

    register() {
        console.log(this.user);
    }
}