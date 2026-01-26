import { Column, Entity, ManyToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { Professor } from "../professors/professor.entity";

@Entity()
export class ClassSchedule extends BaseEntity {
    @Column()
    hour: string;

    @Column()
    day: string;

    @ManyToMany(() => Professor, (professor) => professor.classSchedules)
    professors: Professor[]
}