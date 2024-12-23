import { Elysia, form, t } from "elysia";
import { pool } from "../../db";
import { verifyToken } from "../../admin";


class Post {
  async get() {
    try {
        const result = await pool.query('SELECT * FROM users');
        return result.rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
  }

  async post() {
    return 'post post'
  }
}


export const post = new Elysia()
.decorate('post', new Post())
.post('/posts', async ({ headers, body }) => {
    try{
        const post = new Post;
        const verify = await verifyToken(headers.authorization, post);
        return {
            message: 'Post created successfully',
            post: verify,
        }
    } catch (error) {
        return { error: 'Failed to create post' };
    }},
    {
        headers: t.Object({
            authorization: t.String(),
        }),
        body: t.Object({
            title: t.String(),
            content: t.String(),
        }),
    }
    )