import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { PaymentsService } from './payments.service';
import { PaymentRequestBody } from './types/PaymentRequestBody';
import { Response } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentService: PaymentsService) { }

  @Get('/test')
  checkAlive() {
    return "I'm alive!";
  }

  @Post('/createPayment')
  createPayments(
    @Res() response: Response,
    @Body() paymentRequestBody: PaymentRequestBody,
  ) {
    this.paymentService
      .createPayment(paymentRequestBody)
      .then((res) => {
        response.status(HttpStatus.OK).json(res);
      })
      .catch((err) => {
        response.status(HttpStatus.BAD_REQUEST).json(err);
      });
  }

  @Post('/checkout')
  paymentSheet(
    @Res() response: Response,
    @Body() paymentRequestBody: PaymentRequestBody
  ) {
    this.paymentService
      .paymentSheet(paymentRequestBody)
      .then((res) => {
        response.status(HttpStatus.SEE_OTHER).redirect(res);
      })
      .catch((error) => {
        response.status(HttpStatus.BAD_REQUEST).json(error)
      });
  }
}
