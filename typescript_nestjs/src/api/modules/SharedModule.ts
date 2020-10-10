import {Global, Module} from "@nestjs/common";
import {LocalDateService} from "../../core/shared/infrastructure/LocalDateService";
import {DateService} from "../../core/shared/domain/DateService";
import {FirebaseClient} from "../../core/shared/infrastructure/FirebaseClient";

@Global()
@Module({
    providers: [
        FirebaseClient,
        {provide: 'DateService', useClass: LocalDateService},
    ],
    exports: [
        FirebaseClient,
        {provide: 'DateService', useClass: LocalDateService},
    ],
})
export class SharedModule {}
