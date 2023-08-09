import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  getHealth(): string {
    return 'Hello I am healthy!';
  }
}
