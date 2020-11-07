import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseClient {
    private _firestore: firebase.firestore.Firestore;

    constructor(private configService: ConfigService) {
        const config = {
            apiKey: configService.get<string>('FIREBASE_API_KEY'),
            authDomain: configService.get<string>('FIREBASE_AUTH_DOMAIN'),
            databaseURL: configService.get<string>('FIREBASE_DATABASE_URL'),
            projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
            storageBucket: configService.get<string>('FIREBASE_STORAGE_BUCKET'),
            messagingSenderId: configService.get<string>(
                'FIREBASE_MESSAGING_SENDER_ID',
            ),
            appId: configService.get<string>('FIREBASE_APP_ID'),
        };

        firebase.initializeApp(config);

        this._firestore = firebase.firestore();
    }

    get firestore(): firebase.firestore.Firestore {
        return this._firestore;
    }
}
