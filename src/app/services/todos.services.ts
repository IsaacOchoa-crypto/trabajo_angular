import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { ITodo } from "../structures/todos";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";

@Injectable()
export class TodoService {
    private collection!: AngularFirestoreCollection<ITodo>;
    private listId!: string;
    private uid!: string;

    constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.uid = user.uid;
            }
        });
    }

    setCollection(listId: string) {
        this.listId = listId;
        this.collection = this.afs.collection('users').doc(this.uid).collection('lists').doc(listId).collection<ITodo>('todos');
    }

    getFromList(listId: string): Observable<ITodo[]> {
        return this.afAuth.authState.pipe(
            switchMap(user => {
                if (!user) return of([]);
                this.uid = user.uid;
                this.setCollection(listId);
                return this.collection.snapshotChanges().pipe(
                    map(actions =>
                        actions.map(item => {
                            const data = item.payload.doc.data() as ITodo;
                            const id = item.payload.doc.id;
                            return { ...data, id } as ITodo;
                        })
                    )
                );
            })
        );
    }

    add(listId: string, todo: ITodo): Promise<any> {
        if (!this.collection || this.listId !== listId) {
            this.setCollection(listId);
        }
        const createdAt = firebase.firestore.FieldValue.serverTimestamp();
        todo.createdAt = createdAt;
        return this.collection.add(todo);
    }
}
