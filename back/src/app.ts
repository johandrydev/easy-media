import express, { NextFunction, Request, Response, json } from "express";
import cors from "cors";
import 'dotenv/config';

import { authRoutes } from "./routes/auth.route";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(json());

// Routes
app.use('/api', authRoutes);

// Basic error handler
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  switch (err.name) {
    case 'ValidationError':
      res.status(400);
      break;
  
    default:
      res.status(500).send({ message: 'Internal Server Error' });
      return;
  }

	return res.json({
		message: err.message
	})
}
app.use(errorHandler);
app.listen(port, () => console.log(`Server is running on port ${port}`));