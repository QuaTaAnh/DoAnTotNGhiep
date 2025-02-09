import {
  adminHiddenPostService,
  createPostService,
  getNewPostService,
  getPostByIdService,
  getPostByUserIdService,
  getPostFollowService,
  getPostSearchService,
  getPostService,
  getPostSuggestService,
  getRecentPostService,
  hiddenPostService,
  incrementPostViewService,
  monthlyPostCountService,
  postCategoryCountService,
  topViewPostService,
} from "../services/postService.js";

export const getPostController = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = 10;
    const priceId = req.query.priceId;
    const areaId = req.query.areaId;
    const categoryId = req.query.categoryId;
    const address = req.query.address;
    const status = req.query.status;
    const post = await getPostService(
      page,
      pageSize,
      priceId,
      areaId,
      categoryId,
      status,
      address
    );
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Có lỗi xảy ra!",
      error,
    });
  }
};

export const getNewPostController = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = 10;
    const post = await getNewPostService(page, pageSize);
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Có lỗi xảy ra!",
      error,
    });
  }
};

export const getPostFollowController = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = 10;
    const post = await getPostFollowService(page, pageSize, userId);
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Có lỗi xảy ra!",
      error,
    });
  }
};

export const getPostSearchController = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const { keyword } = req.params;
    const post = await getPostSearchService(page, pageSize, keyword);
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Có lỗi xảy ra!",
      error,
    });
  }
};

export const createPostController = async (req, res) => {
  try {
    const { id } = req.user;
    const { areaId, categoryId, priceId, title, images, ...payload } = req.body;
    if (!areaId || !categoryId || !priceId || !title || images.length === 0) {
      return res.status(200).send({
        status: false,
        message: "Bạn phải nhập đầy đủ thông tin",
      });
    }
    const post = await createPostService(id, req.body);
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Có lỗi xảy ra!",
      error,
    });
  }
};

export const getPostByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await getPostByIdService(id);
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Có lỗi xảy ra!",
      error,
    });
  }
};

export const getPostSuggestController = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = 10;
    const priceId = req.query.priceId;
    const areaId = req.query.areaId;
    const address = req.query.address;

    const post = await getPostSuggestService(
      page,
      pageSize,
      priceId,
      areaId,
      address
    );
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Có lỗi xảy ra!",
      error,
    });
  }
};

export const getPostByUserIdController = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = 10;
    const userId = parseInt(req.params.userId);
    const status = req.query.status;
    const post = await getPostByUserIdService(page, pageSize, userId, status);
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Có lỗi xảy ra!",
      error,
    });
  }
};

export const hiddenPostController = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = parseInt(req.params.postId);
    const hiddenPost = await hiddenPostService(postId, userId);
    return res.status(200).json(hiddenPost);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Có lỗi xảy ra!",
      error,
    });
  }
};

export const adminHiddenPostController = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    const hiddenPost = await adminHiddenPostService(postId);
    return res.status(200).json(hiddenPost);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Có lỗi xảy ra!",
      error,
    });
  }
};

export const incrementPostViewController = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;
    const result = await incrementPostViewService(postId, userId);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Có lỗi xảy ra!",
      error,
    });
  }
};

export const monthlyPostCountController = async (req, res) => {
  try {
    const result = await monthlyPostCountService();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Có lỗi xảy ra!",
      error,
    });
  }
};

export const topViewPostController = async (req, res) => {
  try {
    const result = await topViewPostService();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Có lỗi xảy ra!",
      error,
    });
  }
};

export const postCategoryCountController = async (req, res) => {
  try {
    const result = await postCategoryCountService();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Có lỗi xảy ra!",
      error,
    });
  }
};

export const getRecentPostController = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await getRecentPostService(userId, req.query);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Có lỗi xảy ra!",
      error,
    });
  }
};
