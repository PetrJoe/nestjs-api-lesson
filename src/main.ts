import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const express = require('express');
const serverless = require('serverless-http');

async function bootstrapServer() {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('HFAP API')
    .setDescription('Harvest Feed and Agro Processing Limited - Backend API')
    .setVersion('1.0')
    .addTag('hfap', 'HFAP API endpoints')
    .addServer('http://localhost:3000', 'Local development')
    .addServer('https://your-netlify-app.netlify.app', 'Production')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  await app.init();
  return expressApp;
}

// For Netlify Functions / Serverless
let cachedServer: any;

export const handler = async (event: any, context: any) => {
  if (!cachedServer) {
    const expressApp = await bootstrapServer();
    cachedServer = serverless(expressApp);
  }
  return cachedServer(event, context);
};

// For local development
if (process.env.NODE_ENV !== 'production') {
  bootstrapServer().then((expressApp) => {
    const port = process.env.PORT ?? 3000;
    expressApp.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
      console.log(`Swagger UI available at http://localhost:${port}/api/docs`);
    });
  });
}
