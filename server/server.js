import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { OpenAI } from "openai";



dotenv.config();



const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });



const app = express();


app.use(cors());

app.use(express.json());

app.get('/',async (req,res) =>{
    res.status(200).send({
        message:'Hello World'
    })
})

app.post('/', async (req, res) => {
    try {
        const promt = req.body.promt;
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: promt }],
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        res.status(200).send({
            bot: response.choices[0].message.content,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});


app.listen(3000, () => console.log('server is running on port http://localhost:3000'))