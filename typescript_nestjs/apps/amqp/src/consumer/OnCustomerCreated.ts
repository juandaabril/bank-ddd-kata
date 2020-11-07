import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class OnCustomerCreated {
    @EventPattern('customer-was-creadted')
    async handleMessagePrinted(data: Record<string, unknown>) {
        console.log(data);
    }
}
