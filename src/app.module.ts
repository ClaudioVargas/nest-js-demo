import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { PublicationModule } from './publication/publication.module';

@Module({
  imports: [
    DatabaseModule, 
    UserModule, 
    PublicationModule],
  providers: [AppService],
  exports: []
})
export class AppModule {}
