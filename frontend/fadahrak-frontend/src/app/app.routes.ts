import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component'; // جديد
import { AboutComponent } from './components/about/about.component'; // جديد
import { ContactComponent } from './components/contact/contact.component'; // جديد
import { SuccessStoriesComponent } from './components/success-stories/success-stories.component'; // جديد
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { OwnerDashboardComponent } from './components/owner-dashboard/owner-dashboard.component';
import { SeekerDashboardComponent } from './components/seeker-dashboard/seeker-dashboard.component';
import { InboxComponent } from './components/inbox/inbox.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'jobs', component: JobListComponent },
  { path: 'job/:id', component: JobDetailComponent }, // صفحة تفاصيل الوظيفة
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'success-stories', component: SuccessStoriesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'owner-dashboard', component: OwnerDashboardComponent },
  { path: 'seeker-dashboard', component: SeekerDashboardComponent },
  { path: 'inbox', component: InboxComponent },
  { path: 'inbox/:id', component: InboxComponent },
  { path: '**', redirectTo: '' }
];
