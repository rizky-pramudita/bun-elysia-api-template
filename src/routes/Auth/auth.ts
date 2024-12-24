import { Elysia, form, t } from "elysia";
import { pool } from "../../db";
import { Auth } from "./auth.service";



class User {
    constructor(public name: string = 'test', public age: number = 3) {}

    async getUser() {
        try {
            const result = await pool.query('SELECT * FROM users');
            return result.rows;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }
}

export const auth = new Elysia()
    .decorate('user', new User())
    .get('/users', async ({ user }) => {
        try {
            const users = await user.getUser();
            return users; 
        } catch (error) {
            return { error: 'Failed to fetch users' };
        }
    })
    .post(
        '/auth/register',
        async ({ body }) => {
            try {
                const { email, password, site } = body;
                const auth = new Auth();
                const result = await auth.register(email, password, site);
                return {
                    message: "User registered successfully",
                    user: result
                };
            } catch (error) {
                return { error: 'Failed to register user' };
            }
        },
        {
            body: t.Object({
                email: t.String(),
                password: t.String(),
                site: t.String(),
            }),
        }
    )
    .post(
        '/auth/login',
        async ({ body }) => {
            try {
                const { email, password } = body;
                const auth = new Auth();
                const result = await auth.login(email, password);
                return result;
            } catch (error) {
                return { error: 'Failed to login' };
            }
        },
        {
            body: t.Object({
                email: t.String(),
                password: t.String(),
            }),
        }
    );
