// job-listing.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class JobListing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  sector: string;

  @Column()
  summary: string;

  @Column()
  time: string;

  @Column()
  location: string;
}
