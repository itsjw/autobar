import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Spreadsheet } from "./Spreadsheet";
import { ColRow } from "./ColRow"

@Entity()
export class Row {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(type => Spreadsheet, spreadsheet => spreadsheet.rows)
    spreadsheet: Spreadsheet;

    @OneToMany(type => ColRow, colRow => colRow.row)
    colRows: ColRow[];
}