// flipkart application
//page1
>list of category type
*http://localhost:8120/categoryoption
>list of products category wise
*http://localhost:8120/itemlisting1?categoryId=2
>list of product type
*http://localhost:8120/producttype1


//page2
>Rest wrt res to product filter type
*http://localhost:8120/itemlisting1?productId=5
*http://localhost:8120/itemlisting1?categoryId=1&productId=2
>Rest wrt to productType + cuisine
*http://localhost:8120/filter/1?cuisineId=1
>Rest wrt to productType + cost
*http://localhost:8120/filter/1?Lcost=300&hcost=2000

//page3
>Details of product
*http://localhost:8120/details/3
>item of product
*http://localhost:8120/item/2

//page4
>Details of item selected
>place order

//page5
>List of all the orders
*http://localhost:8120/orders
>Update orders details
>Delete orders