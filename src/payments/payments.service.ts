import { Injectable } from "@nestjs/common";
import Stripe from "stripe";
import { PaymentRequestBody } from "./types/PaymentRequestBody";

@Injectable()
export class PaymentsService {
  private stripe;

  constructor() {
    this.stripe = new Stripe('sk_test_51LGtv6BViwENwDkq9wuGQYRwXliEDCPlFUJZ33LZ0XsnElQxwxJbo6dgvTDudAWAPr9Pu37yWG8kDxYjXWb73J3w00J62P390g', {
      apiVersion: '2020-08-27',
    });
  }

  createPaymentIntent(): Promise<any> {
    return;
  }

  async createPayment(paymentRequestBody: PaymentRequestBody): Promise<any> {
    let sumAmount = 0;
    paymentRequestBody.products.forEach((product) => {
      sumAmount = sumAmount + product.price * product.quantity;
    });
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: sumAmount * 100,
      currency: paymentRequestBody.currency,
      payment_method_types: ['card'],
    });
    const client_secret = paymentIntent.id;
    return await this.stripe.paymentIntents.confirm(client_secret, {
      payment_method: 'pm_card_visa'
    });
  }

  paymentSheet(paymentRequestBody: PaymentRequestBody): Promise<any> {
    let sumAmount = 0;
    paymentRequestBody.products.forEach((product) => {
      sumAmount = sumAmount + product.price * product.quantity;
    });
    return this.stripe.checkout.session.create({
      mode: 'payment',
    });
  }
}
