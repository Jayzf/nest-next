import { Controller, Get, Query, Render } from '@nestjs/common';

@Controller()
export class ViewController {
  constructor() {}

  @Get()
  @Render('Index')
  public async index(@Query('name') name?: string) {
    return { name };
  }
}
