import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.group(() => {
        Route.post("register", "mobileApi/AuthController.register");
        Route.post("login", "mobileApi/AuthController.login");
        Route.get("email-verify/:data", "mobileApi/AuthController.verifymail");
        Route.group(() => {
            Route.get("profile", "mobileApi/AuthController.profile");
            Route.post("profile", "mobileApi/AuthController.profileUpdate");
            Route.post("logout", "mobileApi/AuthController.logout");
        }).middleware("auth:api")
    }).prefix("auth")
    Route.group(() => {
        Route.group(() => {
            Route.get("option-list-career-category-classification", "mobileApi/ClassificationController.careerCategory");
            Route.get("option-list-learning-category-classification", "mobileApi/ClassificationController.learningCategory");
            Route.get("option-list-learning-subcategory-classification", "mobileApi/ClassificationController.learningSubcategory");
            Route.get("option-stages-classification", "mobileApi/ClassificationController.stages");
            Route.get("option-goals-classification", "mobileApi/ClassificationController.goals");
            Route.post("set-client-career-category", "mobileApi/ClassificationController.SetCareerCategory");
            Route.post("set-client-career-stages", "mobileApi/ClassificationController.SetCareerStages");
            Route.post("set-client-goals", "mobileApi/ClassificationController.SetGoals");
            Route.post("set-client-learning-category", "mobileApi/ClassificationController.SetLearningCategory");
            Route.post("set-client-learning-subcategory", "mobileApi/ClassificationController.SetLearningSubCategory");
        }).middleware("auth:api")
    }).prefix("client-classification")
    Route.group(() => {
        Route.group(() => {
            Route.get("list-agreement", "mobileApi/AgreementsController.index");
            Route.put("client-agreement/:clientId", "mobileApi/AgreementsController.storeOrUpdate");
            Route.get("cek-client", "mobileApi/AgreementsController.cekClient");
        }).middleware("auth:api")
    }).prefix("client-agreement")
    Route.group(() => {
        Route.group(() => {
            Route.get("index", "mobileApi/CareerCategoriesController.index");
            Route.get("show/:id", "mobileApi/CareerCategoriesController.show");
        }).middleware("auth:api")
    }).prefix("career-category")
    Route.group(() => {
        Route.group(() => {
            Route.get("index", "mobileApi/CareerSubcategoriesController.index");
            Route.get("show/:id", "mobileApi/CareerSubcategoriesController.show");
        }).middleware("auth:api")
    }).prefix("career-subcategory")
    Route.group(() => {
        Route.group(() => {
            Route.get("index", "mobileApi/CareerMaterialsController.index");
            Route.get("show/:id", "mobileApi/CareerMaterialsController.show");
        }).middleware("auth:api")
    }).prefix("career-material")
    Route.group(() => {
        Route.group(() => {
            Route.get("index", "mobileApi/LearningCategoriesController.index");
            Route.get("show/:id", "mobileApi/LearningCategoriesController.show");
        }).middleware("auth:api")
    }).prefix("learning-category")
    Route.group(() => {
        Route.group(() => {
            Route.get("index", "mobileApi/LearningSubcategoriesController.index");
            Route.get("show/:id", "mobileApi/LearningSubcategoriesController.show");
        }).middleware("auth:api")
    }).prefix("learning-subcategory")
    Route.group(() => {
        Route.group(() => {
            Route.get("index", "mobileApi/LearningMaterialsController.index");
            Route.get("show/:id", "mobileApi/LearningMaterialsController.show");
        }).middleware("auth:api")
    }).prefix("learning-material")
}).prefix("client")