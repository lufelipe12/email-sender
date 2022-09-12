import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { CreateUserDTO } from 'src/create-user/createUserDTO.dto';

@Injectable()
class SendMailProducerService {
  constructor(@InjectQueue('sendMail-queue') private queue: Queue) {}
  async sendMail(createUserDTO: CreateUserDTO) {
    try {
      await this.queue.add('sendMail-job', createUserDTO);
    } catch (error) {
      console.log(error);
    }
  }
}

export { SendMailProducerService };
