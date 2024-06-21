import {IsNotEmpty, IsNumber, IsString} from 'class-validator'

export class CreateReportDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    weather: string

    @IsNumber()
    temp: number

    @IsNumber()
    feels_like: number

    @IsNumber()
    max_temp: number
    
    @IsNumber()
    min_temp: number
}