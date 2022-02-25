from django.urls import path
from base.views import product_views as views

urlpatterns = [

    path('', views.getProducts, name="products"),

    path('create/', views.createProduct, name="product-create"),
    path('category/create/', views.createProductCategory, name="product-category-create"),
    path('brand/create/', views.createBrand, name="brand-create"),

    path('upload/', views.uploadImage, name="image-upload"),

    path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
    path('top/', views.getTopProducts, name='top-products'),
    path('filter/', views.FilterProducts, name='filter-products'),
    path('categories/', views.getProductCategories, name='products-categories'),
    path('brands/', views.getBrands, name='products-categories'),

    path('<str:pk>/', views.getProduct, name="product"),
    path('category/<str:pk>', views.getProductCategory, name='product-category'),
    path('brand/<str:pk>', views.getBrand, name='brand'),

    path('update/<str:pk>/', views.updateProduct, name="product-update"),
    path('category/update/<str:pk>/', views.updateProductCategory, name="product-category-update"),
    path('brand/update/<str:pk>/', views.updateBrand, name="brand-update"),

    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),
    path('category/delete/<str:pk>/', views.deleteProductCategory, name="product-category-delete"),
    path('brand/delete/<str:pk>/', views.deleteBrand, name="brand-delete"),

]
