# SS Herbal India — Client API Reference

> **Base URL:** `http://localhost:5000/api/v1/client`  
> **Auth Required:** `Authorization: Bearer <token>` on all routes (except Auth endpoints)  
> **Content-Type:** `application/json`

---

## Overview

Client APIs are the customer-facing authenticated endpoints used by the SS Herbal storefront. They cover everything a logged-in shopper can do: manage their account, save addresses, maintain a wishlist, manage their cart, and place / track orders.

### API Route Groups

| Group | Mount Path | Auth |
|---|---|---|
| Auth | `/api/v1/client/auth` | Public (register/login), Protected (logout/change-password) |
| Profile | `/api/v1/client/profile` | Required |
| Addresses | `/api/v1/client/addresses` | Required |
| Wishlist | `/api/v1/client/wishlist` | Required |
| Cart | `/api/v1/client/cart` | Required |
| Orders | `/api/v1/client/orders` | Required |

---

## Standard Response Envelope

### Success
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error
```json
{
  "success": false,
  "statusCode": 401,
  "message": "Please login to access this resource",
  "errors": []
}
```

---

## Authentication Flow

```
POST /api/v1/client/auth/register  →  { token, refreshToken, user }
POST /api/v1/client/auth/login     →  { token, refreshToken, user }
                │
                ▼
  All protected requests:
  Authorization: Bearer <token>
                │
                ▼
  Token expires (24h) → POST /api/v1/client/auth/refresh-token
  Body: { refreshToken }  →  { token }
```

---

## Table of Contents

