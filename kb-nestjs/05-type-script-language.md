---
type: reference
title: Type-script Language
description: Section 5 of the legacy nestjs-kb notes.
tags: [kb-nestjs]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nestjs-kb#5"
---

# Type-script Language

[↑ nestjs-kb](/kb-nestjs/README.md)

## 5.1 interfaces

### 5.1.1 Example nestjs interface

```text
   https://github.com/nestjs/nest/blob/master/packages/common/interfaces/modules/provider.interface.ts 

Function  interface,
interface Function {
    /**
      * Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.
      * @param thisArg The object to be used as the this object.
      * @param argArray A set of arguments to be passed to the function.
      */
    apply(this: Function, thisArg: any, argArray?: any): any;

    /**
      * Calls a method of an object, substituting another object for the current object.
      * @param thisArg The object to be used as the current object.
      * @param argArray A list of arguments to be passed to the method.
      */
    call(this: Function, thisArg: any, ...argArray: any[]): any;

    /**
      * For a given function, creates a bound function that has the same body as the original function.
      * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
      * @param thisArg An object to which the this keyword can refer inside the new function.
      * @param argArray A list of arguments to be passed to the new function.
      */
    bind(this: Function, thisArg: any, ...argArray: any[]): any;

    /** Returns a string representation of a function. */
    toString(): string;

    prototype: any;
    readonly length: number;

    // Non-standard extensions
    arguments: any;
    caller: Function;
}

        5.1.2

        5.1.3
```

## 5.2 Validation pipes

### 5.2.1 custom ValidationPipe

