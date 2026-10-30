import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './base/app.component';
import { HomeComponent } from './home/home.component';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { environment } from '../environments/environment';
import { appRoutes } from './routers';
import { AngularFireModule } from '@angular/fire';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { AuthService } from './services/auth.services'
import { AuthGuard } from './guards/auth.guard.services';
import { UserService } from './services/user.service';
import { ListCreatorComponent } from './creator/list.creator.component';
import { FormsModule } from '@angular/forms';
import { ListService } from './services/lists.services';
import { ListComponent } from './creator/list/list.component';
import { TodosCreatorComponent } from './todo/creator/todos.creator.component';
import { TodoService } from './services/todos.services';
import { TodosCardComponent } from './todo/card/todo.card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ListCreatorComponent,
    ListComponent,
    TodosCreatorComponent,
    TodosCardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    TransferHttpCacheModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [AuthService, AuthGuard, UserService, ListService, TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
