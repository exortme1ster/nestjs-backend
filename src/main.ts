import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { ValidationPipe } from "./pipes/validation.pipe";

async function start () {
  const PORT = process.env.PORT || 5001;
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle("Test backend API")
    .setDescription("REST API Documentation")
    .setVersion("1.0.0")
    .addTag("Teameights")
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  /*
    For the future reference: if we need to globally close access to the application
    (e.g. make it only for authorized users only):

    app.useGlobalGuards(JwtAuthGuard)

    Global pipes:
    (e.g. validation on every endpoint)

    app.useGlobalPipes(new ValidationPipe())
  */
  
  await app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
}

start()
