import { Inject, Injectable } from '@nestjs/common';
import { Publication } from 'src/database/entities/publication.entity';
import { Repository } from 'typeorm';
import { PublicationDto } from './dtos/publication.dto';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class PublicationService {

    constructor(
        @Inject('PUBLICATION_REPOSITORY')
        private publicationRepository: Repository<Publication>,
        
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) { }

    async save(publicationDto: PublicationDto): Promise<any> {
        const publication = new Publication()
        publication.title = publicationDto.title
        publication.title = publicationDto.body
        const u = new User() 
        u.id =  publicationDto.userId
        const user = await this.userRepository.findOneBy(u)
        publication.user = user
        publication.title = publicationDto.title
        publication.body = publicationDto.body
        await this.publicationRepository.manager.save(publication)
    }

}
