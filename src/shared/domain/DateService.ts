import {DateValueObject} from "./DateValueObject";

export interface DateService {
    today(): Promise<DateValueObject>;
}
