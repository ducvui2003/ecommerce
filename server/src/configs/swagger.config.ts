import * as fs from 'fs';
import * as path from 'path';
import * as swaggerUi from 'swagger-ui-express';
import * as yaml from 'js-yaml';
import { INestApplication } from '@nestjs/common';

export default function setupSwagger(app: INestApplication<any>) {
  // Load Swagger YAML file
  const swaggerPath = path.join(process.cwd(), 'docs', 'swagger.yaml');
  const swaggerDocument = yaml.load(
    fs.readFileSync(swaggerPath, 'utf8'),
  ) as object;

  // Serve Swagger UI
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
