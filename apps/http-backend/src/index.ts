import express from 'express';
import cors from 'cors';
import { prisma } from "@repo/database";

const app = express();
const port = process.env.HTTP_PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.send('Hello from the API!');
});

app.post("/signup", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await prisma.user.create({
            data: {
                username: username,
                password: password
            }
        })
        res.json({
            message: "Signup successful",
            id: user.id
        });
    } catch(e) {
        console.error(e);
    }
});

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});