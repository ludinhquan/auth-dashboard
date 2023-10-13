import { Injectable } from '@nestjs/common';

type TEmailPayload = {
  to: string;
  subject: string;
  text: string;
};

@Injectable()
export class EmailService {
  send(payload: TEmailPayload) {
    console.log('payload:', payload);
  }
}
