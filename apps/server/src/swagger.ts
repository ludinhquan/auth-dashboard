import * as fs from 'fs';

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Swagger {
  constructor(private readonly app: INestApplication) {}

  private getServer() {
    return process.env.SERVER_URL ?? 'http://localhost:4000';
  }

  private getConfig() {
    const server = this.getServer();
    const config = new DocumentBuilder()
      .addServer(server)
      .setTitle('Dashboard')
      .setVersion('1.0')
      .build();

    return config;
  }

  public initialize() {
    const config = this.getConfig();
    const document = SwaggerModule.createDocument(this.app, config);
    fs.writeFileSync('./swagger.json', JSON.stringify(document));
    SwaggerModule.setup('docs', this.app, document);
  }
}
