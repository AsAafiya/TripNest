const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer"); //to parse multipart data format usually used for uploading files
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Category Filter Route
router.get(
  "/category/:category",
  wrapAsync(listingController.filterByCategory)
);

// Search Route
router.get("/search", wrapAsync(listingController.searchListings));


//index
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//show update delete
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//edit
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditFrom)
);


module.exports = router;
