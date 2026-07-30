import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from 'src/database/user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { AuthMiddleware } from 'src/common/auth.middleware';

@Module({
  imports:[
    DatabaseModule
  ],
  controllers: [UserController],
  providers: [
    ...userProviders,
    UserService
  ]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      // Aplicar solo a las rutas de 'users' que usen GET o POST
      .forRoutes({ path: 'apiuser', method: RequestMethod.ALL }); 
  }
}
