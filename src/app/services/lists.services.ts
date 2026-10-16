import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { AuthService } from "./auth.services";
import { ILista } from "../structures/lista";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { map } from "rxjs/operators";

@Injectable()
export class ListService {
    public uid!: string;
    public list!: AngularFirestoreCollection<ILista>;
    public lists!: Observable<ILista[]>;

    constructor(public afs: AngularFirestore, private auth: AuthService) {
        this.auth.getUser().subscribe(user => {
            this.uid = user.uid;

            if (this.uid) this.setCollection();
        });
    }

    setCollection() {
        this.list = this.afs.collection('users').doc(this.uid).collection<ILista>('lists');
        this.lists = this.list.snapshotChanges().pipe(
            map(actions =>
                actions.map(item => {
                    const data = item.payload.doc.data() as ILista;
                    const id = item.payload.doc.id;
                    return { id, ...data };
                })
            )
        );
    }

    add(list: ILista): Promise<any> {
        if (!this.list) throw Error('Asignar un valor a la coleccion antes de continuar');
        const createdAt = firebase.firestore.FieldValue.serverTimestamp();

        list.createdAt = createdAt;
        return this.list.add(list);
    }
}
