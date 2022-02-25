from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Brand, Product, Review, ProductCategories
from base.serializers import BrandSerializer, ProductCategoriesSerializer, ProductSerializer

from rest_framework import status


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    products = Product.objects.filter(
        name__icontains=query).order_by('-createdAt')

    page = request.query_params.get('page')
    paginator = Paginator(products, 8)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})

@api_view(['POST'])
def FilterProducts(request):
    data = request.data
    if data["category"] == None:
        data["category"] = ''
    if data["is_available"] == None:
        data["is_available"] = False
    if data["brand"] == None:
        data["brand"] = ''
    

    if data["category"] != '' and data["is_available"] == True and data["brand"] != '':
        products = Product.objects.filter(category=data["category"]).filter(countInStock__gt=0).filter(brand=data["brand"]).order_by('-createdAt')
    elif data["category"] != '' and data["is_available"] == True:
        products = Product.objects.filter(category=data["category"]).filter(countInStock__gt=0).order_by('-createdAt')
    elif data["category"] != '' and data["brand"] != '':
        products = Product.objects.filter(category=data["category"]).filter(brand=data["brand"]).order_by('-createdAt')
    elif data["is_available"] == True and data["brand"] != '':
        products = Product.objects.filter(countInStock__gt=0).filter(brand=data["brand"]).order_by('-createdAt')
    elif data["is_available"] == True:
        products = Product.objects.filter(countInStock__gt=0).order_by('-createdAt')
    elif data["category"] != '':
        products = Product.objects.filter(category=data["category"]).order_by('-createdAt')
    elif data["brand"] != '':
        products = Product.objects.filter(brand=data["brand"]).order_by('-createdAt')
    else: 
        products = Product.objects.order_by('-createdAt')


    product_categories = ProductCategories.objects.all()
    page = request.query_params.get('page')
    paginator = Paginator(products, 8)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = ProductSerializer(products, many=True)
    cat_serializer = ProductCategoriesSerializer(product_categories, many=True)
    brands = Brand.objects.all()
    brands_serializer = BrandSerializer(brands, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages, 'categories': cat_serializer.data, 'brands': brands_serializer.data })

@api_view(['GET'])
def getProductCategories(request):
    product_categories = ProductCategories.objects.all()
    page = request.query_params.get('page')
    paginator = Paginator(product_categories, 8)

    try:
        product_categories = paginator.page(page)
    except PageNotAnInteger:
        product_categories = paginator.page(1)
    except EmptyPage:
        product_categories = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = ProductCategoriesSerializer(product_categories, many=True)
    return Response({ "data": serializer.data, "page": page, "pages": paginator.num_pages})
    
@api_view(['GET'])
def getProductCategory(request, pk):
    category = ProductCategories.objects.get(_id=pk)
    serializer = ProductCategoriesSerializer(category, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProductCategory(request):
    product_category = ProductCategories.objects.create(
        name='نام'
    )

    serializer = ProductCategoriesSerializer(product_category, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProductCategory(request, pk):
    data = request.data
    product_category = ProductCategories.objects.get(_id=pk)

    product_category.name = data['name']

    product_category.save()

    serializer = ProductCategoriesSerializer(product_category, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProductCategory(request, pk):
    product_category = ProductCategories.objects.get(_id=pk)
    product_category.delete()
    return Response('دسته بندی موردنظر با موفقیت حذف شد.')

@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    categories = ProductCategories.objects.all()
    brands = Brand.objects.all()
    brands_serializer = BrandSerializer(brands, many=True)
    cats_serializer = ProductCategoriesSerializer(categories, many=True)
    serializer = ProductSerializer(product, many=False)
    return Response({ 'product':serializer.data, 'categories': cats_serializer.data, 'brands': brands_serializer.data })


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand=None,
        countInStock=0,
        category= None,
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)
    
    product.name = data['name']
    product.price = data['price']
    product.brand = Brand.objects.get(_id=data['brand'])
    product.countInStock = data['countInStock']
    product.category = ProductCategories.objects.get(_id=data['category'])
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('محصول مورد نظر با موفقیت حذف شد')


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('عکس با موفقیت آپلود شد')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'محصول قبلا بررسی شده است'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'امتیازی انتخاب نشده است'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('نقد و بررسی شما با موفقیت ثبت شد')



@api_view(['GET'])
@permission_classes([IsAdminUser])
def getBrands(request):
    brands = Brand.objects.all()
    categories = ProductCategories.objects.all()

    page = request.query_params.get('page')
    paginator = Paginator(brands, 8)

    try:
        brands = paginator.page(page)
    except PageNotAnInteger:
        brands = paginator.page(1)
    except EmptyPage:
        brands = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    serializer = BrandSerializer(brands, many=True)
    cats_serializer = ProductCategoriesSerializer(categories, many=True)
    return Response({ "data": serializer.data, "categories": cats_serializer.data, "page": page, "pages": paginator.num_pages })


@api_view(['GET'])
def getBrand(request, pk):
    brand = Brand.objects.get(_id=pk)
    categories = ProductCategories.objects
    cats_serializer = ProductCategoriesSerializer(categories, many=True)
    serializer = BrandSerializer(brand, many=False)
    return Response({ 'brand':serializer.data, 'categories': cats_serializer.data })



@api_view(['POST'])
def filterBrandsByCategory(request):
    data = request.data
    if data['category'] == None:
        data['category'] = ''
    if data['category'] != '':    
        brands = Brand.objects.filter(_id=data['category'])
    else:
        brands = Brand.objects.all()

    page = request.query_params.get('page')
    paginator = Paginator(brands, 8)

    try:
        brands = paginator.page(page)
    except PageNotAnInteger:
        brands = paginator.page(1)
    except EmptyPage:
        brands = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    serializer = BrandSerializer(brands, many=True)
    return Response({ "data": serializer.data, "page": page, "pages": paginator.num_pages })    

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createBrand(request):
    new_brand = Brand.objects.create(
        name='برند',
        category=None
    )

    serializer = BrandSerializer(new_brand, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateBrand(request, pk):
    data = request.data
    brand = Brand.objects.get(_id=pk)
    
    brand.name = data['name']
    brand.category = ProductCategories.objects.get(_id=data['category'])

    brand.save()

    serializer = BrandSerializer(brand, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteBrand(request, pk):
    brand = Brand.objects.get(_id=pk)
    brand.delete()
    return Response('برند مورد نظر با موفقیت حذف شد')

