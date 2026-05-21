# SS Herbal India — Public API Reference

> **Base URL:** `http://localhost:5000/api/v1`  
> **Auth Required:** None (all endpoints are open)  
> **Content-Type:** `application/json`

---

## Overview

Public APIs are read-only endpoints consumed by the storefront (website / mobile app). No login is required. The only exception is **submitting a review**, which requires a customer JWT token.

---

## Standard Response Envelope

### Success
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": { ... }
}
```

### Error
```json
{
  "success": false,
  "statusCode": 404,
  "message": "Product not found",
  "errors": []
}
```

---

## Table of Contents

1. [Status Check](#1-status-check)
2. [Products](#2-products)
3. [Blogs](#3-blogs)
4. [Reviews](#4-reviews)
5. [Testimonials](#5-testimonials)
6. [Hero Banners](#6-hero-banners)
7. [Landing Pages](#7-landing-pages)

---

## 1. Status Check

### `GET /api/v1/status`

**Response 200:**
```json
{
  "success": true,
  "message": "SS Herbal API is running",
  "version": "v1",
  "timestamp": "2026-05-18T10:00:00.000Z"
}
```

---

## 2. Products

**Base path:** `/api/v1/products`

---

### `GET /api/v1/products`
> Browse & filter all active products.

**Query Parameters:**

| Param | Type | Default | Description |
|---|---|---|---|
| `page` | number | `1` | Page number |
| `limit` | number | `20` | Items per page (max 50) |
| `sortBy` | string | `createdAt` | `createdAt` \| `pricing.sellingPrice` \| `metrics.averageRating` \| `metrics.sales` |
| `sortOrder` | string | `desc` | `asc` \| `desc` |
| `search` | string | — | Full-text search in name and description |
| `category` | string | — | Filter by category slug (e.g. `face-care`) |
| `minPrice` | number | — | Minimum selling price |
| `maxPrice` | number | — | Maximum selling price |
| `isFeatured` | boolean | — | `true` → featured products only |
| `isBestSeller` | boolean | — | `true` → best-selling only |
| `isNew` | boolean | — | `true` → new arrivals only |

**Example Request:**
```
GET /api/v1/products?category=face-care&sortBy=pricing.sellingPrice&sortOrder=asc&limit=12
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "_id": "1",
        "sku": "SSH-FC-001",
        "name": "Turmeric Glow Face Wash",
        "slug": "turmeric-glow-face-wash",
        "shortDescription": "Brightening face wash with turmeric & neem.",
        "isActive": true,
        "isFeatured": true,
        "isBestSeller": true,
        "isNew": false,
        "category": {
          "_id": "1",
          "name": "Face Care",
          "slug": "face-care"
        },
        "pricing": {
          "mrp": 399,
          "sellingPrice": 299,
          "discount": 25
        },
        "inventory": {
          "stock": 150
        },
        "metrics": {
          "averageRating": 4.5,
          "totalReviews": 42
        },
        "images": [
          {
            "url": "https://cdn.ssherbal.in/products/turmeric-face-wash.jpg",
            "alt": "Turmeric Glow Face Wash",
            "displayOrder": 1
          }
        ],
        "tags": ["turmeric", "face wash", "brightening"],
        "createdAt": "2026-05-01T10:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalProducts": 47,
      "limit": 20
    }
  }
}
```

---

### `GET /api/v1/products/featured`
> Fetch featured products for homepage carousel.

**Query:** `limit` (default `12`)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "products": [ ...Product objects ]
  }
}
```

---

### `GET /api/v1/products/best-sellers`
> Fetch best-selling products.

**Query:** `limit` (default `12`)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "products": [ ...Product objects ]
  }
}
```

---

### `GET /api/v1/products/new-launches`
> Fetch newly launched products.

**Query:** `limit` (default `12`)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "products": [ ...Product objects ]
  }
}
```

---

### `GET /api/v1/products/by-category/:slug`
> Fetch all products in a specific category.

**Path Param:** `slug` — category slug (e.g. `hair-care`)

**Query:** `page` · `limit` (default `20`) · `sortBy` · `sortOrder`

**Response 200:**
```json
{
  "success": true,
  "data": {
    "products": [ ...Product objects ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalProducts": 18
    }
  }
}
```

---

### `GET /api/v1/products/:slug`
> Full product detail page data. Increments view counter.

