import Route from '@ioc:Adonis/Core/Route'

Route.get("login", "web/AuthController.login");
Route.post("login", "web/AuthController.loginAct");
Route.group(() => {
    Route.resource("beranda", "web/BerandasController");
    Route.get("profile", "web/AuthController.profile");
    Route.post("profile", "web/AuthController.profileUpdate");
    Route.get("logout", "web/AuthController.logout");
    Route.resource("kategori-belajar", "web/KategoriBelajarsController");
    Route.resource("permission", "web/PermissionsController");
    Route.resource("role", "web/RolesController");
    Route.resource("set-role-permission", "web/SetRolePermissionsController");
    Route.resource("pengguna", "web/UsersController");
    Route.resource("client", "web/ClientsController");
    Route.resource("masterdata-term-condition", "web/AgreementDataController");
    Route.resource("client-term-condition", "web/AgreementsController");

    // learning route::started
    Route.resource("learning-category", "web/LearningCategoriesController");
    Route.get("find-category-form", "web/LearningCategoriesController.findData");
    Route.resource("learning-subcategory", "web/LearningSubcategoriesController");
    Route.resource("learning-material", "web/LearningMaterialsController");
    // learning route::ended
    // learning route::started
    Route.resource("career-category", "web/CareerCategoriesController");
    Route.get("find-category-career-form", "web/CareerCategoriesController.findData");
    Route.resource("career-subcategory", "web/CareerSubcategoriesController");
    Route.resource("career-material", "web/CareerMaterialsController");
    // learning route::ended
}).middleware("auth:web");