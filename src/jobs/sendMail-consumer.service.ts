import { Process, Processor } from '@nestjs/bull';
import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bull';
import { CreateUserDTO } from 'src/create-user/createUserDTO.dto';

@Processor('sendMail-queue')
class SendMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('sendMail-job')
  async sendMailJob(job: Job<CreateUserDTO>) {
    try {
      const { data } = job;

      await this.mailService.sendMail({
        to: data.email,
        from: 'Equipe teste <teste@g.com>',
        subject: 'Bem vind@!',
        text: 'isso é um teste',
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export { SendMailConsumer };
