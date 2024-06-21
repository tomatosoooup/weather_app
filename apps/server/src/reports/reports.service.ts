import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
    // I didn't use repositories for fetching data from Prisma. Did everything in service
    constructor(private readonly prismaService: PrismaService){}

    async createReport(reportDto: CreateReportDto): Promise<Report>{
        return await this.prismaService.report.create({data: {...reportDto}})
    }

    async getHundredReports(): Promise<Report[]>{
        return await this.prismaService.report.findMany({take: 100, orderBy: {id: "desc"}})
    }

    async getReportsByQuery(query: string): Promise<Report[]>{
        return await this.prismaService.report.findMany({where: {name: {contains: query}}})
    }
}
