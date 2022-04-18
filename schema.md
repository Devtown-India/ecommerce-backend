# SCHEMAS

- ## User
    - firstName : String
    - lastName : String
    - email : String
    - password : String (Hashed)
    - Address : [
        - Address (from address schema)
    ]
    - Orders :[
        {
           address : Address (from address schema)
        }
    ]

- ## Product
    - name : String
    - stickerPrice : Number
    - markedPrice : Number
    - category : Category (from category Schema)
    - image : String (URL)
    - compatibleWith :  [ "iPhone13", "iPhone12", "Apple Watch"]
    - stock : Number
    - color : String

- ## Category
    - name : String
    - description : String

- ## Order
    - address : Adress (from address schema)
    - user : User (from user schema)
    - products : [
        product: Product (from Product Schema)
    ]
    - total : Number
    - status : [ "payment_pending", "payment_success", "payment_errored"]

- ## Address
    - houseNumber: String
    - fullAddress: String
    - landmark: String