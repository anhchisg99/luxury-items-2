import { productRepository } from "../../../../repositories/mongodb/index.js";

async function getNewArrival(req, res, next) {
  console.log("GET /product/new-arrival api");
  try {
    const { limit, vendorId } = req.query;
    const limitRecord = parseInt(limit, 10) || 5;
    let data;
    if(!vendorId){
      data= await productRepository.findNewArrival(limitRecord);
      return res.status(200).send(data);
    }else{
      data= await productRepository.findNewArrivalOfVendor(vendorId, limitRecord);
      return res.status(200).send(data);
    }
  } catch (error) {
    console.log(
      "Location: controllers/product/getNewArrival.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getNewArrival;
