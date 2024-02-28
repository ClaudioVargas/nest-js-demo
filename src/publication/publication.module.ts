import { Module } from '@nestjs/common';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { publicationProviders } from 'src/database/publciation.provider';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/database/user.provider';

@Module({
  imports:[
    DatabaseModule
  ],
  controllers: [PublicationController],
  providers: [
    ...publicationProviders,
    ...userProviders,
    PublicationService
  ]
})
export class PublicationModule {}
