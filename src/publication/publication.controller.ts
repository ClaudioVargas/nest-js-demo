import { Body, Controller, Post } from '@nestjs/common';
import { PublicationDto } from './dtos/publication.dto';
import { PublicationService } from './publication.service';

@Controller('api/publication')
export class PublicationController {

    constructor(
        private readonly publicationService: PublicationService) {}

    @Post()
    save(@Body() newPublication: PublicationDto): any {
        return this.publicationService.save(newPublication);
    }
}
