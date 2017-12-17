import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Row } from "./Row"

@Entity()
export class Spreadsheet {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string = '';

    @Column()
    description: string = '';

    @OneToMany(type => Row, row => row.spreadsheet, {
        cascadeInsert: true,
        cascadeUpdate: true,
    }) 
    rows: Row[] = [];
}
