import { Routes } from '@angular/router';

import { TeacherMainPageComponent } from '@pages/teacher-main-page/teacher-main-page.component'
import { ChatComponent } from '@components/chat/chat.component';
import { PdfviewerComponent } from '@components/pdfviewer/pdfviewer.component';
import { MainselectorPageComponent } from '@pages/mainselector-page/mainselector-page.component';
import { SchoolMainPageComponent } from '@pages/school-main-page/school-main-page.component';
import { TeachersCRUDComponent } from '@superadmin/teachers-crud/teachers-crud.component';
import { CoursesCRUDComponent } from '@superadmin/course-crud/course-crud.component';
import { ExamCrudComponent } from '@superadmin/exam-crud/exam-crud.component';
import { ExamComponent } from '@evaluation/exam/exam.component';
import { authGuard } from './../app/guards/auth.guard';
import { publicGuard } from './../app/guards/public.guard';
import { adminGuard } from './../app/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainselectorPageComponent
  },
  {
    path: 'main',
    component: SchoolMainPageComponent
  },
  {
    path: 'crud',
    component: TeachersCRUDComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'course-crud',
    component: CoursesCRUDComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'exam-crud',
    component: ExamCrudComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'exam/:id',
    component: ExamComponent
  },
  {
    path: 'teacher/:id',
    component: TeacherMainPageComponent
  },
  {
    path: 'pdf-viewer',
    component: PdfviewerComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  }
];
