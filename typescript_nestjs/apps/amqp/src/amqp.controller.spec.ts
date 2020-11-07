import { Test, TestingModule } from '@nestjs/testing';
import { AmqpController } from './amqp.controller';
import { AmqpService } from './amqp.service';

describe('AmqpController', () => {
  let amqpController: AmqpController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AmqpController],
      providers: [AmqpService],
    }).compile();

    amqpController = app.get<AmqpController>(AmqpController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(amqpController.getHello()).toBe('Hello World!');
    });
  });
});
