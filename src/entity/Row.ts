import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Spreadsheet } from "./Spreadsheet";
import { ColRow } from "./ColRow"

@Entity()
export class Row {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string = '';

    @Column()
    description: string = '';

    @Column()
    sortOrder: number = 0;

    @ManyToOne(type => Spreadsheet, spreadsheet => spreadsheet.rows)
    spreadsheet: Spreadsheet;

    @OneToMany(type => ColRow, colRow => colRow.row, {
        cascadeInsert: true,
        cascadeUpdate: true,
    })
    colRows: ColRow[];
}
