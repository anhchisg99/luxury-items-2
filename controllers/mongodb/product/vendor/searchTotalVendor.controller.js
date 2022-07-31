// import { productRepository } from "../../../repositories/mongodb/index.js";
import {productRepository} from "../../../../repositories/mongodb/index.js"
async function searchTotalVendor(req, res, next) {
    console.log(`GET /product/search-total/`);
    // console.log(req.query.brand)
    const arr = []
    const {vendor} = req.query
    const {product_name} = req.query
    if (req.query.provinceCode) {
        const provinceCode = req.query.provinceCode.split(";")
        arr.push(provinceCode)
      
    }else{
        arr.push(null)
    }
    if (req.query.brand) {
        const brand = req.query.brand.split(";")
        arr.push(brand)
    }else{
        arr.push(null)
    }
    if (req.query.rating) {
        const rating = req.query.rating
        arr.push(rating)
    }else{
        arr.push(null)
    }
    
    if (req.query.price_min) {
        const price_min = req.query.price_min
        arr.push(price_min)
    }else{
        arr.push(0)
    }
    if (req.query.price_max) {
        const price_max = req.query.price_max
        arr.push(price_max)
    }else{
        arr.push(0)
    }
    if (req.query.category) {
        const category = req.query.category
        arr.push(category)
    }else{
        arr.push(null)
    }
    
    try {

        const data = await productRepository.searchTotalVendor(arr,vendor,product_name);
        // const data = await productRepository.searchTotalVendor();
        res.status(200).send(data);
    } catch (error) {
        console.log(
            "Location: controllers/product/guest/searchTotalVendor.controller.js",
            error.message
        );
        res.status(400).json(error.message);
    }
}


export default searchTotalVendor;