**Path Param:** `slug` — product slug (or numeric `id`)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "product": {
      "_id": "1",
      "sku": "SSH-FC-001",
      "name": "Turmeric Glow Face Wash",
      "slug": "turmeric-glow-face-wash",
      "shortDescription": "Brightening face wash with turmeric & neem.",
      "longDescription": "<h2>Why Turmeric?</h2><p>...</p>",
      "isActive": true,
      "isFeatured": true,
      "isBestSeller": true,
      "isNew": false,
      "category": {
        "_id": "1",
        "name": "Face Care",
        "slug": "face-care"
      },
      "pricing": {
        "mrp": 399,
        "sellingPrice": 299,
        "discount": 25,
        "costPrice": null
      },
      "inventory": {
        "stock": 150,
        "lowStockThreshold": 10,
        "trackInventory": true,
        "allowBackorders": false
      },
      "metrics": {
        "averageRating": 4.5,
        "totalReviews": 42,
        "views": 1241,
        "sales": 320
      },
      "images": [
        { "url": "https://cdn.ssherbal.in/products/img1.jpg", "alt": "Product front", "displayOrder": 1 },
        { "url": "https://cdn.ssherbal.in/products/img2.jpg", "alt": "Product back",  "displayOrder": 2 }
      ],
      "variants": [
        {
          "_id": "1",
          "name": "100ml",
          "sku": "SSH-FC-001-100",
          "price": 299,
          "stock": 100,
          "attributes": { "quantity": "100ml" }
        },
        {
          "_id": "2",
          "name": "200ml",
          "sku": "SSH-FC-001-200",
          "price": 549,
          "stock": 50,
          "attributes": { "quantity": "200ml" }
        }
      ],
      "tags": ["turmeric", "face wash", "brightening"],
      "benefits": ["Brightens complexion", "Removes excess oil", "Fights acne"],
      "concerns": ["Dull skin", "Oily skin", "Acne-prone"],
      "ingredients": ["Turmeric Extract", "Neem Leaf Extract", "Aloe Vera"],
      "seo": {
        "metaTitle": "Turmeric Glow Face Wash | SS Herbal India",
        "metaDescription": "Natural brightening face wash with turmeric and neem."
      },
      "createdAt": "2026-05-01T10:00:00.000Z",
      "updatedAt": "2026-05-18T10:00:00.000Z"
    },
    "reviews": [
      {
        "_id": "1",
        "rating": 5,
        "title": "Absolutely love this!",
        "comment": "Skin is visibly brighter in 2 weeks.",
        "verified": true,
        "helpfulCount": 12,
        "user": {
          "firstName": "Priya",
          "lastName": "S.",
          "profileImage": null
        },
        "createdAt": "2026-04-10T10:00:00.000Z"
      }
    ],
    "testimonials": [
      {
        "_id": "2",
        "videoUrl": "https://www.youtube.com/watch?v=xxx",
        "isActive": true
      }
    ],
    "relatedProducts": [
      {
        "_id": "3",
        "name": "Neem Face Scrub",
        "slug": "neem-face-scrub",
        "pricing": { "sellingPrice": 249, "mrp": 299, "discount": 17 },
        "images": [{ "url": "https://..." }]
      }
    ]
  }
}
```

**Error Responses:**
| Code | Message |
|---|---|
| 404 | Product not found |

---

## 3. Blogs

**Base path:** `/api/v1/blogs`  
Only `status: "published"` blogs are returned.

---

### `GET /api/v1/blogs`
> Paginated list of published blog posts.

**Query Parameters:**

| Param | Type | Description |
|---|---|---|
| `page` | number | Default `1` |
| `limit` | number | Default `12` |
| `category` | string | Filter by category name |
| `tag` | string | Filter by tag |
| `search` | string | Search in title and excerpt |
| `featured` | boolean | `true` → featured blogs only |
| `newLaunch` | boolean | `true` → new launch blogs only |

**Response 200:**
```json
{
  "success": true,
  "data": {
    "blogs": [
      {
        "_id": "1",
        "title": "7 Benefits of Turmeric for Your Skin",
        "slug": "7-benefits-of-turmeric-for-your-skin",
        "excerpt": "Discover how this golden spice transforms your skincare routine.",
        "category": "Skincare",
        "authorName": "SS Herbal Editorial",
        "status": "published",
        "isFeatured": true,
        "isNewLaunch": false,
        "publishedAt": "2026-04-01T00:00:00.000Z",
        "tags": ["turmeric", "skincare", "ayurveda"],
        "coverImage": {
          "url": "https://cdn.ssherbal.in/blogs/turmeric-benefits.jpg",
          "alt": "Turmeric benefits for skin"
        },
        "metrics": { "views": 1240 },
        "createdAt": "2026-03-28T10:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalBlogs": 4,
      "limit": 12
    }
  }
}
```

---

### `GET /api/v1/blogs/featured`
> Fetch featured blogs for homepage section.

**Query:** `limit` (default `4`)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "blogs": [ ...Blog list objects ]
  }
}
```

---

### `GET /api/v1/blogs/new-launches`
> Fetch newly published / new-launch-tagged blogs.

**Query:** `limit` (default `6`)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "blogs": [ ...Blog list objects ]
  }
}
```

---

### `GET /api/v1/blogs/:slug`
> Full blog article. Increments view counter.

**Response 200:**
```json
{
  "success": true,
  "data": {
    "blog": {
      "_id": "1",
      "title": "7 Benefits of Turmeric for Your Skin",
      "slug": "7-benefits-of-turmeric-for-your-skin",
      "excerpt": "Discover how this golden spice transforms your skincare routine.",
      "content": "<h2>Why Turmeric?</h2><p>Turmeric has been used in Ayurvedic medicine...</p>",
      "category": "Skincare",
      "authorName": "SS Herbal Editorial",
      "status": "published",
      "isFeatured": true,
      "publishedAt": "2026-04-01T00:00:00.000Z",
      "coverImage": {
        "url": "https://cdn.ssherbal.in/blogs/turmeric-benefits.jpg",
        "alt": "Turmeric benefits"
      },
      "seo": {
        "metaTitle": "7 Science-Backed Turmeric Skin Benefits | SS Herbal",
        "metaDescription": "Learn how turmeric brightens, heals and protects your skin naturally."
      },
      "tags": ["turmeric", "skincare", "ayurveda"],
      "metrics": { "views": 1241, "likes": 0, "shares": 0 },
      "createdAt": "2026-03-28T10:00:00.000Z"
    },
    "relatedBlogs": [
      {
        "_id": "2",
        "title": "Neem — Nature's Antibiotic for Skin",
        "slug": "neem-natures-antibiotic-for-skin",
        "excerpt": "From pimples to pigmentation...",
        "publishedAt": "2026-04-15T00:00:00.000Z"
      }
    ]
  }
}
```

**Error Responses:**
| Code | Message |
|---|---|
| 404 | Blog not found |

---

## 4. Reviews

**Base path:** `/api/v1/reviews`

---

### `GET /api/v1/reviews/product/:productId`
> Paginated list of **approved** reviews for a product.

**Path Param:** `productId` — numeric product ID

**Query Parameters:**

| Param | Type | Default | Description |
|---|---|---|---|
| `page` | number | `1` | Page number |
| `limit` | number | `10` | Items per page |
| `sortBy` | string | `createdAt` | `createdAt` \| `rating` \| `helpfulCount` |
| `sortOrder` | string | `desc` | `asc` \| `desc` |

**Response 200:**
```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "_id": "1",
        "rating": 5,
        "title": "Absolutely love this!",
        "comment": "Been using this for 2 months and the results are incredible.",
        "verified": true,
        "helpfulCount": 12,
        "images": [],
        "user": {
          "firstName": "Priya",
          "lastName": "S.",
          "profileImage": null
        },
        "createdAt": "2026-04-10T10:00:00.000Z"
      }
    ],
    "ratingSummary": [
      { "rating": 5, "count": 22 },
      { "rating": 4, "count": 14 },
      { "rating": 3, "count": 4 },
      { "rating": 2, "count": 1 },
      { "rating": 1, "count": 1 }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalReviews": 42
    }
  }
}
```

---

### `POST /api/v1/reviews`
> Submit a product review.

**Auth Required:** `Authorization: Bearer <customer_token>`

**Request Body:**
```json
{
  "productId": "1",
  "rating": 5,
  "title": "Best face wash ever",
  "comment": "Amazing product! Skin is visibly brighter in 2 weeks.",
  "images": [],
  "orderId": "1"
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `productId` | string | Yes | |
| `rating` | number | Yes | 1 – 5 |
| `comment` | string | Yes | |
| `title` | string | No | Short review heading |
| `images` | array | No | Array of image URLs |
| `orderId` | string | No | If provided, review is marked as `verified` |

**Response 201:**
```json
{
  "success": true,
  "message": "Review submitted successfully. It will be visible after admin approval.",
  "data": {
    "_id": "15",
    "rating": 5,
    "title": "Best face wash ever",
    "comment": "Amazing product! Skin is visibly brighter in 2 weeks.",
    "verified": true,
    "status": "pending",
    "helpfulCount": 0,
    "createdAt": "2026-05-18T10:00:00.000Z"
  }
}
```

**Error Responses:**
| Code | Message |
|---|---|
| 400 | Product ID, rating, and comment are required |
| 401 | Please login to access this resource |
| 404 | Product not found |
| 409 | You have already reviewed this product |

---

### `POST /api/v1/reviews/:id/helpful`
> Mark a review as helpful (no auth required).

**Response 200:**
```json
{
  "success": true,
  "message": "Marked as helpful"
}
```

---

## 5. Testimonials

**Base path:** `/api/v1/testimonials`  
Only `isActive: true` testimonials are returned.

---

### `GET /api/v1/testimonials`
> Fetch active customer testimonials (video or text).

**Query:** `limit` (default `12`)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "testimonials": [
      {
        "_id": "2",
        "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "isActive": true,
        "createdAt": "2026-05-18T10:00:00.000Z"
      }
    ]
  }
}
```

---

### `GET /api/v1/testimonials/videos`
> Fetch testimonials that have a video URL only.

**Query:** `limit` (default `8`)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "testimonials": [
      {
        "_id": "2",
        "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "isActive": true
      }
    ]
  }
}
```

