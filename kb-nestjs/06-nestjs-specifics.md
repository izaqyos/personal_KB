---
type: reference
title: NestJS specifics
description: NestJS specifics such as exporting and importing interfaces and providing modules.
tags: [nestjs, typescript, backend, tips, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nestjs-kb#6"
---

# NestJS specifics

[↑ nestjs-kb](/kb-nestjs/README.md)

## 6.1 Export and import an interface, and dependancy inject it

### 6.1.1 transport service example

```text
Providing modules:
    -> /Users/<user>/work/<employer>/git/<internal-path>/src/proxy/proxy.module.ts
import { Module } from '@nestjs/common';
import {DestinationService} from './destination/destination.service';
import {ConnectivityService} from './connectivity/connectivity.service';
import {ProxyService} from './proxy.service';
import {AuthenticationService} from './authentications/authentication.service';

@Module({
    providers: [DestinationService, {
        provide: 'IConnectivityService',
        useClass: ConnectivityService,
    }, ProxyService, AuthenticationService],
    exports: [ProxyService],
})
export class ProxyModule {}


    ->
Consuming module: /Users/<user>/work/<employer>/git/<internal-path>/src/transport/transport.module.ts
import {Module} from '@nestjs/common';
import {TransportController} from './transport.controller';
import {RedisModule} from '../redis/redis.module';
import {TransportJobManagerService} from './transport.job.manager';
import {ProxyModule} from '../proxy/proxy.module';
import {CdmClientModule} from '../cdm/cdm.client.module';
import {TransportReportService} from './transport-report.service';
import {TransportStateManager} from './transport-state-manager';

@Module({
    imports: [RedisModule, ProxyModule, CdmClientModule],
    providers: [{
        provide: 'ITransportJobManagerService',
        useClass: TransportJobManagerService
    }, {
        provide: 'ITransportReport',
        useClass: TransportReportService
    }, {
        provide: 'IStateManager',
        useClass: TransportStateManager
    } ],
    controllers: [TransportController]
})
export class TransportModule {
}


dependency-injection:
/Users/<user>/work/<employer>/git/<internal-path>/src/transport/transport.job.manager.ts
@Injectable()
export class TransportJobManagerService implements ITransportJobManagerService{

    private logger = cfLogger.initLogger('<internal-path>/src/transport/transport.job.ts');
    private readonly jobMap: Map<string, ITransportJob> ;

    constructor(@Inject('ICdmClientService') private cdmClientService: ICdmClientService,
                @Inject( 'IStateManager') private stateManager: IStateManager,
                @Inject('ITransportReport') private jobReportService: ITransportReport,
                private proxyService: ProxyService) {
        this.jobMap = new Map();
    }

        6.1.2

    6.2
```
