import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from "@angular/fire/firestore";
import { ITodo } from "../structures/todos";
import { AuthService } from "./auth.services";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class TodoService {
    private collection!: AngularFirestoreCollection<ITodo>;
    private listId!: string;
    private uid!: string;
    private ref!: Observable<DocumentChangeAction<ITodo>[]>;

    constructor(private afs: AngularFirestore, private auth: AuthService) {
        this.auth.getUser().subscribe(user => {
            this.uid = user.uid;
        });
    }

    setCollection(listId: string) {
        this.listId = listId;
        this.collection = this.afs.collection('users').doc(this.uid).collection('lists').doc(listId).collection<ITodo>('todos');
        this.ref = this.collection.snapshotChanges();
    }

    getFromList(listId: string): Observable<ITodo[]> {
        if (!this.collection || this.listId !== listId) {
            this.setCollection(listId);
        }
        return this.ref.pipe(
            map(actions =>
                actions.map(item => {
                    const data = item.payload.doc.data() as ITodo;
                    const id = item.payload.doc.id;

                    return { ...data, id } as ITodo;
                })
            )
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
