import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { ILista } from "../structures/lista";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { map, switchMap, take } from "rxjs/operators";

@Injectable()
export class ListService {
    public uid!: string;
    public list!: AngularFirestoreCollection<ILista>;
    public lists!: Observable<ILista[]>;

    constructor(public afs: AngularFirestore, private afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.uid = user.uid;
                this.list = this.afs.collection('users').doc(this.uid).collection<ILista>('lists');
            }
        });

        this.lists = this.afAuth.authState.pipe(
            switchMap(user => {
                if (!user) return of([]);
                this.uid = user.uid;
                this.list = this.afs.collection('users').doc(this.uid).collection<ILista>('lists');
                return this.list.snapshotChanges().pipe(
                    map(actions =>
                        actions.map(item => {
                            const data = item.payload.doc.data() as ILista;
                            const id = item.payload.doc.id;
                            return { id, ...data };
                        })
                    )
                );
            })
        );
    }

    async add(list: ILista): Promise<any> {
        if (!this.uid) {
            const user = await this.afAuth.authState.pipe(take(1)).toPromise();
            if (user) {
                this.uid = user.uid;
                this.list = this.afs.collection('users').doc(this.uid).collection<ILista>('lists');
            }
        }

        if (!this.list) throw Error('No se pudo autenticar al usuario para crear la lista.');
        const createdAt = firebase.firestore.FieldValue.serverTimestamp();

        list.createdAt = createdAt;
        return this.list.add(list);
    }
}
