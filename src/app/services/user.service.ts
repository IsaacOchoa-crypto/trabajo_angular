import { Injectable } from "@angular/core";
import { IUser } from "../structures/users";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";

@Injectable()
export class UserService {
    
    private userCollection: AngularFirestoreCollection<IUser>;
    
    constructor(private afs: AngularFirestore) {
        this.userCollection = afs.collection<IUser>('users');
    }

    add(userInfo: IUser): Promise<void> {
        return this.userCollection.doc(userInfo.uid).set(userInfo).catch(console.log);
    }
}
