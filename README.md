
# `Documentation`

<p align="center">
  <img src=client\src\asset\images\logo.png width="250" title="hover text">
</p>

>Make Up Time website is here to sell you makeup products and allwos you to make oppintment with our House ashtrays. Its pages are as below. A page for the Home, Store - which can also be opened by categories, About, Shopping cart, Faq-frequently asked questions, and Previous Orders. Additionally, there is a sign-up form and a login form to the site.

**`Important`: in order to use this app you must run the following in the terminal:**
* npm install
* npm start
-------------------------------------------
The application contains a header and footer toolbar that can navigate between the pages. It is also possible to get to the pages by using links:
* **Home** - http://localhost:3000/ 
* **Shop** (All items) - http://localhost:3000/AllItems 
* **Shop** (skin products) - http://localhost:3000/AllItems/Skin 
* **Shop** (eyes products) - http://localhost:3000/AllItems/Eyes 
* **Shop** (lips products) - http://localhost:3000/AllItems/Lips 
* **Shop** (brushes products) - http://localhost:3000/AllItems/Brushes
* **Our Teams** - http://localhost:3000/artists
* **Shopping Cart** - http://localhost:3000/ShoppingCart 
* **Checkout** - http://localhost:3000/checkout 
* **Login** - http://localhost:3000/login 
* **Questions** - http://localhost:3000/questions
----------------------------------------------
**The website uses the following components**:
> *Most of the following Components receive the currentUser as props which is stored in the local storage and use its information when needed.*

**Header** -as explained above, and a login button..
**Footer** – as explained above.
**Home** – has a carousel with pictures-allowd you go to other componnent – by click.
**MakeupArtist** – Fetches  all the stores’ makeup-artists and calls the Artist component to display all the artists.
**Artist** – receives: imgSrc,name,email,seniority,phoneNumber,events,artist, and displays her.
**ContactUs** – display Contact Information.

**LoginForm** – a form to sign-up to our website,or login to the users account if exist.
    sign-up contains the following fields:
    - *name* – is valid if the name is only letters in the ABC alphabet or space.
    - *Email* – is valid if email is in the form of: exampleEmail@example.com.
    - *Password* - is valid if it contains at least 8 characters including at least one digit, lowercase, and uppercase letter and special character.

All the validations above are done by the Validation.js file(in the shared folder).In addition, all of the above fields are required. When all fields are valid and not empty, after the user logs in – it is known in the whole website and his name will appear on the header, in addition if the user is a new user, it will receive a welcome email to his inbox. (The user does not have to sign-up or login to buy from the website.)

**Item** – receives: imageSrc, productName, category, price, id as props, and displays an item in the store – according to the props received. It has an add-to-cart button, and when added a toast notification notifies the user that it added an item to the cart. In addition, when pressing on the item a modal opens showing the item at magnification . 
**AllItems** – Fetches  all the stores’ items and calls the Item component to display all the items. If it received a category as props only the items having that category will be displayed.
**ShoppingCart** – Fetches the users shopping cart items and calls the CartItem to display them onto the page.\
There is an option to choose when the order should be delivered, and the total amount of order is displayed too. A proceed to checkout button which take the user to the Checkout page:
**PayPal** – receives the total of the order, and charges the user’s order through paypal.
**Checkout** – has 2 options of payment PayPal or credit card. The payment form has the following fields:
    - *name* – is valid if the name is letters in the ABC alphabet.
    - *Phone number* – is valid if number is more then 9 digits.
    - *House Number,street* – is valid if it has a number and street name.
    - *City* – is valid if it validate k=like name.
    - *Credit card number* – is valid if the number is a correct number of one of the following cards:
    Visa, MasterCard, American Express, Diners Club, Discover, and JCB.
    - *Expiration date* – is valid if the date is not expired.
    - *Security number* – is valid if it's 3 or 4 digits. 

*All the above validations are performed by the Validation file, as mentioned above.*

After the user correctly pays a confirmation email is sent to its inbox.
and show al items that ordered from component:
**OrderedItem**-display item that ordered,get as props:imgSrc,amount,name
**NotFound** – displays Error 404 page not found for any page that doesn’t exist on the website.
**Questions** – Provides answers for frequently asked questions and has an option of submitting another question.
22. **PreviousOrder** – displays an order of users’ previous orders.
23. **PreviousOrders** – by calling PreviousOrder, displays all of the users’ previous orders. Obviously, if there are no orders (or the user is not signed in) there will be a notice saying that there are no previous orders. 
------------------------------------------------
### `I hope you enjoy this website as many hours and effort went into building it.`

<p align="center">
  <img src="client\public\favicon.ico" width="150" title="hover text">
</p>

