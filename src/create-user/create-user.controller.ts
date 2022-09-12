import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDTO } from './createUserDTO.dto';
import { SendMailProducerService } from 'src/jobs/sendMail-producer.service';

@Controller('create-user')
export class CreateUserController {
  constructor(private sendMailService: SendMailProducerService) {}

  @Post('/')
  async createUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createUser: CreateUserDTO,
  ) {
    await this.sendMailService.sendMail(createUser);
    return res.send(createUser);
  }
}
