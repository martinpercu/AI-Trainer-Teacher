# Trainer-Teacher

Production-ready online examination platform built with **Angular 19** and **Firebase**. Features real-time exam delivery, auto-save progress tracking, and comprehensive admin dashboard for managing educational content.

## 🎯 What's Inside

This repository demonstrates a modern educational assessment system with:
- **Timed Exams**: Auto-save progress, resume capability, and intelligent question shuffling
- **Multi-Role System**: Admin CRUD operations, recruiter exam management, student exam-taking
- **Real-time Persistence**: Firestore-backed automatic progress saving
- **Content Management**: Teachers (modules), Courses, and Exams with full CRUD

## 🧑‍🎓 User Roles

| Role | Capabilities | Routes |
|------|-------------|---------|
| **Admin** | Full CRUD on Teachers, Courses, Exams | `/crud`, `/course-crud`, `/exam-crud` |
| **Recruiters** | Create and manage own exams | `/exam-crud` (filtered) |
| **Students** | Take exams, view results, retry with cooldown | `/exam/:id` |

## 🎓 Key Features

### Exam Taking System
- **Smart Shuffling**: Questions and answers randomized per attempt
- **Live Progress Tracking**: Every answer auto-saved to Firestore
- **Resume Capability**: Interrupted exams continue with correct time calculation
- **Timer Management**:
  - Exam duration (`timeToDoTheExam`)
  - Retry cooldown (`timeToWait`)
- **Instant Results**: Pass/fail based on configurable `passingPercentage`

### Admin Dashboard
- **Teachers Management**: Educational modules with PDF content and section mapping
- **Courses Management**: Difficulty levels, date ranges, teacher assignments
- **Exams Management**: Multiple-choice questions with 2-6 answer options
- **Results Analytics**: Student performance tracking across exams

### Content Delivery
- PDF viewer for educational materials
- Section-based navigation with page mapping

## 🛠️ Tech Stack
- **Framework:** Angular 19 (standalone components, signals)
- **Backend:** Firebase Authentication + Cloud Firestore
- **UI:** Angular Material + Tailwind CSS
- **i18n:** Transloco (English, Spanish, French)
- **Build:** Angular CLI 19 + Vite

## 🚀 Quick Start

### Prerequisites
```bash
# Node.js LTS (v22.x recommended)
node -v  # v22.20.0

# Angular CLI
npm install -g @angular/cli
```

### Environment Setup
1. Create Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Create environment files:

```typescript
// src/environments/environment.development.ts
export const environment = {
  BASEURL: 'your-firebase-api-url',
  BACK_CHAT_URL: 'your-backend-url',
  WEBSITE_NAME: 'Trainer Teacher',
  firebase: {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
  }
};
```

```typescript
// src/environments/environment.ts (production)
export const environment = {
  // Same structure as development
};
```

### Installation & Run
```bash
# Install dependencies
npm install

# Run development server
ng serve
# Navigate to http://localhost:4200

# Build for production
ng build
```

### Firebase Configuration
```bash
# Set default Firebase project
firebase use default

# Deploy to Firebase Hosting
firebase deploy
```

## 📁 Project Structure
```
src/app/
├── components/
│   ├── auth/                  # Login/register components
│   ├── chat/                  # Chat interface
│   ├── evaluation/            # Exam taking component
│   ├── left-menu/             # Navigation menu
│   ├── school/                # Dashboard components
│   │   ├── dashboard/
│   │   ├── exam-result-list/
│   │   ├── exams-list/
│   │   ├── student-list/
│   │   └── teacher-list/
│   ├── superadmin/            # CRUD components
│   │   ├── teachers-crud/
│   │   ├── course-crud/
│   │   └── exam-crud/
│   └── shared/                # Reusable components
├── guards/
│   ├── admin.guard.ts         # Admin access guard
├── models/
│   ├── exam.ts                # Exam, Question, Option
│   ├── result.ts              # Result, QuestionAndAnswer
│   ├── teacher.ts             # Teacher, Section
│   ├── course.ts
│   ├── user.ts
│   └── student.ts
├── pages/
│   ├── mainselector-page/     # Landing page
│   ├── school-main-page/      # Admin dashboard
│   └── teacher-main-page/     # Teacher content page
├── services/
│   ├── auth.service.ts        # Firebase authentication
│   ├── exam.service.ts        # Exam queries
│   ├── exam-crud.service.ts   # Exam CRUD operations
│   ├── result.service.ts      # Result tracking
│   ├── teacher-crud.service.ts
│   ├── course-crud.service.ts
│   └── user.service.ts
└── app.routes.ts              # Route configuration
```