```text
<internal-url>

-> <internal-url>
import {PipeTransform, Injectable, ArgumentMetadata, BadRequestException} from '@nestjs/common';
import {validate} from 'class-validator';
import {plainToClass} from 'class-transformer';
import {ContextDto, DcmDto, DcmPayloadDto, SourceDto} from '../transport/dto/dcm-payload.dto';

@Injectable()
export class DcmPayloadDtoValidationPipe implements PipeTransform<any> {
    async transform(value: any, {metatype}: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const dcmPayloadDto: DcmPayloadDto = plainToClass(metatype, value);
        await this.validate(dcmPayloadDto);
        await this.validate(plainToClass(DcmDto, dcmPayloadDto.dcm));
        await this.validate(plainToClass(ContextDto, dcmPayloadDto.dcm.context));
        await this.validate(plainToClass(SourceDto, dcmPayloadDto.dcm.source));

        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [Object];
        return !types.includes(metatype);
    }

    private async validate(value: any): Promise<void> {
        let errors: any[] = await validate(value);
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }
    }

}

-> <internal-url>
import {IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class SourceDto {
    @ApiProperty()
    @IsNotEmpty({
        message: 'destinationId is missing.'
    })
    @IsString()
    readonly destinationId: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    readonly deltaLink: string;
}

export class ContextDto {
    @ApiProperty()
    @IsNotEmpty({
        message: 'context id is missing.'
    })

    @IsString()
    readonly id: string;

    @ApiProperty()
    @IsNotEmpty({
        message: 'context type is missing.'
    })
    @IsString()
    readonly type: string;
}

export class DcmDto {
    @ApiProperty()
    @IsNotEmpty({
        message: 'source is missing.'
    })
    readonly source: SourceDto;

    @ApiProperty()
    @IsNotEmpty({
        message: 'context is missing.'
    })
    readonly context: ContextDto;
}

export class DcmPayloadDto {
    @ApiProperty()
    @IsNotEmpty({
        message: 'dcm is missing.'
    })
    readonly dcm: DcmDto;
}

-> <internal-url>
import {BadRequestException, Body, Controller, Get, Inject, Param, Post, Put, Query, Req, Res} from '@nestjs/common';
import {TransportKeyDto} from './dto/transport-key.dto';
import {TransportJobStatus} from './enum/transport.job.status';
import {ITransportJobManagerService} from '../interfaces/transport.job.manager.interface';
import {AuthInfo} from '@sap/xssec';
import {JobInfoDto} from './dto/job-info.dto';
import {CancelTransportDto} from './dto/cancel-transport.dto';
import {ITransportReportBody} from '../interfaces/transport-report-body.interface';
import {ILoggerFactory} from '../interfaces/logger-factory.interface';
import {Logger} from '../utils/logger';
import {ApiBody, ApiQuery, ApiResponse} from '@nestjs/swagger';
import {DcmPayloadDto} from './dto/dcm-payload.dto';
import {DcmPayloadDtoValidationPipe} from '../pipes/dcm-payload-dto-validation.pipe';

@Controller('/transports/:transport_type')
export class TransportController {
    private logger: Logger;

    constructor(@Inject('ITransportJobManagerService') private transportJobManager: ITransportJobManagerService,
                @Inject('ILoggerFactory') loggerFactory: ILoggerFactory) {
        this.logger = loggerFactory.getLogger(TransportController.name);
    }


    @Put('/start')
    @ApiResponse({status: 202, description: 'Transport job created successfully.'})
    @ApiResponse({status: 208, description: 'Transport job is already running.'})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    @ApiResponse({status: 401, description: 'Unauthorized.'})
    @ApiBody({
        description: 'The destination Id and a deltaLink if available and the context which the dcm will be imported to.',
        type: DcmPayloadDto,
    })
    async transportJob(@Param('transport_type') transportType, @Req() request, @Body(new DcmPayloadDtoValidationPipe()) dcmPayloadDto: DcmPayloadDto, @Res() res) {
        // transportType, future proofing. currently expects value to be 'external'

        const authInfo: AuthInfo = request.authInfo;
        const jobInfoDto: JobInfoDto = this.createJobInfoDto(dcmPayloadDto, authInfo);

        const jobStatus: TransportJobStatus = await this.transportJobManager.startJob(jobInfoDto);
        jobStatus === TransportJobStatus.OK ? res.status(202).send() : res.status(208).send();
    }

    @Get('/status')
    @ApiResponse({status: 403, description: 'Forbidden.'})
    @ApiResponse({status: 401, description: 'Unauthorized.'})
    @ApiQuery({name: 'contextId', required: false})
    @ApiQuery({name: 'contextType', required: false})
    @ApiQuery({name: 'filter', required: false, description: 'filter reports by pattern.', example: 'someContextId:*'})
    async getStatus(@Req() request, @Query('contextId') contextId, @Query('contextType') contextType, @Query('filter') filter): Promise<ITransportReportBody> {
        const tenantId: string = request.authInfo.getSubaccountId();
        if (!contextId || !contextType || !tenantId) {
            throw new BadRequestException('query params are missing.');
        }
        const keyDto: TransportKeyDto = {contextType: contextType, contextId: contextId, tenantId: tenantId};
        return this.transportJobManager.getJobStatus(keyDto);
    }

    @Post('/cancel')
    @ApiResponse({status: 403, description: 'Forbidden.'})
    @ApiResponse({status: 401, description: 'Unauthorized.'})
    async cancel(@Req() request, @Body() keyDto: CancelTransportDto, @Body() payload): Promise<void> {
        return this.transportJobManager.cancelJob(request.authInfo, keyDto);
    }

    private createJobInfoDto(dcmPayloadDto: DcmPayloadDto, authInfo: AuthInfo): JobInfoDto {
        const {dcm} = dcmPayloadDto;
        const tenantId: string = authInfo.getSubaccountId();

        const keyDto: TransportKeyDto = {contextId: dcm.context.id, contextType: dcm.context.type, tenantId: tenantId};
        return {authInfo: authInfo, destinationId: dcm.source.destinationId, keyDto: keyDto};
    }
}

-> swagger,  <internal-url>
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as log from 'cf-nodejs-logging-support';
import {HttpExceptionFilter} from './filters/http-exception.filter';
import {TransportModule} from './transport/transport.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('transport_service');

    // Transport swagger
    const options = new DocumentBuilder()
        .setTitle('Transport Service')
        .setDescription('Transport Service Exposes content import and export APIs')
        .setVersion('1.0')
        .addTag('transports')
        .build();

    const transportDocument = SwaggerModule.createDocument(app, options, {
        include: [TransportModule],
    });
    SwaggerModule.setup('api/transports', app, transportDocument);

    const port = process.env.PORT || 3000;

    // init logging
    const logLevel: String = process.env.CF_APP_LOG_LEVEL != null ? process.env.CF_APP_LOG_LEVEL.toLowerCase() : 'error';
    log.setLoggingLevel(logLevel);
    if (process.env.NODE_ENV === 'cloud') {
        log.logMessage(logLevel, 'Current log level: [' + logLevel + ']');
    }
    app.use(log.logNetwork);

    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(port);
}

void bootstrap();

->

    5.3
```
