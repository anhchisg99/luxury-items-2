import { vendorRepository } from '../../../repositories/mongodb/index.js'

async function getStoreDetail(req, res, next) {
  console.log("GET /vendor/:id api");
  const { id } = req.params;
  try {
    const data = await vendorRepository.getDetail(id);
    if(!data){
      return res.status(400).send({ message: `No found this vendor - ${id}`})
    }else{
      return res.status(200).send(data);
    }
  } catch (error) {
    console.log(
      "Location: controllers/vendor/getStoreDetail.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getStoreDetail;
