import express, { Express } from 'express';

const server = () => {
    const app: Express = express();
    
    return {
        use: app.use
    }
}

export default server