1. [Auth](#1-auth--apiv1clientauth)
2. [Profile](#2-profile--apiv1clientprofile)
3. [Addresses](#3-addresses--apiv1clientaddresses)
4. [Wishlist](#4-wishlist--apiv1clientwishlist)
5. [Cart](#5-cart--apiv1clientcart)
6. [Orders & Order Booking](#6-orders--apiv1clientorders)
7. [Error Codes Reference](#error-codes-reference)

---

## 1. Auth — `/api/v1/client/auth`

---

### `POST /api/v1/client/auth/register`
> Create a new customer account.

**Request Body:**
```json
{
  "firstName": "Priya",
  "lastName": "Sharma",
  "email": "priya.sharma@gmail.com",
  "phone": "9811000001",
  "password": "MySecure@123",
  "referralCode": "RAHUL001"
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `firstName` | string | Yes | |
| `lastName` | string | No | |
| `email` | string | Yes | Must be unique |
| `phone` | string | Yes | Must be unique |
| `password` | string | Yes | Min 6 chars |
| `referralCode` | string | No | Referrer's code |

**Response 201:**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Registration successful. Welcome to SS Herbal!",
  "data": {
    "user": {
      "_id": "5",
      "email": "priya.sharma@gmail.com",
      "phone": "9811000001",
      "firstName": "Priya",
      "lastName": "Sharma",
      "fullName": "Priya Sharma",
      "role": "customer",
      "emailVerified": false,
      "phoneVerified": false,
      "rewardPoints": 0,
      "tierLevel": "Bronze",
      "referralCode": "XYZ12345",
      "isActive": true,
      "isBanned": false,
      "createdAt": "2026-05-18T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
| Code | Message |
|---|---|
| 400 | First name, email, phone and password are required |
| 409 | Email is already registered |
| 409 | Phone number is already registered |

---

### `POST /api/v1/client/auth/login`
> Login with email and password.

**Request Body:**
```json
{
  "email": "priya.sharma@gmail.com",
  "password": "MySecure@123"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "5",
      "email": "priya.sharma@gmail.com",
      "firstName": "Priya",
      "lastName": "Sharma",
      "fullName": "Priya Sharma",
      "role": "customer",
      "rewardPoints": 150,
      "tierLevel": "Bronze",
      "lastLogin": "2026-05-18T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
| Code | Message |
|---|---|
| 400 | Email and password are required |
| 401 | Invalid email or password |
| 403 | Your account has been deactivated. Contact support. |
| 403 | Your account has been banned. Reason: ... |

---

### `POST /api/v1/client/auth/refresh-token`
> Get a new access token using a refresh token.

**Request Body:**
```json
{ "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
```

**Response 200:**
```json
{
  "success": true,
  "data": { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
  "message": "Token refreshed"
}
```

---

### `POST /api/v1/client/auth/forgot-password`
> Request a password reset email.

**Request Body:** `{ "email": "priya.sharma@gmail.com" }`

**Response 200:**
```json
{
  "success": true,
  "message": "If that email exists, a reset link has been sent",
  "data": null
}
```
> Always returns 200 to prevent email enumeration.

---

### `POST /api/v1/client/auth/reset-password/:token`
> Reset password using the token from the email link.

**Path Param:** `token` — reset token from email

**Request Body:** `{ "password": "NewSecure@456" }`

**Response 200:**
```json
{
  "success": true,
  "message": "Password reset successful",
  "data": {
    "user": { ... },
    "token": "...",
    "refreshToken": "..."
  }
}
```

**Error Responses:**
| Code | Message |
|---|---|
| 400 | Password must be at least 6 characters |
| 400 | Password reset token is invalid or has expired |

---

### `POST /api/v1/client/auth/logout`
> Logout — invalidates cookie (client must delete the JWT).

**Auth Required:** Yes

**Response 200:**
```json
{ "success": true, "message": "Logged out successfully", "data": null }
```

---

### `PUT /api/v1/client/auth/change-password`
> Change password while logged in.

**Auth Required:** Yes

**Request Body:**
```json
{
  "currentPassword": "MySecure@123",
  "newPassword": "NewSecure@456"
}
```

**Response 200:**
```json
{ "success": true, "message": "Password changed successfully", "data": null }
```

**Error Responses:**
| Code | Message |
|---|---|
| 400 | Current and new passwords are required |
| 400 | Current password is incorrect |
| 400 | New password must be at least 6 characters |

---

## 2. Profile — `/api/v1/client/profile`
> All routes require `Authorization: Bearer <token>`

---

### `GET /api/v1/client/profile`
> Fetch current user's profile.

**Response 200:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "5",
      "email": "priya.sharma@gmail.com",
      "phone": "9811000001",
      "firstName": "Priya",
      "lastName": "Sharma",
      "fullName": "Priya Sharma",
      "profileImage": null,
      "dateOfBirth": "1995-06-15",
      "gender": "female",
      "role": "customer",
      "emailVerified": true,
      "phoneVerified": false,
      "rewardPoints": 150,
      "tierLevel": "Bronze",
      "referralCode": "XYZ12345",
      "isActive": true,
      "orderCount": 3,
      "totalSpent": 897.00,
      "lastLogin": "2026-05-18T10:00:00.000Z",
      "createdAt": "2026-04-01T10:00:00.000Z"
    }
  },
  "message": "Profile fetched"
}
```

---

### `PUT /api/v1/client/profile`
> Update profile fields.

**Request Body (all optional):**
```json
{
  "firstName": "Priya",
  "lastName": "Sharma",
  "phone": "9811000002",
  "dateOfBirth": "1995-06-15",
  "gender": "female",
  "profileImage": "https://cdn.ssherbal.in/avatars/user5.jpg"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": { "user": { ... } }
}
```

---

### `GET /api/v1/client/profile/reward-points`
> Fetch reward points balance and tier.

**Response 200:**
```json
{
  "success": true,
  "data": {
    "rewardPoints": 150,
    "tierLevel": "Bronze",
    "referralCode": "XYZ12345"
  },
  "message": "Reward points fetched"
}
```

---

### `DELETE /api/v1/client/profile`
> Soft-deactivate the account.

**Response 200:**
```json
{ "success": true, "message": "Account deactivated. Contact support to restore.", "data": null }
```

---

## 3. Addresses — `/api/v1/client/addresses`
> All routes require `Authorization: Bearer <token>`

---

### `GET /api/v1/client/addresses`
> Fetch all saved addresses. Default address appears first.

**Response 200:**
```json
{
  "success": true,
  "data": {
    "addresses": [
      {
        "_id": "1",
        "label": "Home",
        "type": "both",
        "fullName": "Priya Sharma",
        "phone": "9811000001",
        "addressLine1": "100 MG Road",
        "addressLine2": "Flat 4B",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400001",
        "country": "India",
        "isDefault": true,
        "createdAt": "2026-04-10T10:00:00.000Z"
      }
    ]
  },
  "message": "Addresses fetched"
}
```

---

### `POST /api/v1/client/addresses`
> Add a new saved address.

**Request Body:**
```json
{
  "label": "Home",
  "type": "both",
  "fullName": "Priya Sharma",
  "phone": "9811000001",
  "addressLine1": "100 MG Road",
  "addressLine2": "Flat 4B",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "country": "India",
  "isDefault": true
}
```

| Field | Type | Required |
|---|---|---|
| `fullName` | string | Yes |
| `phone` | string | Yes |
| `addressLine1` | string | Yes |
| `city` | string | Yes |
| `state` | string | Yes |
| `pincode` | string | Yes |
| `label` | string | No — default `"Home"` |
| `type` | string | No — `shipping`\|`billing`\|`both` |
| `addressLine2` | string | No |
| `country` | string | No — default `"India"` |
| `isDefault` | boolean | No |

**Response 201:**
```json
{
  "success": true,
  "message": "Address added successfully",
  "data": { "address": { ...Address } }
}
```

---

### `PUT /api/v1/client/addresses/:id`
> Update a saved address.

**Request Body:** Same fields as POST (all optional).

**Response 200:**
```json
{
  "success": true,
  "message": "Address updated successfully",
  "data": { "address": { ...Address } }
}
```

---

### `PATCH /api/v1/client/addresses/:id/set-default`
> Set an address as the default shipping address.

**Response 200:**
```json
{
  "success": true,
  "message": "Default address updated",
  "data": { "address": { "_id": "2", "isDefault": true, ... } }
}
```

---

### `DELETE /api/v1/client/addresses/:id`
> Delete a saved address. Automatically assigns next address as default if deleted address was the default.

**Response 200:**
```json
{ "success": true, "message": "Address deleted successfully", "data": null }
```

---

## 4. Wishlist — `/api/v1/client/wishlist`
> All routes require `Authorization: Bearer <token>`

---

### `GET /api/v1/client/wishlist`
> Fetch all wishlist items with product details.

**Response 200:**
```json
{
  "success": true,
  "data": {
    "wishlist": [
      {
        "_id": "1",
        "productId": "3",
        "product": {
          "_id": "3",
          "name": "Bhringraj Hair Oil",
          "slug": "bhringraj-hair-oil",
          "isActive": true,
          "images": [{ "url": "https://cdn.ssherbal.in/products/bhringraj.jpg", "alt": "Bhringraj Hair Oil" }]
        },
        "addedAt": "2026-05-10T10:00:00.000Z"
      }
    ],
    "total": 1
  },
  "message": "Wishlist fetched"
}
```

---

### `POST /api/v1/client/wishlist`
> Add a product to the wishlist.

**Request Body:** `{ "productId": "3" }`

**Response 201:**
```json
{
  "success": true,
  "message": "Added to wishlist",
  "data": { "item": { "_id": "1", "productId": "3", "addedAt": "..." } }
}
```

**Response 200 (already in wishlist):**
```json
{ "success": true, "message": "Product already in wishlist", "data": { "item": { ... } } }
```

---

### `POST /api/v1/client/wishlist/toggle`
> Toggle a product in/out of the wishlist.

**Request Body:** `{ "productId": "3" }`

**Response 200:**
```json
{ "success": true, "data": { "inWishlist": true }, "message": "Added to wishlist" }
```
or
```json
{ "success": true, "data": { "inWishlist": false }, "message": "Removed from wishlist" }
```

---

### `GET /api/v1/client/wishlist/check/:productId`
> Check if a product is in the wishlist (for UI heart icon).

**Response 200:**
```json
{ "success": true, "data": { "inWishlist": true }, "message": "Wishlist status" }
```

---

### `DELETE /api/v1/client/wishlist/:id`
> Remove a wishlist item by its ID.

**Response 200:**
```json
{ "success": true, "message": "Removed from wishlist", "data": null }
```

---

## 5. Cart — `/api/v1/client/cart`
> All routes require `Authorization: Bearer <token>`

### Cart Object Shape
```json
{
  "_id": "1",
  "items": [
    {
      "_id": "1",
      "productId": "1",
      "variantId": "1",
      "product": {
        "_id": "1",
        "name": "Turmeric Glow Face Wash",
        "slug": "turmeric-glow-face-wash",
        "images": [{ "url": "https://...", "alt": "..." }]
      },
      "variant": {
        "_id": "1",
        "name": "100ml",
        "sku": "SSH-FC-001-100",
        "price": 299,
        "stock": 100
      },
      "quantity": 2,
      "price": 299.00,
      "subtotal": 598.00,
      "addedAt": "2026-05-18T10:00:00.000Z"
    }
  ],
  "coupon": {
    "code": "WELCOME10",
    "discount": 59.80
  },
  "summary": {
    "subtotal": 598.00,
    "couponDiscount": 59.80,
    "shippingCost": 0,
    "total": 538.20,
    "itemCount": 2
  },
  "updatedAt": "2026-05-18T10:00:00.000Z"
}
```

---

### `GET /api/v1/client/cart`
> Fetch current cart with full product details and summary.

**Response 200:**
```json
{
  "success": true,
  "data": { "cart": { ...Cart object } },
  "message": "Cart fetched"
}
```

---

### `POST /api/v1/client/cart/items`
> Add a product (or variant) to the cart. If the item already exists, quantity is incremented.

**Request Body:**
```json
{
  "productId": "1",
  "variantId": "1",
  "quantity": 2
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `productId` | string | Yes | |
| `variantId` | string | No | Omit for base product |
| `quantity` | number | No | Default `1` |

**Response 200:**
```json
{
  "success": true,
  "message": "Item added to cart",
  "data": { "cart": { ...Cart object } }
}
```

**Error Responses:**
| Code | Message |
|---|---|
| 400 | productId is required |
| 400 | Insufficient stock for selected variant |
| 404 | Product not found |
| 404 | Product variant not found |

---

### `PUT /api/v1/client/cart/items/:itemId`
> Update quantity of a cart item. Set quantity to `0` to remove.

**Request Body:** `{ "quantity": 3 }`

**Response 200:**
```json
{
  "success": true,
  "message": "Cart updated",
  "data": { "cart": { ...Cart object } }
}
```

---

### `DELETE /api/v1/client/cart/items/:itemId`
> Remove a specific item from the cart.

**Response 200:**
```json
{
  "success": true,
  "message": "Item removed from cart",
  "data": { "cart": { ...Cart object } }
}
```

---

### `DELETE /api/v1/client/cart`
> Clear all items and remove any applied coupon.

**Response 200:**
```json
{ "success": true, "message": "Cart cleared", "data": null }
```

---

### `POST /api/v1/client/cart/coupon`
> Apply a coupon code to the cart.

**Request Body:** `{ "code": "WELCOME10" }`

**Response 200:**
```json
{
  "success": true,
  "message": "Coupon applied! You save ₹59.80",
  "data": { "cart": { ...Cart object with updated summary } }
}
```

**Error Responses:**
| Code | Message |
|---|---|
| 400 | Coupon code is required |
| 400 | Invalid or expired coupon |
| 400 | Coupon usage limit has been reached |
| 400 | Minimum order value for this coupon is ₹499 |
| 400 | Cart is empty |

---

### `DELETE /api/v1/client/cart/coupon`
> Remove the applied coupon from the cart.

**Response 200:**
```json
{
  "success": true,
  "message": "Coupon removed",
  "data": { "cart": { ...Cart object with discount reset to 0 } }
}
```

---

## 6. Orders — `/api/v1/client/orders`
> All routes require `Authorization: Bearer <token>`

### Order Booking Flow

```
1. Build cart
   POST /api/v1/client/cart/items
        │
        ▼
2. (Optional) Apply coupon
   POST /api/v1/client/cart/coupon
        │
        ▼
3. Place order
   POST /api/v1/client/orders
   { paymentMethod, shippingAddressId | shippingAddress }
        │
        ├── COD → Order confirmed immediately (status: "pending")
        │
        └── Razorpay → Gets razorpayOrder stub
                │
                ▼
4. Complete Razorpay payment on frontend
   (use razorpayOrder.amountInPaise, orderNumber)
        │
        ▼
5. Verify payment
   POST /api/v1/client/orders/:id/payment/verify
   { razorpayOrderId, razorpayPaymentId, razorpaySignature }
        │
        ▼
6. Order status → "confirmed", reward points credited
```

---

### `POST /api/v1/client/orders`
> Place a new order from the current cart. Validates stock, creates order, decrements inventory, clears cart.

**Request Body:**
```json
{
  "paymentMethod": "razorpay",
  "shippingAddressId": "1",
  "useRewardPoints": false
}
```

**Or with inline address (no saved address):**
```json
{
  "paymentMethod": "cod",
  "shippingAddress": {
    "fullName": "Priya Sharma",
    "phone": "9811000001",
    "addressLine1": "100 MG Road",
    "addressLine2": "Flat 4B",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "country": "India"
  },
  "billingAddress": null,
  "useRewardPoints": true
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `paymentMethod` | string | Yes | `razorpay` \| `cod` \| `upi` \| `netbanking` |
| `shippingAddressId` | string | No* | ID of saved address |
| `shippingAddress` | object | No* | Inline address object |
| `billingAddress` | object | No | Defaults to shipping if omitted |
| `useRewardPoints` | boolean | No | Use up to 10% of order value |

> *One of `shippingAddressId`, `shippingAddress`, or a saved default address is required.

**Response 201:**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Order placed successfully",
  "data": {
    "order": {
      "_id": "5",
      "orderNumber": "ORD-2026051834521",
      "status": "pending",
      "paymentStatus": "pending",
      "summary": {
        "subtotal": 598.00,
        "discount": 59.80,
        "shippingCost": 0,
        "tax": 0,
        "total": 538.20,
        "rewardPointsEarned": 5,
        "rewardPointsUsed": 0
      },
      "shippingAddress": {
        "fullName": "Priya Sharma",
        "phone": "9811000001",
        "addressLine1": "100 MG Road",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400001",
        "country": "India"
      },
      "payment": {
        "method": "razorpay",
        "status": "pending"
      },
      "items": [
        {
          "_id": "1",
          "product": "1",
          "name": "Turmeric Glow Face Wash",
          "sku": "SSH-FC-001-100",
          "quantity": 2,
          "price": 299.00,
          "subtotal": 598.00,
          "image": "https://cdn.ssherbal.in/products/img1.jpg"
        }
      ],
      "timeline": [
        {
          "status": "pending",
          "message": "Order placed successfully",
          "updatedBy": "customer",
          "timestamp": "2026-05-18T10:00:00.000Z"
        }
      ],
      "createdAt": "2026-05-18T10:00:00.000Z"
    },
    "razorpayOrder": {
      "note": "Integrate Razorpay SDK",
      "orderNumber": "ORD-2026051834521",
      "amountInPaise": 53820
    },
    "rewardPointsEarned": 5
  }
}
```

> For **COD orders**, `razorpayOrder` is `null`.

**Error Responses:**
| Code | Message |
|---|---|
| 400 | paymentMethod is required |
| 400 | Cart is empty |
| 400 | Insufficient stock for "Product Name". Available: 2 |
| 400 | Product "X" is no longer available |
| 400 | shippingAddress must include: fullName, phone, addressLine1, city, state, pincode |
| 404 | Saved address not found |

---

### `POST /api/v1/client/orders/:id/payment/verify`
> Verify Razorpay payment signature after frontend checkout. Updates order to "confirmed" and credits reward points.

**Request Body:**
```json
{
  "razorpayOrderId": "order_ABC123xyz",
  "razorpayPaymentId": "pay_XYZ789abc",
  "razorpaySignature": "a3f5b2c8d9e0f1a2b3c4d5e6f7a8b9c0..."
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Payment verified. Order confirmed!",
  "data": {
    "order": {
      "_id": "5",
      "orderNumber": "ORD-2026051834521",
      "status": "confirmed",
      "paymentStatus": "paid",
      "payment": {
        "method": "razorpay",
        "status": "paid",
        "transactionId": "pay_XYZ789abc",
        "razorpayOrderId": "order_ABC123xyz",
        "razorpayPaymentId": "pay_XYZ789abc",
        "paidAt": "2026-05-18T10:05:00.000Z"
      },
      "timeline": [
        { "status": "pending",   "message": "Order placed successfully",       "timestamp": "..." },
        { "status": "confirmed", "message": "Payment received. Order confirmed.", "timestamp": "..." }
      ]
    }
  }
}
```

**Error Responses:**
| Code | Message |
|---|---|
| 400 | razorpayOrderId, razorpayPaymentId and razorpaySignature are required |
| 400 | Payment verification failed: invalid signature |
| 404 | Order not found |

---

### `GET /api/v1/client/orders`
> List all orders for the current customer.

**Query Parameters:**

| Param | Type | Default | Description |
|---|---|---|---|
| `page` | number | `1` | Page number |
| `limit` | number | `10` | Items per page (max 50) |
| `status` | string | — | Filter: `pending` \| `confirmed` \| `processing` \| `shipped` \| `delivered` \| `cancelled` |

**Response 200:**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "_id": "1",
        "orderNumber": "ORD-2026051834521",
        "status": "delivered",
        "paymentStatus": "paid",
        "summary": {
          "subtotal": 299.00,
          "discount": 0,
          "shippingCost": 0,
          "total": 299.00
        },
        "items": [
          { "name": "Turmeric Glow Face Wash", "quantity": 1, "price": 299.00, "subtotal": 299.00 }
        ],
        "timeline": [
          { "status": "delivered", "message": "Order delivered", "timestamp": "..." }
        ],
        "createdAt": "2026-05-01T10:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalOrders": 3,
      "limit": 10
    }
  }
}
```

---

### `GET /api/v1/client/orders/:id`
> Fetch full details of a single order.

**Response 200:**
```json
{
  "success": true,
  "data": {
    "order": {
      "_id": "1",
      "orderNumber": "ORD-2026051834521",
      "status": "delivered",
      "paymentStatus": "paid",
      "summary": {
        "subtotal": 299.00,
        "discount": 0,
        "shippingCost": 0,
        "tax": 0,
        "total": 299.00,
        "rewardPointsEarned": 3,
        "rewardPointsUsed": 0
      },
      "coupon": null,
      "shippingAddress": {
        "fullName": "Priya Sharma",
        "phone": "9811000001",
        "addressLine1": "100 MG Road",
        "addressLine2": null,
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400001",
        "country": "India"
      },
      "billingAddress": { ... },
      "payment": {
        "method": "razorpay",
        "status": "paid",
        "transactionId": "pay_XYZ789abc",
        "paidAt": "2026-05-01T10:05:00.000Z"
      },
      "tracking": {
        "trackingNumber": "BD123456789",
        "carrier": "BlueDart",
        "currentStatus": "Delivered",
        "shippedAt": "2026-05-03T10:00:00.000Z",
        "deliveredAt": "2026-05-05T14:30:00.000Z",
        "estimatedDelivery": "2026-05-06T00:00:00.000Z"
      },
      "items": [
        {
          "_id": "1",
          "product": "1",
          "name": "Turmeric Glow Face Wash",
          "sku": "SSH-FC-001",
          "quantity": 1,
          "price": 299.00,
          "subtotal": 299.00,
          "image": "https://cdn.ssherbal.in/products/img1.jpg"
        }
      ],
      "timeline": [
        { "status": "pending",    "message": "Order placed successfully",       "updatedBy": "customer", "timestamp": "2026-05-01T10:00:00.000Z" },
        { "status": "confirmed",  "message": "Payment received. Order confirmed.", "updatedBy": "system",   "timestamp": "2026-05-01T10:05:00.000Z" },
        { "status": "processing", "message": "Order is being packed",            "updatedBy": "admin",    "timestamp": "2026-05-02T09:00:00.000Z" },
        { "status": "shipped",    "message": "Order shipped via BlueDart",       "updatedBy": "admin",    "timestamp": "2026-05-03T10:00:00.000Z" },
        { "status": "delivered",  "message": "Order delivered successfully",     "updatedBy": "system",   "timestamp": "2026-05-05T14:30:00.000Z" }
      ],
      "createdAt": "2026-05-01T10:00:00.000Z",
      "updatedAt": "2026-05-05T14:30:00.000Z"
    }
  },
  "message": "Order fetched"
}
```

---

### `GET /api/v1/client/orders/track/:orderNumber`
> Track an order by its order number (shows timeline only).

**Response 200:**
```json
{
  "success": true,
  "data": {
    "orderNumber": "ORD-2026051834521",
    "status": "shipped",
    "tracking": {
      "trackingNumber": "BD123456789",
      "carrier": "BlueDart",
      "currentStatus": "In Transit",
      "shippedAt": "2026-05-03T10:00:00.000Z",
      "estimatedDelivery": "2026-05-06T00:00:00.000Z"
    },
    "timeline": [
      { "status": "pending",    "message": "Order placed",         "timestamp": "..." },
      { "status": "confirmed",  "message": "Payment confirmed",    "timestamp": "..." },
      { "status": "processing", "message": "Being packed",         "timestamp": "..." },
      { "status": "shipped",    "message": "Shipped via BlueDart", "timestamp": "..." }
    ],
    "estimatedDelivery": "2026-05-06T00:00:00.000Z",
    "updatedAt": "2026-05-03T10:00:00.000Z"
  },
  "message": "Order tracking info"
}
```

---

### `POST /api/v1/client/orders/:id/cancel`
> Cancel an order. Only `pending` or `confirmed` orders can be cancelled.  
> Stock is restored and reward points used are refunded.

**Request Body:** `{ "reason": "Ordered by mistake" }`

**Response 200:**
```json
{
  "success": true,
  "message": "Order cancelled successfully",
  "data": {
    "order": {
      "_id": "5",
      "orderNumber": "ORD-2026051834521",
      "status": "cancelled",
      "cancellation": {
        "reason": "Ordered by mistake",
        "cancelledAt": "2026-05-18T11:00:00.000Z",
        "cancelledBy": "customer",
        "refundAmount": 538.20,
        "refundStatus": "pending"
      },
      "timeline": [
        { "status": "cancelled", "message": "Order cancelled by customer. Reason: Ordered by mistake", "timestamp": "..." }
      ]
    }
  }
}
```

**Error Responses:**
| Code | Message |
|---|---|
| 400 | Order cannot be cancelled at status: "shipped" |
| 404 | Order not found |

---

## Error Codes Reference

| Status | Meaning | Common Cause |
|---|---|---|
| 200 | OK | Successful operation |
| 201 | Created | Resource created (register, add address, place order) |
| 400 | Bad Request | Missing fields, validation failure, business rule violation |
| 401 | Unauthorized | No JWT token or invalid/expired token |
| 403 | Forbidden | Account banned or deactivated |
| 404 | Not Found | Address/Order/Product not found or belongs to another user |
| 409 | Conflict | Email/phone already registered |
| 429 | Too Many Requests | Rate limit: 100 req / 15 min per IP |
| 500 | Internal Server Error | Unexpected server error |

---

## Full Checkout Integration Example

```javascript
// 1. Login
const loginRes = await fetch('/api/v1/client/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'priya@gmail.com', password: 'MySecure@123' })
});
const { data: { token } } = await loginRes.json();

const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

// 2. Add to cart
await fetch('/api/v1/client/cart/items', {
  method: 'POST', headers,
  body: JSON.stringify({ productId: '1', variantId: '1', quantity: 2 })
});

// 3. Apply coupon
await fetch('/api/v1/client/cart/coupon', {
  method: 'POST', headers,
  body: JSON.stringify({ code: 'WELCOME10' })
});

// 4. Place order (Razorpay)
const orderRes = await fetch('/api/v1/client/orders', {
  method: 'POST', headers,
  body: JSON.stringify({ paymentMethod: 'razorpay', shippingAddressId: '1' })
});
const { data: { order, razorpayOrder } } = await orderRes.json();

// 5. Open Razorpay checkout (frontend SDK)
const rzp = new Razorpay({
  key: RAZORPAY_KEY_ID,
  amount: razorpayOrder.amountInPaise,
  currency: 'INR',
  name: 'SS Herbal India',
  order_id: razorpayOrder.razorpayOrderId,
  handler: async (response) => {
    // 6. Verify payment
    await fetch(`/api/v1/client/orders/${order._id}/payment/verify`, {
      method: 'POST', headers,
      body: JSON.stringify({
        razorpayOrderId:   response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature
      })
    });
    // Order is now confirmed!
  }
});
rzp.open();
```

---

*SS Herbal India | Client API v1 | Last updated: May 18, 2026*
