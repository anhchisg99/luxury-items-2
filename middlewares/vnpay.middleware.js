import { vnpay } from '../configs/index.js'
import { sortObject } from '../utils/index.js'
import querystring from 'qs';
import crypto from 'crypto';
import dateFormat from 'dateformat';

export async function create_payment_url(req, res, next) {
    const ipAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    const tmnCode = vnpay.vnp_TmnCode;
    const secretKey = vnpay.vnp_HashSecret;
    let vnpUrl = vnpay.vnp_Url;
    const returnUrl = vnpay.vnp_ReturnUrl;

    const date = new Date();
    const createDate = dateFormat(date, 'yyyymmddHHmmss');

    const orderId = dateFormat(date, 'HHmmss');

    const amount = req.body.amount;
    const bankCode = req.body.bankCode;
    const orderInfo = req.body.orderInfo;
    const orderType = req.body.orderType;
    let locale = req.body.language;

    if (locale === null || locale === '') {
        locale = 'vn';
    }
    const currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;

    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }
    vnp_Params = sortObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, { encode: false });

    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;

    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    req.vnpay = vnpUrl;
    next();
    //res.redirect(vnpUrl)
}

/*
export async function get_vnpay_return(req, res, next) {
    let vnp_Params = req.query;

    const secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    const tmnCode = vnpay.vnp_TmnCode;
    const secretKey = vnpay.vnp_HashSecret;

    const signData = querystring.stringify(vnp_Params, { encode: false });   
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
    console.log(signed);
    console.log(secureHash);
    if(secureHash === signed){
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
        req.code = vnp_Params['vnp_ResponseCode']
    } else{
        req.code = {code: '97'}
    }
    next();
    //res.redirect(vnpUrl)
}

export async function get_vnpay_ipn(req, res, next) {
    let vnp_Params = req.query;
    const secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    
    const secretKey = vnpay.vnp_HashSecret;

    const signData = querystring.stringify(vnp_Params, { encode: false });   
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
     
    if(secureHash === signed){
        const orderId = vnp_Params['vnp_TxnRef'];
        const rspCode = vnp_Params['vnp_ResponseCode'];
        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
        req.RspCode = '00';
        req.message = 'success'
    }
    else {
        res.RspCode ='97';
        req.message = 'Fail checksum';
    }
    next();
    //res.redirect(vnpUrl)
}
*/