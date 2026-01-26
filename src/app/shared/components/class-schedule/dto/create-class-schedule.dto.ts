import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from "src/modules/base/base.dto";

export class CreateClassScheduleDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: '7:30 - 9:00'})
    hour: string;

    @IsNotEmpty()
    @ApiProperty({example: 'Lunes'})
    day: string;
}