---

## 6. Hero Banners

**Base path:** `/api/v1/hero-banners`  
Only active banners within their scheduled date range are returned.

---

### `GET /api/v1/hero-banners`
> Fetch all currently active homepage banners.  
> Side-effect: increments `impressions` counter on each banner (fire-and-forget).

**Response 200:**
```json
{
  "success": true,
  "data": {
    "banners": [
      {
        "_id": "1",
        "desktopImage": "https://cdn.ssherbal.in/banners/banner1-desktop.jpg",
        "mobileImage":  "https://cdn.ssherbal.in/banners/banner1-mobile.jpg",
        "title":    "SS Herbal India — Pure & Natural",
        "subtitle": "Discover the power of Ayurveda",
        "ctaText":  "Shop Now",
        "ctaLink":  "/products",
        "displayOrder": 1
      },
      {
        "_id": "2",
        "desktopImage": "https://cdn.ssherbal.in/banners/banner2-desktop.jpg",
        "mobileImage":  "https://cdn.ssherbal.in/banners/banner2-mobile.jpg",
        "title":    null,
        "subtitle": null,
        "ctaText":  null,
        "ctaLink":  null,
        "displayOrder": 2
      }
    ]
  }
}
```

---

### `POST /api/v1/hero-banners/:id/click`
> Track a banner click for analytics.

