import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService){}

    @Post()
    async createReport(@Body() body: CreateReportDto){
        return await this.reportsService.createReport(body)
    }

    @Get('all')
    async getReports(){
        return await this.reportsService.getHundredReports()
    }

    @Get('search')
    async getAllReportsByQuery(@Query('query') query: string){
        return await this.reportsService.getReportsByQuery(query)
    }
}
