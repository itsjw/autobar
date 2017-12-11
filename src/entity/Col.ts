import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ColRow } from "./ColRow"

@Entity()
export class Col {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(type => ColRow, colRow => colRow.row)
    colRows: ColRow[];
}
