# Backend API

The backend of FoodSelector has been written using ExpressJS and NodeJS. It uses MongoDB as a database and DigitalOcean Spaces as an image store.

There are different routes provided, with different levels of accessibility depending on the user's authorization.


## Public Routes

The following routes are publicly available

#### `POST /api/login`
 - Login for existing users 
 - Content-type = application/json 
 - Parameters:
	 - **email**: email-address
	 - **password**: password

#### `POST /api/register`
 - Registration for new users
 - Content-type = application/json 
 - Parameters:
	 - **email**: email-address
	 - **password**: password
	 - **password2**: confirm-password

### Authenticated Routes

The following routes are restricted to existing users

### `POST /api/data/current-results`
 - Searches for items from specified parameters
 - Content-type = application/json 
 - Parameters:
	 - **searchparams**: *object* containing parameters to search for


### `GET /api/data/view-all`
 - Displays all items
 - Content-type = application/json


## Administrator Routes

The following routes are restricted to site administrators

#### `PUT /api/admin/upload`
 - Uploads a single new item
 - Content-type = application/x-www-form-urlencoded
  - Parameters:
	 - **image**: *.jpg file* containing image to upload
	 - **name**: item name for reference
	 - **disp_name**: display name
	 - **desc**: description
	 - **prop**: *object* containing properties of an item

#### `DELETE /api/admin/delete`
 - Deletes a single item
 - Content-type = application/json
  - Parameters:
	 - **name**: item name for reference

#### `PUT /api/admin/create-user`
 - Creates a new user
 - Content-type = application/json
  - Parameters:
	 - **email**: email-address
	 - **password**: password

#### `DELETE /api/admin/delete-user`
 - Removes a user
 - Content-type = application/json
  - Parameters:
	 - **email**: email-address

#### `GET /api/admin/find-user`
 - Finds a user
 - Content-type = application/json
  - Parameters:
	 - **email**: email-address