**Response 200:**
```json
{ "success": true }
```

---

## 7. Landing Pages

**Base path:** `/api/v1/landing-pages`  
Only `published: true` pages are returned.

---

### `GET /api/v1/landing-pages/product/:productId`
> Fetch a published landing page for a specific product.

**Response 200:**
```json
{
  "data": {
    "_id": "1",
    "pageSettings": {
      "slug": "turmeric-face-wash-sale",
      "title": "Turmeric Glow Face Wash — Special Offer",
      "metaDescription": "Get 20% off on our best-selling face wash."
    },
    "productId": "1",
    "sections": [
      { "type": "hero",     "data": { "headline": "Glow Naturally", "ctaText": "Buy Now" } },
      { "type": "benefits", "data": { "items": ["Brightens skin", "Removes acne"] } }
    ],
    "generatedHtml": "<html>...</html>",
    "generatedCss":  "body { margin: 0; }",
    "generatedJs":   "",
    "published":     true,
    "publishedAt":   "2026-05-10T10:00:00.000Z"
  }
}
```

**Error Responses:**
| Code | Message |
|---|---|
| 404 | No published landing page found for this product |

---

### `GET /api/v1/landing-pages/:slug`
> Fetch a published landing page by its slug.

**Response 200:** Same structure as above.

**Error Responses:**
| Code | Message |
|---|---|
| 404 | Landing page not found |

---

## Error Codes Reference

| Status | Meaning | Common Causes |
|---|---|---|
| 200 | OK | Successful fetch |
| 201 | Created | Review submitted |
| 400 | Bad Request | Missing or invalid fields |
| 401 | Unauthorized | Missing/invalid JWT (review submit) |
| 404 | Not Found | Product / Blog / Page not found |
| 409 | Conflict | Already reviewed this product |
| 429 | Too Many Requests | Rate limit: 100 req / 15 min per IP |
| 500 | Internal Server Error | Server-side issue |

---

## Frontend Integration Quickstart

### Load homepage data
```javascript
const [banners, featured, bestSellers, newLaunches, blogs] = await Promise.all([
  fetch('/api/v1/hero-banners').then(r => r.json()),
  fetch('/api/v1/products/featured?limit=8').then(r => r.json()),
  fetch('/api/v1/products/best-sellers?limit=8').then(r => r.json()),
  fetch('/api/v1/products/new-launches?limit=8').then(r => r.json()),
  fetch('/api/v1/blogs/featured?limit=4').then(r => r.json()),
]);
```

### Product detail page
```javascript
const { data } = await fetch('/api/v1/products/turmeric-glow-face-wash').then(r => r.json());
// data.product   → full product
// data.reviews   → approved reviews
// data.relatedProducts → up to 8
```

### Submit review (requires login)
```javascript
await fetch('/api/v1/reviews', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ productId: '1', rating: 5, comment: 'Amazing!', title: 'Love it' })
});
```

---

*SS Herbal India | Public API v1 | Last updated: May 18, 2026*
