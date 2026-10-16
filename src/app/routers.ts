import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuard } from "./guards/auth.guard.services";
import { ListCreatorComponent } from "./creator/list.creator.component";
import { ListComponent } from "./creator/list/list.component";

export const appRoutes = [
    { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'new', component: ListCreatorComponent, canActivate: [AuthGuard] },
    { path: 'list/:id', component: ListComponent, canActivate: [AuthGuard] }
]


