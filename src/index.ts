import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { user } from "./routes/Users/user";
import { post } from "./routes/Posts/post";



const app = new Elysia()
// Apply the swagger plugin
        .use(swagger()) 
        .onTransform(({headers, body, request: { method } }) => {
            console.log('Request received:', method, body, headers);
        })
        .use(user)
        .use(post)
        .listen(3000);
        
console.log('Server started on port 3000');