import express from 'express';
import commentRouter from "./routes/comment.js";
import cors from 'cors';

const app = express();
const PORT = 8001;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use('/api/v1/snippet', commentRouter);
// app.get('/', (req, res) =>{
//     res.send("snippet");
// });

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});