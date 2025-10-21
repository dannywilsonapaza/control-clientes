import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { environment } from './environments/environment';
import { getFirestore } from 'firebase/firestore';
import { provideFirestore } from '@angular/fire/firestore';
import { getAuth } from 'firebase/auth';
import { provideAuth } from '@angular/fire/auth';
import { getStorage } from 'firebase/storage';
import { provideStorage } from '@angular/fire/storage';

bootstrapApplication(AppComponent,
  {
    ...appConfig,
    providers: [
      provideHttpClient(),
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth()),
      provideStorage(() => getStorage()),
      ...appConfig.providers
    ]

  })
  .catch((err) => console.error(err));
