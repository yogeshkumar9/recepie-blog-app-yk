
require("../models/database");
const Category = require("../models/Category");
const recepie= require("../models/recepie");


exports.homepage= async(req,res)=>{
  try{
    const limitNumber= 5;
    const categories=await Category.find({}).limit(limitNumber);
    const latest= await recepie.find({}).sort({id:-1}).limit(limitNumber);
    const indian = await recepie.find({ 'category': 'Indian' }).limit(limitNumber);
    const american = await recepie.find({ 'category': 'American' }).limit(limitNumber);
    const chinese = await recepie.find({ 'category': 'Chinese' }).limit(limitNumber);
    const mexican = await recepie.find({ 'category': 'Mexican' }).limit(limitNumber);
    const food = { latest,indian, american, chinese, mexican };
   
    res.render('index',{ title:'HomePage - cookingBlog',categories,food });
  } catch(error){
    res.status(500).send({messege:error.messege||"Error occured"});
  }

 
};

exports.exploreCategories= async(req,res)=>{
  try{
    const limitNumber=10;
    const categories= await Category.find({}).limit(limitNumber);
    res.render('categories', {
      title: 'Cooking blog-categories',categories})
  }catch(error){
    res.send({messege:error.messege|| "error Occured"});
  }
};

exports.exploreCategoriesById= async(req,res)=>{
  try{
      let categoryId = req.params.id;
    const limitNumber=10;
    const categoriesById= await recepie.find({'category': categoryId}).limit(limitNumber);
    res.render('categories', {
      title: 'Cooking blog-categories',categoriesById})
  }catch(error){
    res.send({messege:error.messege|| "error Occured"});
  }
};


exports.searchRecipe = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await recepie.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });
    res.render('search', { title: 'Cooking Blog - Search', recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }

};















exports.exploreRecepie= async(req,res)=>{
  try{
    let recipeId= req.params.id;
    const recipe = await recepie.findById(recipeId);
    res.render('recipe', {
      title: 'Cooking blog-categories',recipe})
  }catch(error){
    res.send({messege:error.messege|| "error Occured"});
  }
};



