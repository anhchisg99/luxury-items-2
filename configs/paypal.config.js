export const configPaypal = {
    'mode': process.env.PAYPAL_MODE, //sandbox or live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    // 'client_secret': 'EKlkFFcuSeFTbl09x548R7lumMgcssFW1vnfbBM_o7NTsCufPWfv_BU0tdU4RebFZsBWZYQV-n4X3leW'
    'client_secret':'',
    'return_url': process.env.RETURN_URL,
    'cancel_url': process.env.CANCEL_URL
}


  