SLUGGRAM
===
> a social photo platform REST API

## API Resources
#### User Model
The user model is used in the backend strickly for authentication and authorization. The user model will never be returned from the API, however userID's are stored on Profiles, Photos, and Comments for authorzation validation.  

* `_id` - an unique database genorated string which uniqly identifys a user
* `email` - a unique string which stores the users email
* `username` - a unique string that stores the users username
* `passwordHash` - a string that holds a users hashed password
* `tokenSeed` - a unique and random string used to genorate authorization tokens 

#### Profile Model
Each user can have a single profile. Authorization is required for Creating, Updating, and Deleteing Profiles but they have public read access.  

* `_id` - an unique database genorated string which uniqly identifys a profile  
* `owner` - the user id of the profiles creator 
* `email` - a unique string which stores the profiles email
* `username` - a unique string that stores the profiles profilename
* `avatar` - a string holding a URL to a profile photo
* `bio` - a string holding a profiles bio 

#### Photo Model
Each user can have may photos. Authorization is required for Creating, Updating, and Deleteing Photos but they have public read access.

* `_id` - an unique database genorated string which uniqly identifys a profile  
* `owner` - the user id of the photos creator 
* `profile` - stores a the creators profile ID. the profile is populated on GET requests
* `comments` - stores an array of comment IDs. the comments are populated on GET requests
* `url` - a string which store a url to the photo
* `description` - a string with a description of the photo

#### Comment Model
Each user can have many comments, and each photo can have may comments. Authorization is required for Creating, Updating, and Deleteing Comments but they have public read access.

* `_id` - an unique database genorated string which uniqly identifys a profile  
* `owner` - the user id of the photos creator 
* `profile` - stores a the creators profile ID. the profile is populated on GET requests
* `photoID` - stores the photo id of the photo the comment is a response to 
* `content` - a string with the users comment

## Auth 
Sluggram uses Basic authentication and Bearer authorization to enforce access controls. Basic and Bearer auth both use the HTTP `Authorization` header to pass credentials on a request.

#### Basic Authentication
Once a user account has been created Basic Authentication can be used to make a request on behalf of the account. To create a Basic Authorzation Header the client must base64 encode a string with the username and password seporated by a colon. Then the encoded string can then be appened to the string `'Basic '` and set to an `Authorization` header on an HTTP Request.    

``` javascript
// Example of formating a Basic Authentication header in Javascript 
let username = 'slugbyte'
let password = 'abcd1234'

let encoded = window.btoa(`${username}:${password}`)
let headers = {
  Authorization: `Basic ${encoded}`
}
```

#### Bearer Authorization
After a successfull signup or login request the client will receive a token. Bearer Authorization uses that token to make a request on behalf of that user account. The token should be append to the string `'Bearer '` and set to an Authorization header on an HTTP Request.

``` javascript
// Example of formating a Bearer Authorization header in Javascript
let token = '11983261983261982643918649814613298619823698243'

let headers = {
  Authorization: `Beaer ${token}`
}
```

---


#### POST `/signup`
a HTTP POST request to /signup will create a new user account.

###### request 
* Expected Headers
  * Content-Type: application/json
* Request Body
  * JSON containing a username, email and password

``` json 
{
  "username": "slugbyte",
  "email": "slugbyte@slugbyte.com",
  "password": "abcd1234"
}
```

###### response
The response body will be a **bearer token**.

--- 

#### GET `/login`
A HTTP GET request to /login will login (fetch a token) to an existing user account.

###### request
* Expected Headers 
  * Basic Authorization for the user account

###### response 
The response body will be a **bearer token**.

## Profiles
#### POST `/profiles`
A HTTP POST request to /profiles will create a new profile. A Profile cannot be created until the User has created a profile.

###### request 
* Expected Headers
  * Bearer authorization
  * Content-Type: multipart/form-data
* Expected Body 
  * a `bio` field containing string with the users bio
  * a `image` filed with the users avatar image

###### response 
the response will be a JSON profile

---

#### GET `/profiles`
a HTTP GET request to /profiles will return an array of profiles
###### request 
* Optional Query Paramiters
  * SEE PAGINATION
  * SEE FUZZY SEARCH
    * username is the only searchble property

###### response
the response will be a JSON array of profiles

---

#### GET `/profiles/:id`
a HTTP GET request to /profiles/:id  will return a profile
###### response
the response will return a JSON profile 

---

#### PUT `/profiles/:id`
a HTTP PUT request to /profiles/:id will update a profile
###### request 
* Expected Headers
  * Bearer authorization
  * Content-Type: multipart/form-data
* Optional Body Fields
  * a `bio` field containing string with the users bio
  * a `image` filed with the users avatar image

###### response
the response will return a JSON profile 

---

#### DELETE `/profiles/:id`
a HTTP DELETE request to /profiles/:id will delete a profile
###### response
the response will have no body and a status of **204**

## Photos 
#### POST `/photos`
#### GET `/photos`
#### GET `/photos/:id`
#### PUT `/photos/:id`
#### DELETE `/photos/:id`

## Comments
#### POST `/comments`
#### GET `/comments`
#### GET `/comments/:id`
#### PUT `/comments/:id`
#### DELETE `/comments/:id`