## 🎮 Exam Flow

```mermaid
graph TD
    A[Student opens /exam/:id] --> B[View Exam Intro]
    B --> C{Check Eligibility}
    C -->|Already Passed| D[Redirect]
    C -->|Too Soon| E[Show Cooldown Timer]
    C -->|Can Take| F[Shuffle Questions & Answers]
    F --> G[Create Initial Result Entry]
    G --> H[Start Timer]
    H --> I[Answer Questions]
    I --> J[Auto-save to Firestore]
    J --> K{More Questions?}
    K -->|Yes| I
    K -->|No| L[Review Summary]
    L --> M[Submit Exam]
    M --> N[Calculate Score]
    N --> O[Show Results]
```

## 🔐 Authentication & Guards

### Admin Guard
```typescript
// Protects /crud, /course-crud, /exam-crud routes
if (user && user.email === 'martin@martin.com') {
  return true; // Admin access
}
```


## 📊 Data Models

### Exam Structure
```typescript
interface Exam {
  id: string;
  title: string;
  questions: Question[];
  passingPercentage: number;     // e.g., 70
  timeToWait: number;             // Minutes before retry
  timeToDoTheExam: number;        // Exam duration in minutes
  recruiterId?: string;
}

interface Question {
  text: string;
  options: Option[];              // 2-6 options
}

interface Option {
  text: string;
  isCorrect: boolean;             // Only one correct per question
}
```

### Result Tracking
```typescript
interface Result {
  userUID: string;
  examId: string;
  doingTheExamNow: boolean;       // Resume flag
  momentStartExam: string;        // ISO timestamp
  questions_answered: number;
  correctAnswers: number;
  examPassed?: boolean;
  questions: QuestionAndAnswer[]; // Saved answers
}
```

## 🌐 i18n Support

Transloco configuration with 3 languages:
```typescript
availableLangs: ['en', 'es', 'fr']
defaultLang: 'en'
```

Translation files in `/public/i18n/`:
- `en.json`
- `es.json`
- `fr.json`

## 🚢 Deployment

### Firebase Hosting
```bash
# Build production bundle
ng build --configuration=production

# Deploy to Firebase
firebase deploy --only hosting
```

### Environment Configuration
- **Development**: Uses `environment.development.ts`
- **Production**: Uses `environment.ts`

Configured in `angular.json`:
```json
{
  "configurations": {
    "production": {
      "outputHashing": "all"
    },
    "development": {
      "optimization": false,
      "sourceMap": true,
      "fileReplacements": [{
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.development.ts"
      }]
    }
  }
}
```

## 🔑 Key Architectural Patterns

### Standalone Components
```typescript
@Component({
  selector: 'app-exam',
  imports: [CommonModule, MatIconModule],
  standalone: true
})
```

### Reactive Signals
```typescript
currentUserSig = signal<User | null>(null);
// Auto-updates components on change
```

### Firebase Integration
```typescript
// Real-time data streams
exams$ = collectionData(examCollection) as Observable<Exam[]>;
```

### Guard-based Security
```typescript
{
  path: 'crud',
  component: TeachersCRUDComponent,
  canActivate: [adminGuard]
}
```

## 📖 Learning Path

1. **Setup**: Configure Firebase and environment files
2. **Explore**: Navigate the main selector and dashboard
3. **Take Exam**: Experience the student workflow at `/exam/:id`
4. **Admin Panel**: Access CRUD operations (requires admin email)
5. **Customize**: Modify exam settings, questions, and content

## 🎯 Production Features

- ✅ **Auto-save Progress**: Never lose exam answers
- ✅ **Resume Capability**: Continue interrupted exams
- ✅ **Time Management**: Accurate timer with resume support
- ✅ **Anti-cheat**: Question/answer shuffling
- ✅ **Cooldown System**: Prevent immediate retakes
- ✅ **Role-based Access**: Secure admin operations
- ✅ **Multi-language**: English, Spanish, French

## 🤝 Contributing

This is an educational platform template. Feel free to fork and adapt for your use case.

## 📝 License

MIT License - see LICENSE file for details

---

**Built with ❤️ using Angular 19, Firebase, and modern web standards**
