import { Global, Module } from '@nestjs/common';
import { LocalDateService } from '../../core/shared/base/infrastructure/LocalDateService';
import { DateService } from '../../core/shared/base/domain/DateService';
import { FirebaseClient } from '../../core/shared/base/infrastructure/FirebaseClient';
import { RabbitMQEventBus } from '../../core/shared/bus/infrastructure/RabbitMQEventBus';

const EventBus = { provide: 'EventBus', useClass: RabbitMQEventBus };
const DateService = { provide: 'DateService', useClass: LocalDateService };

@Global()
@Module({
    providers: [
        FirebaseClient,
        EventBus,
        DateService,
    ],
    exports: [
        FirebaseClient,
        EventBus,
        DateService,
    ],
})
export class SharedModule {
}
