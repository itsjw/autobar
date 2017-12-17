import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ColRow } from "./ColRow"

@Entity()
export class Col {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string = '';

    @Column()
    description: string = '';

    @Column()
    sortOrder: number = 0;

    @OneToMany(type => ColRow, colRow => colRow.row)
    colRows: ColRow[];
}
