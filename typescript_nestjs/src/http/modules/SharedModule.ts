import {Global, Module} from "@nestjs/common";
import {LocalDateService} from "../../core/shared/base/infrastructure/LocalDateService";
import {DateService} from "../../core/shared/base/domain/DateService";
import {FirebaseClient} from "../../core/shared/base/infrastructure/FirebaseClient";

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
