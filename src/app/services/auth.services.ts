import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { from, Observable } from "rxjs";
import { map, take, filter } from 'rxjs/operators';
import { IUser } from '../structures/users'
import 'firebase/auth';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

    constructor(public afAuth: AngularFireAuth, private userService: UserService) { }

    getUser(): Observable<IUser> {
        return this.afAuth.authState.pipe(
            take(1),
            filter(user => !!user),
            map((user => user as IUser)))
    }

    login(): Promise<void> {
        return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
            .then(result => {
                return this.userService.add({ uid: result.user!.uid, email: result.user!.email! });

            }).catch(console.log);
    }
}




