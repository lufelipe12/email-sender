import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateUserController } from './create-user/create-user.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendMailProducerService } from './jobs/sendMail-producer.service';
import { SendMailConsumer } from './jobs/sendMail-consumer.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'sendMail-queue',
    }),
    MailerModule.forRoot({
      transport: {
        host: String(process.env.MAIL_HOST),
        secure: false,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: String(process.env.MAIL_USER),
          pass: String(process.env.MAIL_PASS),
        },
      },
    }),
  ],
  controllers: [CreateUserController],
  providers: [SendMailProducerService, SendMailConsumer],
})
export class AppModule {}
