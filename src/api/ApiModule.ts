import { Module } from '@nestjs/common';

import {AccountPostController} from "./controller/account/AccountPostController";
import {AccountModule} from "../core/account/infrastructure/AccountModule";

@Module({
  controllers: [AccountPostController],
  imports: [AccountModule]
})
export class ApiModule {}
