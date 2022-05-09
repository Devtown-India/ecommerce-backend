import express from "express";
import { body, validationResult } from "express-validator";
import { isAdmin } from "../services/middlewares/isAdmin";
import { isAuthenticated } from "../services/middlewares/isAuthenticated";
import { Category, Product } from "../services/mongodb/schema";

const router = express.Router();

/*
type : POST
path : /category/add
body : {name,description}
query: none
description: Route to add a category
*/

router.post(
  "/add",
  isAuthenticated,
  isAdmin,
  body("name").isLength({ min: 1 }),
  body("description").isLength({ min: 5 }),
  async (req, res) => {
    try {
      const { errors } = validationResult(req);
      if (errors.length > 0)
        return res.json({
          data: {
            category: null,
          },
          success: false,
          message: "validation failed",
        });

      const { name, description } = req.body;

      const category = new Category({ name, description });
      await category.save();
      return res.json({
        data: {
          category,
        },
        success: false,
        message: "Category added",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        data: {
          category: null,
        },
        success: false,
        message: error.message,
      });
    }
  }
);

/*
type : GET
path : /category/all
body : none
query: none
description: Route to fetch all categories
*/

router.get("/all", async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.json({
      data: {
        categories,
      },
      success: false,
      message: "Categories fetched",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      data: {
        categories: [],
      },
      success: false,
      message: error.message,
    });
  }
});

/*
type : DELETE
path : /category/:id
body : none
query: none
description: Route to fetch all categories
*/

router.delete("/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndDelete({ _id: id });

    // check if a product is using this category

    const products = Product.find({category:id})

    if(products.length>0) return res.json({
      data: {
        category:null,
      },
      success: false,
      message: "category could not be deleted",
    });


    return res.json({
      data: {
        category,
      },
      success: true,
      message: "category deleted",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      data: {
        category: null,
      },
      success: false,
      message: error.message,
    });
  }
});
export default router;
