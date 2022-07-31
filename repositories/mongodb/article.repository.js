import { Article } from "../../models/index.js";

async function saveArticle(articleData) {
  try {
    return articleData.save();
  } catch (error) {
    console.log("Location: repositories/article.repository.js -> saveArticle: ", error.message);
  }
}

async function createArticle(articleData) {
  try {
    return Article.create(articleData);
  } catch (error) {
    console.log("Location: repositories/article.repository.js -> createArticle: ", error.message);
  }
}

async function getDetail(articleId) {
  try {
    return Article.findById(articleId)
      .populate("article_categories", "category_name")
      .select(
        "article_header_url title title_en brief brief_en content content_en author_name comments en_version created_at"
      )
      .lean();
  } catch (error) {
    console.log("Location: repositories/article.repository.js -> getDetail: ", error.message);
  }
}

async function getFullDetail(articleId) {
  try {
    return Article.findById(articleId);
  } catch (error) {
    console.log("Location: repositories/article.repository.js -> getFullDetail: ", error.message);
  }
}

async function getComment(articleId) {
  try {
    return Article.findById(articleId).populate("comments").select("comments");
  } catch (error) {
    console.log("Location: repositories/article.repository.js -> getComment: ", error.message);
  }
}

async function countArticle() {
  try {
    return Article.estimatedDocumentCount();
  } catch (error) {
    console.log("Location: repositories/article.repository.js -> countArticle: ", error.message);
  }
}

async function findAll(en_version) {
  try {
    return Article.find({ en_version })
      .populate("article_categories", "category_name")
      .sort({ created_at: -1 })
      .select("-__v -deleted -content")
      .lean();
  } catch (error) {
    console.log("Location: repositories/article.repository.js -> findAll: ", error.message);
  }
}

async function findAllPagination(skipRecord, limitRecord, en_version) {
  try {
    const cover = await findCover();
    return Article.find({ _id: { $ne: cover[0]["_id"] }, en_version })
      .populate("article_categories", "category_name")
      .select("-__v -deleted -content")
      .skip(skipRecord)
      .limit(limitRecord)
      .sort({ created_at: -1 })
      .lean();
  } catch (error) {
    console.log(
      "Location: repositories/article.repository.js -> findAllPagination: ",
      error.message
    );
  }
}

async function findEditorPick(limitRecord, en_version) {
  try {
    return Article.find({ is_editor_pick: true, en_version })
      .populate("article_categories", "category_name")
      .select(
        "_id article_header_url title title_en brief brief_en author_name en_version created_at"
      )
      .limit(limitRecord)
      .sort({ created_at: -1 })
      .lean();
  } catch (error) {
    console.log("Location: repositories/article.repository.js -> findEditorPick: ", error.message);
  }
}

async function findPopular(limitRecord, en_version) {
  try {
    return Article.find({ en_version })
      .select("_id article_header_url title title_en brief brief_en created_at en_version views")
      .limit(limitRecord)
      .sort({ views: -1, created_at: -1 })
      .lean();
  } catch (error) {
    console.log("Location: repositories/article.repository.js -> findPopular: ", error.message);
  }
}

async function findHomeHeader(limitRecord) {
  try {
    return Article.find({ is_popular: true })
      .select("_id article_header_url title title_en brief brief_en en_version created_at")
      .limit(limitRecord)
      .sort({ views: -1, created_at: -1 })
      .lean();
  } catch (error) {
    console.log("Location: repositories/article.repository.js -> findHomeHeader: ", error.message);
  }
}

async function findCover(en_version) {
  try {
    return Article.find({ is_cover: true, en_version })
      .select("_id article_header_url title title_en brief brief_en en_version created_at")
      .limit(1)
      .sort({ created_at: -1 })
      .lean();
  } catch (error) {
    console.log("Location: repositories/article.repository.js -> findCover: ", error.message);
  }
}

async function findVirtualSpacePost(limitRecord) {
  try {
    return Article.find({ is_feature: true })
      .populate("article_categories", "category_name")
      .select(
        "_id article_header_url title title_en brief brief_en author_name en_version created_at"
      )
      .limit(limitRecord)
      .sort({ created_at: -1 })
      .lean();
  } catch (error) {
    console.log(
      "Location: repositories/article.repository.js -> findVirtualSpacePost: ",
      error.message
    );
  }
}

async function getWhatToReadNext(limitRecord, en_version) {
  try {
    return Article.find({ is_readnext: true, en_version })
      .select("_id article_header_url title title_en en_version created_at")
      .limit(limitRecord)
      .sort({ created_at: -1 })
      .lean();
  } catch (error) {
    console.log(
      "Location: repositories/article.repository.js -> getWhatToReadNext: ",
      error.message
    );
  }
}

async function findIconic(limitRecord, en_version) {
  try {
    return Article.find({ is_iconic: true, en_version })
      .populate("article_categories", "category_name")
      .select(
        "_id article_header_url title title_en brief brief_en author_name en_version article_categories created_at"
      )
      .limit(limitRecord)
      .sort({ created_at: -1 })
      .lean();
  } catch (error) {
    console.log("Location: repositories/article.repository.js -> findIconic: ", error.message);
  }
}

