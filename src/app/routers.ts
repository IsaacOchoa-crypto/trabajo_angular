import { CanActivate } from "@angular/router/src/utils/preactivation";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuard } from "./guards/auth.guard.services";
import { ListCreatorComponent } from "./creator/list.creator.component";

export const appRoutes = [
    { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'new', component: ListCreatorComponent, canActivate: [AuthGuard] }
]

