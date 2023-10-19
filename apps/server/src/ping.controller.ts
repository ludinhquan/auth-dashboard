import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Public')
export class PingController {
  @Get('/ping')
  ping() {
    return 'Pong!';
  }
}