exports.exploreLatest = async (req, res) => {
  try {
    const limitNumber = 20;
    const recipe = await recepie.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('explore-latest', { title: 'Cooking Blog - Explore Latest', recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};



exports.exploreRandom = async (req, res) => {
  try {
    let count = await recepie.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await recepie.findOne().skip(random).exec();
    res.render('explore-random', { title: 'Cooking Blog - Explore Latest', recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};




exports.submitRecipe = async (req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj });
};




exports.submitRecipeOnPost = async (req, res) => {
  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if (!req.files || Object.keys(req.files).length === 0) {
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
      })

    }

    const newRecipe = new recepie({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });

    await newRecipe.save();

    req.flash('infoSubmit', 'Recipe has been added.')
    res.redirect('/submit-recipe');
  } catch (error) {
    // res.json(error);
    req.flash('infoErrors', error);
    res.redirect('/submit-recipe');
  }
};

async function insertDymmyCategoryData(){
  try {
    await Category.insertMany([
      {
        "name": "Thai",
        "image": "thai-food.jpg"
      },
      {
        "name": "American",
        "image": "american-food.jpg"
      }, 
      {
        "name": "Chinese",
        "image": "chinese-food.jpg"
      },
      {
        "name": "Mexican",
        "image": "mexican-food.jpg"
      }, 
      {
        "name": "Indian",
        "image": "indian-food.jpg"
      },
      {
        "name": "Spanish",
        "image": "spanish-food.jpg"
      }
    ]);
  } catch (error) {
    console.log('err', + error)
  }
}

insertDymmyCategoryData();

async function insertDymmyRecipeData(){
  try {
    await recepie.insertMany([
      { 
        "name": "Indian-style chip butty",
        "description": `“These spiced, crispy hot potato balls squashed into buns with mango and pomegranate chutney, fresh mint yoghurt and Bombay mix sprinkles are to die for. Ridiculously delicious. ”`,
        "email": "yogesh@gmail.com",
        "ingredients": [
          "400 g potatoes",
          "400 g sweet potatoes",
          "3 cloves of garlic",
          "3 cm piece of ginger",
          "1 fresh red chilli",
          "1 large knob of unsalted butter",
          "1 teaspoon garam masala",
          "1 teaspoon mustard seeds",
          "2 tablespoons mango chutney",
          "½ a pomegranate",
          "1 bunch of fresh mint , (30g)",
            "4 tablespoons natural yoghurt",
            "4 soft rolls",
            "20 g Bombay mix",
           
        ],
        "category": "Indian", 
        "image": "Indian-chip butty.webp",
      },
      { 
        "name": "Chinese steak & tofu stew",
        "description": `“Ring the changes with this lovely, light nutritious beef stew – it really hits the spot. ”`,
      "email": "yogesh@gmail.com",
        "ingredients": [
          "1. 250g rump or sirloin steak",
          "2 cloves of garlic",
          " 4 cm piece of ginger",
          "2 fresh red chilli",
           "1 bunch of spring onions",
            "2 large carrots",
          "250g mooli or radishes",
          "1 heaped teaspoon Szechuan peppercorns",
          "groundnut oil",
          "2 tablespoons Chinese chilli bean paste, (find it in Asian supermarkets)",
           "1 litre veg stock",
            "1 x 400g tin of aduki beans",
          "1 tablespoon cornflour",
            "200g tenderstem broccoli",

        ],
        "category": "Chinese", 
        "image": "Chinese steak & tofu stew.webp",
      },
      { 
                "name": "Crab cakes",
                "description": `“TSPRING ONION, MASHED POTATO & CAYENNE ”`,
                "email": "yogesh@gmail.com",
                "ingredients": [
                 " 3 spring onions",
                 "½ a bunch of fresh flat-leaf parsley",
                 "1 large free-range egg",
                 "750 g cooked crabmeat , from sustainable sources",
                 "300 g mashed potatoes",
                 "1 teaspoon ground white pepper",
                 "1 teaspoon cayenne pepper",
                 "plain flour , for dusting",
                 "olive oil",
                  "watercress",
                 "tartare sauce",
        
                ],
                "category": "American", 
                "image": "Crab-cakes.webp",
              },
              { 
                "name": "Quick Mexican breakfast",
                "description": `“TSPRING ONION, MASHED POTATO & CAYENNE ”`,
                "email": "yogesh@gmail.com",
                "ingredients": [
                 " 3 spring onions",
                 "½ a bunch of fresh flat-leaf parsley",
                 "1 large free-range egg",
                 "750 g cooked crabmeat , from sustainable sources",
                 "300 g mashed potatoes",
                 "1 teaspoon ground white pepper",
                 "1 teaspoon cayenne pepper",
                 "plain flour , for dusting",
                 "olive oil",
                  "watercress",
                 "tartare sauce",
        
                ],
                "category": "Mexican", 
                "image": "Mexicanbreakfast.webp",
              },
              { 
                "name": " Mexican-chorizo",
                "description": `“TSPRING ONION, MASHED POTATO & CAYENNE ”`,
                "email": "yogesh@gmail.com",
                "ingredients": [
                 " 3 spring onions",
                 "½ a bunch of fresh flat-leaf parsley",
                 "1 large free-range egg",
                 "750 g cooked crabmeat , from sustainable sources",
                 "300 g mashed potatoes",
                 "1 teaspoon ground white pepper",
                 "1 teaspoon cayenne pepper",
                 "plain flour , for dusting",
                 "olive oil",
                  "watercress",
                 "tartare sauce",
              
                ],
                "category": "Mexican", 
                "image": "Mexican2.webp",
              },
              { 
                "name": " KETO MEXICAN CHICKEN CASSEROLE ",
                "description": `“The following Mexican chicken casserole combines chicken for protein, riced cauliflower for consistency, and an assortment of fatty ingredients to fuel your mood. Best of all, it tastes great and greatly improves perceived food pleasure.”`,
                "email": "yogesh@gmail.com",
                "ingredients": [
                 " 3 spring onions",
                 "½ a bunch of fresh flat-leaf parsley",
                 "1 large free-range egg",
                 "750 g cooked crabmeat , from sustainable sources",
                 "300 g mashed potatoes",
                 "1 teaspoon ground white pepper",
                 "1 teaspoon cayenne pepper",
                 "plain flour , for dusting",
                 "olive oil",
                  "watercress",
                 "tartare sauce",
              
                ],
                "category": "Mexican", 
                "image": "Mexican3.webp",
              },

    ]);
  } catch (error) {
    console.log('err', + error)
  }
};
insertDymmyRecipeData();


