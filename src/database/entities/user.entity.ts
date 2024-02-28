import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Publication } from "./publication.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  email: string;

  @OneToMany(() => Publication, (publication) => publication.user)
    publicacion: Publication[]

}