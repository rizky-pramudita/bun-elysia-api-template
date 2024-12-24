
import { pool } from "../../db";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@firebase/auth";
import { auth } from "../../firebase";
import { v4  } from 'uuid';


const { v4: uuidv4 } = require('uuid');
export class Auth {
    async register(email: string, password: string, site: string) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Generate values for the database
            const name = email.split('@')[0];
            const newId = uuidv4();
            const createdDate = new Date().toISOString(); // Use ISO string for datetime

            // Insert the new user into the database
            const result = await pool.query(
                `INSERT INTO users (id, name, email, "createdAt", "updatedAt", role) 
                VALUES ($1, $2, $3, $4, $5, $6) 
                RETURNING *`,
                [newId, name, email, createdDate, createdDate, site]
            );

            if (result.rowCount === 0) {
                throw new Error("Failed to register user in the database");
            }
            const idToken = await user.getIdToken();
            return { idToken, user};
        } catch (error: any) {
            console.error("Error during registration:", error);
            return { error: error.message };
        }
    }

    async login(email: string, password: string) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userRecord = await pool.query('SELECT name FROM users WHERE email = $1', [email]);
            // Retrieve the ID token
            const idToken = await user.getIdToken();
            return { message: `Welcome back, ${userRecord.rows[0].name}`, idToken, user };
        } catch (error: any) {
            console.error("Error during login:", error);
            return { error: error.message };
        }
    }
    
}