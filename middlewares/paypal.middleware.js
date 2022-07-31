
import paypal from 'paypal-rest-sdk'

import { configPaypal } from "../configs/index.js";


export default async function initiatePaypal(){
    return paypal.configure(configPaypal)
}
// const InitiatePaypal = paypal.configure(vars.paypal)


