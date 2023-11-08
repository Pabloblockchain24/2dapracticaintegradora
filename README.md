El home esta en el endpoint "http://localhost:8080/api/users"

## ENDPOINT "/api/users"

![](/img_readme/Home.jpg)


## En login puedo logearme si ya estoy registrado, y sere redirigido a "/api/user/login", donde puedo ver los datos del usuarios y el carrito de compras asociado al usuario (solo esta relacionado a traves del id del cart y luego obtengo los datos de los productos a traves de populate), al hacer el login se crea un token con jwt y se almacena en las cookies

![](/img_readme/Profile.jpg)
![](/img_readme/token_login.jpg)


## en profile existe un boton "logout" que borra el token de la cookie y redirige a Home


## en el home, puedo registrar nuevos usuarios, los cuales se validan que no esten repetidos en email, encriptan la contraseña con bcrypt, crean un array de cart vacio, y se guarda con el userModel


![](/img_readme/register.jpg)

## En el endpoint "/api/products" se muestran todos los productos y se pueden ordenar y filtrar segun el paginate.

![](/img_readme/products.jpg)

## En el endpoint "/api/sessions/current" se revisa si existe un token en la cookie, en caso que no exista devuelve un mensaje "no existe usuario autenticado", y en caso que si existe renderiza en hbs profile que muestra el usuario

![](/img_readme/current.jpg)

