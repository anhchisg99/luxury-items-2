import authRouter from "./auth.route.js";
import pingRouter from "./ping.route.js";
import userRouter from "./user.route.js";
import articleRouter from "./article.route.js";
import articleCategoryRouter from "./articleCategory.route.js";
import commentRouter from "./comment.route.js";
import brandRouter from "./brand.route.js";
import productRouter from "./product.route.js";
import paymentRouter from "./payment.route.js";
import productCategoryRoute from "./productCategory.route.js";
import provinceRouter from "./province.route.js";
import districtRouter from "./district.route.js";
import orderRouter from "./order.route.js";
import favoriteRouter from "./favorite.route.js";
import reviewProductRouter from "./review.route.js"
import favoriteArticleRouter from "./favoriteArticle.route.js"
import vendorRouter from "./vendor.route.js"
import addressRouter from "./address.route.js"
import bannerRouter from "./banner.route.js"
import moneyRouter from "./money.route.js"

function route(app) {
  app.use("/ping", pingRouter);
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/article", articleRouter);
  app.use("/article-category", articleCategoryRouter);
  app.use("/favorite-article",favoriteArticleRouter)
  app.use("/comment", commentRouter);
  app.use("/address", addressRouter);
  app.use("/district", districtRouter);
  app.use("/province", provinceRouter);
  app.use("/brand", brandRouter);
  app.use("/banner", bannerRouter);
  app.use("/product", productRouter);
  app.use("/product-category", productCategoryRoute);
  app.use("/review", reviewProductRouter);
  app.use("/order", orderRouter);
  app.use("/favorite", favoriteRouter);
  app.use("/vendor", vendorRouter);
  app.use("/payment", paymentRouter);
  app.use("/money", moneyRouter)
}

export default route;