async function findHighlight(limitRecord, en_version) {
  try {
    return Article.find({ is_highlight: true, en_version })
      .select("_id article_header_url title title_en en_version created_at")
      .limit(limitRecord)
      .sort({ created_at: -1 })
      .lean();
  } catch (error) {
    console.log("Location: repositories/article.repository.js -> findHighlight: ", error.message);
  }
}

async function findExclusive(load_more, en_version) {
  try {
    return Article.find({ is_exclusive: true, en_version })
      .populate("article_categories", "category_name")
      .select(
        "_id article_header_url title title_en brief brief_en author_name article_categories en_version created_at"
      )
      .limit(load_more)
      .sort({ created_at: -1 })
      .lean();
  } catch (error) {
    console.log("Location: repositories/article.repository.js -> findExclusive: ", error.message);
  }
}

async function deleteOne(articleId) {
  try {
    return Article.findByIdAndRemove({ _id: articleId });
  } catch (error) {
    console.log("Location: repositories/article.repository.js -> deleteOne: ", error.message);
  }
}

async function updateOne(id, articleData) {
  try {
    return Article.findByIdAndUpdate({ _id: id }, { $set: articleData }, { new: true });
  } catch (error) {
    console.log("Location: repositories/article.repository.js -> updateOne: ", error.message);
  }
}

async function softDelete(id) {
  try {
    return Article.delete({ _id: id });
  } catch (error) {
    console.log("Location: repositories/article.repository.js -> softDelete: ", error.message);
  }
}

async function forceDelete(id) {
  try {
    return Article.deleteOne({ _id: id });
  } catch (error) {
    console.log("Location: repositories/article.repository.js -> forceDelete: ", error.message);
  }
}

async function restoreArticle(id) {
  try {
    return Article.restore({ _id: id });
  } catch (error) {
    console.log("Location: repositories/article.repository.js -> restoreArticle: ", error.message);
  }
}

async function visitUp(id) {
  try {
    return Article.findByIdAndUpdate({ _id: id }, { $inc: { views: 1 } }, { new: true })
      .select("article_header_url title author_name brief content comments created_at")
      .lean();
  } catch (error) {
    console.log("Location: repositories/article.repository.js -> visitUp: ", error.message);
  }
}

async function searchByKeyword(searchQuery, author, page, limit, category) {
  try {
    // const queryString = '"' + searchQuery.split(" ").join('" "') + '"';
    // console.log(queryString);
    // const query = { $text: { $search: queryString } };
    // return Article.find(query)
    //   .skip(skipRecord)
    //   .limit(limitRecord)
    //   .sort({ created_at: -1 })
    //   .select(
    //     "_id article_header_url title title_en brief brief_en author_name article_categories created_at"
    //   )
    //   .lean();
    // return Article.find({
    //   $or: [
    //     { title: { $regex: searchQuery, $options: "i" } },
    //     { brief: { $regex: searchQuery, $options: "i" } },
    //     { content: { $regex: searchQuery, $options: "i" } },
    //   ],
    //   author_name: { $regex: author, $options: "i" },
    //   // article_categories: { $elemMatch: { category_name: category } },
    // })
    //   .select(
    //     "_id article_header_url title title_en brief brief_en author_name article_categories en_version created_at"
    //   )
    //   .skip(skipRecord)
    //   .limit(limitRecord)
    //   .sort({ created_at: -1 })
    //   .populate([
    //     {
    //       path: "article_categories",
    //       select: "_id category_name",
    //     },
    //   ]);
    const pageOptions = {
      page: parseInt(page, 10) || 1,
      limitRecord: parseInt(limit, 10) || 10,
    };

    const skipRecord = pageOptions.page * pageOptions.limitRecord - pageOptions.limitRecord;
    const limitRecord = pageOptions.limitRecord;

    let aggregate = Article.aggregate();
    aggregate.lookup({
      from: "articlecategories",
      localField: "article_categories",
      foreignField: "_id",
      as: "article_categories_name",
    });
    searchQuery &&
      aggregate.match({
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { brief: { $regex: searchQuery, $options: "i" } },
        ],
      });

    author &&
      aggregate.match({
        author_name: { $regex: author, $options: "i" },
      });

    category && aggregate.match({ "article_categories_name.category_name": category });

    aggregate.project({
      _id: 1,
      article_header_url: 1,
      title: 1,
      brief: 1,
      author_name: 1,
      article_categories: 1,
      created_at: 1,
      "article_categories_name.category_name": 1,
    });

    return aggregate.facet({
      metadata: [{ $count: "total" }, { $addFields: { page: page } }],
      data: [{ $skip: skipRecord }, { $limit: limitRecord }],
    });
  } catch (error) {
    console.log("Location: repositories/article.repository.js -> findAll: ", error.message);
  }
}

export {
  saveArticle,
  getComment,
  getDetail,
  countArticle,
  findAll,
  findAllPagination,
  findCover,
  getWhatToReadNext,
  findEditorPick,
  findExclusive,
  findPopular,
  findIconic,
  findHighlight,
  findVirtualSpacePost,
  deleteOne,
  updateOne,
  softDelete,
  forceDelete,
  restoreArticle,
  visitUp,
  getFullDetail,
  findHomeHeader,
  createArticle,
  searchByKeyword,
  // findEngVersion
};
