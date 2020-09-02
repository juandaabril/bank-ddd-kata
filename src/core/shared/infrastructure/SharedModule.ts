import {Global, Module} from "@nestjs/common";
import {LocalDateService} from "../../shared/infrastructure/LocalDateService";
import {DateService} from "../../shared/domain/DateService";
import {FirebaseClient} from "./FirebaseClient";

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
