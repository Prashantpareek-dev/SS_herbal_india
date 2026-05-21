# SS Herbal India — Complete Frontend & Admin API Reference

**Base URL**: `http://localhost:5000/api/v1`  
**Auth**: Bearer JWT token in `Authorization: Bearer <token>` header  
**Content-Type**: `application/json`

---

## Table of Contents

1. [Authentication Overview](#authentication-overview)
2. [Public APIs — Frontend / Storefront](#public-apis)
   - [Hero Banners](#hero-banners-public)
   - [Products](#products-public)
   - [Blogs & Articles](#blogs-public)
   - [Reviews](#reviews-public)
   - [Testimonials](#testimonials-public)
   - [Landing Pages](#landing-pages-public)
3. [Admin APIs](#admin-apis)
   - [Auth](#admin-auth)
   - [Hero Banners](#admin-hero-banners)
   - [Products](#admin-products)
   - [Blogs & Articles](#admin-blogs)
   - [Reviews](#admin-reviews)
   - [Testimonials](#admin-testimonials)
   - [Orders](#admin-orders)
   - [Users](#admin-users)
   - [Categories](#admin-categories)
   - [Coupons](#admin-coupons)
   - [Landing Pages](#admin-landing-pages)
   - [Media](#admin-media)
   - [Dashboard](#admin-dashboard)
4. [Product Detail Page — Data Contract](#product-detail-page)
5. [Error Reference](#error-reference)
6. [Quick Reference Card](#quick-reference-card)

---

## Authentication Overview

All **admin** routes require:
1. Login via `POST /api/v1/admin/auth/login`
2. Set `Authorization: Bearer <token>` on every subsequent request

Public routes have no auth requirement unless marked `[Auth required]`.

---

## Public APIs

### Hero Banners (Public)

#### `GET /hero-banners`

Returns active banners for a placement. Used for homepage and section heroes.

**Query params**

| Param | Type | Default | Values |
|---|---|---|---|
| `placement` | string | `homepage_hero` | `homepage_hero`, `homepage_secondary`, `category_page`, `product_page`, `blog_page`, `sale_page`, `new_launch` |

**Response**

```json
{
  "success": true,
  "data": {
    "banners": [
      {
        "_id": "...",
        "desktopImage": { "url": "https://cdn.../banner1.jpg", "alt": "..." },
        "mobileImage":  { "url": "https://cdn.../banner1-m.jpg" },
        "displayOrder": 0
      }
    ]
  }
}
```

#### `POST /hero-banners/:id/click`

Track a CTA click (no auth, fire-and-forget).

```http
POST /hero-banners/664a.../click
```

Response: `{ "success": true }`

---

### Products (Public)

#### `GET /products`

Product listing with filters and pagination.

**Query params**

| Param | Type | Default | Description |
|---|---|---|---|
| `page` | number | `1` | Page number |
| `limit` | number | `20` | Items per page (max 100) |
| `search` | string | | Full-text search |
| `category` | string | | Category slug |
| `minPrice` | number | | Min selling price |
| `maxPrice` | number | | Max selling price |
| `isFeatured` | boolean | | `true` to filter featured |
| `isBestSeller` | boolean | | `true` to filter best sellers |
| `isNew` | boolean | | `true` to filter new arrivals |
| `sortBy` | string | `createdAt` | `createdAt`, `pricing.sellingPrice`, `metrics.averageRating`, `metrics.sales` |
| `sortOrder` | string | `desc` | `asc` \| `desc` |

**Response**

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "_id": "664a...",
        "name": "Ashwagandha Premium Capsules",
        "slug": "ashwagandha-premium-capsules",
        "shortDescription": "Stress relief & energy boost",
        "pricing": { "mrp": 699, "sellingPrice": 499, "discount": 28 },
        "inventory": { "stock": 250 },
        "category": { "name": "Wellness", "slug": "wellness" },
        "images": [{ "url": "...", "alt": "..." }],
        "metrics": { "averageRating": 4.6, "totalReviews": 128 },
        "isFeatured": true,
        "isBestSeller": true,
        "isNew": false
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalProducts": 92,
      "limit": 20
    }
  }
}
```

#### `GET /products/new-launches`

New products (flag `isNew: true`). Used for the New Launch section.

```
GET /products/new-launches?limit=12
```

#### `GET /products/best-sellers`

Best selling products (`isBestSeller: true`, sorted by `metrics.sales`).

```
GET /products/best-sellers?limit=12
```

#### `GET /products/featured`

Featured products sorted by rating.

```
GET /products/featured?limit=12
```

#### `GET /products/by-category/:slug`

Products in a category.

```
GET /products/by-category/wellness?page=1&limit=20&sortBy=metrics.sales&sortOrder=desc
```

#### `GET /products/:slug`

**Product Detail Page.** Returns full product data + approved reviews + testimonials + related products. See [Product Detail Page](#product-detail-page) for full data contract.

---

### Blogs (Public)

#### `GET /blogs`

Blog/article listing.

**Query params**

| Param | Values |
|---|---|
| `page`, `limit` | Pagination |
| `category` | Filter by category name (case-insensitive) |
| `tag` | Filter by tag |
| `search` | Title / excerpt / tag search |
| `featured=true` | Featured articles only |
| `newLaunch=true` | New launch articles only |

#### `GET /blogs/new-launches`

Articles tagged as new launch (for homepage New Launch section).

#### `GET /blogs/featured`

Featured articles.

#### `GET /blogs/:slug`

Article detail. Returns blog + `relatedBlogs` (same category, 4 latest).

**Response**

```json
{
  "success": true,
  "data": {
    "blog": {
      "_id": "...",
      "title": "5 Benefits of Ashwagandha",
      "slug": "5-benefits-of-ashwagandha",
      "excerpt": "...",
      "content": "... (full HTML/Markdown) ...",
      "author": { "name": "Dr. Priya Sharma", "bio": "...", "avatar": "..." },
      "coverImage": { "url": "...", "alt": "..." },
      "category": "Wellness",
      "tags": ["ashwagandha", "stress", "ayurveda"],
      "relatedProducts": [
        { "_id": "...", "name": "...", "slug": "...", "pricing": {}, "images": [] }
      ],
      "isFeatured": true,
      "isNewLaunch": false,
      "publishedAt": "2026-05-01T10:00:00Z",
      "metrics": { "views": 1240, "likes": 89, "readTime": 5 }
    },
    "relatedBlogs": []
  }
}
```

---

### Reviews (Public)

#### `GET /reviews/product/:productId`

Approved reviews for a product.

**Query params**: `page`, `limit`, `sortBy` (`createdAt`, `rating`, `helpfulCount`), `sortOrder`

**Response includes** `reviews` + `ratingSummary` + `pagination`.

#### `POST /reviews` `[Auth required]`

Submit a new review (status starts as `pending` — requires admin approval).

```json
{
  "productId":  "664a...",
  "rating":     5,
  "title":      "Amazing product!",
  "comment":    "Really helped with my stress levels.",
  "images":     ["https://..."],
  "orderId":    "664b..."  // optional — marks review as verified
}
```

#### `POST /reviews/:id/helpful`

Mark a review as helpful (no auth, increments count).

---

### Testimonials (Public)

#### `GET /testimonials`

General testimonials (homepage).

```
GET /testimonials?limit=12&featured=true
```

#### `GET /testimonials/videos`

Video testimonials only (for homepage video section).

```json
{
  "testimonials": [
    {
      "customerName": "Ravi Shankar",
      "customerTitle": "Fitness Coach",
      "testimonialText": "...",
      "rating": 5,
      "video": {
        "url": "https://youtube.com/...",
        "thumbnail": "...",
        "duration": "1:45",
        "platform": "youtube"
      }
    }
  ]
}
```

#### `GET /testimonials/by-product/:productId`

Testimonials for the product detail page. Sorted by `isFeatured`, `displayOrder`, `rating`.

---

### Landing Pages (Public)

#### `GET /landing-pages/:id`

Full landing page data.

#### `GET /landing-pages/slug/:slug`

Landing page by slug.

---

## Admin APIs

> All admin routes require `Authorization: Bearer <adminToken>` and the user must have role `admin`.

---

### Admin Auth

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/admin/auth/login` | Login, returns JWT token |
| `POST` | `/admin/auth/logout` | Logout |
| `GET`  | `/admin/auth/me`    | Get current admin profile |

**Login request**

```json
{ "email": "admin@ssherbal.in", "password": "Admin@1234" }
```

**Login response**

```json
{
  "success": true,
  "token": "eyJhbGci...",
  "data": {
    "_id": "...",
    "firstName": "Admin",
    "email": "admin@ssherbal.in",
    "role": "admin"
  }
}
```

---

### Admin Hero Banners

Base: `/admin/hero-banners`

| Method | Endpoint | Description |
|---|---|---|
| `GET`    | `/`               | List all banners (filter by `placement`, `isActive`) |
| `GET`    | `/:id`            | Get single banner |
| `POST`   | `/`               | Create banner |
| `PUT`    | `/:id`            | Update banner (partial update supported) |
| `PATCH`  | `/reorder`        | Bulk reorder banners |
| `DELETE` | `/:id`            | Delete banner |

**Create/Update body** (all fields optional on update):

```json
{
  "title": "Summer Sale — Up to 40% Off",
  "subtitle": "Limited time offer",
  "description": "Shop our bestsellers at unbeatable prices.",

  "desktopImage": { "url": "https://cdn.../banner.jpg", "alt": "Summer Sale" },
  "mobileImage":  { "url": "https://cdn.../banner-m.jpg" },
  "backgroundVideo": { "url": "https://cdn.../banner.mp4", "thumbnail": "..." },

  "primaryCta":   { "label": "Shop Now",    "url": "/products?category=wellness" },
  "secondaryCta": { "label": "View All",    "url": "/products" },

  "linkedProduct":  "664a...",
  "linkedCategory": "664b...",

  "placement":    "homepage_hero",
  "displayOrder": 0,
  "isActive":     true,
  "startDate":    "2026-06-01T00:00:00Z",
  "endDate":      "2026-06-30T23:59:59Z",
  "tags":         ["sale", "summer"],

  "overlayStyle": {
    "textColor":      "#ffffff",
    "overlayColor":   "#000000",
    "overlayOpacity": 0.35,
    "textAlign":      "left"
  }
}
```

**Reorder body**:

```json
{ "order": [{ "id": "664a...", "displayOrder": 0 }, { "id": "664b...", "displayOrder": 1 }] }
```

---

### Admin Products

Base: `/admin/products`

| Method | Endpoint | Description |
|---|---|---|
| `GET`    | `/`               | List all products (search, filter, paginate) |
| `GET`    | `/:id`            | Get single product |
| `POST`   | `/`               | Create product |
| `PUT`    | `/:id`            | Update product (partial update supported) |
| `DELETE` | `/:id`            | Delete product |

**Query params for GET /**:
`page`, `limit`, `search`, `category`, `status`, `sortBy`, `sortOrder`

**Create body** (required fields marked with `*`):

```json
{
  "sku":              "SSH-ASH-001",
  "name":             "Ashwagandha Premium Capsules",
  "shortDescription": "Stress relief & energy boost — 60 capsules",
  "longDescription":  "...",

  "category": {
    "id":   "664a...",
    "name": "Wellness",
    "slug": "wellness"
  },
  "subcategory": { "name": "Adaptogens", "slug": "adaptogens" },

  "pricing": {
    "mrp":          699,
    "sellingPrice": 499,
    "costPrice":    200
  },

  "inventory": {
    "stock":              250,
    "lowStockThreshold":  20,
    "trackInventory":     true,
    "allowBackorders":    false
  },

  "images": [
    { "url": "https://cdn.../prod1.jpg", "alt": "Ashwagandha", "order": 0 }
  ],
  "videos": [
    { "url": "https://...", "thumbnail": "...", "title": "How to use", "duration": "1:30" }
  ],

  "tags":        ["ashwagandha", "stress", "energy", "ayurveda"],
  "benefits":    ["Reduces stress", "Boosts energy", "Improves sleep"],
  "concerns":    ["Stress", "Anxiety", "Fatigue"],
  "ingredients": ["Ashwagandha root extract 500mg"],

  "weight":     { "value": 120, "unit": "g" },
  "dimensions": { "length": 5, "width": 5, "height": 12, "unit": "cm" },

  "seo": {
    "metaTitle":       "Buy Ashwagandha Capsules Online — SS Herbal India",
    "metaDescription": "Premium Ashwagandha...",
    "keywords":        ["ashwagandha", "buy ashwagandha online"]
  },

  "isActive":     true,
  "isFeatured":   true,
  "isBestSeller": false,
  "isNew":        true,
  "publishedAt":  "2026-05-01T00:00:00Z",
  "newUntil":     "2026-08-01T00:00:00Z"
}
```

---

### Admin Blogs

Base: `/admin/blogs`

| Method | Endpoint | Description |
|---|---|---|
| `GET`    | `/`               | List all blogs (search, filter, paginate) |
| `GET`    | `/:id`            | Get single blog |
| `POST`   | `/`               | Create blog/article |
| `PUT`    | `/:id`            | Update blog (partial update supported) |
| `PATCH`  | `/:id/publish`    | Publish a draft |
| `PATCH`  | `/:id/archive`    | Archive a blog |
| `DELETE` | `/:id`            | Delete blog |

**Query params for GET /**:
`page`, `limit`, `status` (`draft`/`published`/`archived`), `category`, `search`, `featured=true`, `newLaunch=true`

**Create/Update body**:

```json
{
  "title":    "5 Science-Backed Benefits of Ashwagandha",
  "excerpt":  "Ashwagandha, the ancient Ayurvedic herb, has surprising benefits...",
  "content":  "... (full HTML or Markdown) ...",

  "author": {
    "name":   "Dr. Priya Sharma",
    "bio":    "Ayurvedic practitioner with 15 years experience",
    "avatar": "https://cdn.../avatar.jpg"
  },

  "coverImage": { "url": "https://cdn.../blog1.jpg", "alt": "Ashwagandha benefits" },
  "coverVideo": { "url": "https://cdn.../blog1.mp4", "thumbnail": "..." },

  "category":        "Wellness",
  "tags":            ["ashwagandha", "stress", "ayurveda"],
  "relatedProducts": ["664a...", "664b..."],

  "status":      "published",
  "publishedAt": "2026-05-14T10:00:00Z",

  "seo": {
    "metaTitle":       "5 Benefits of Ashwagandha — SS Herbal India",
    "metaDescription": "...",
    "keywords":        ["ashwagandha benefits"]
  },

  "isFeatured":  true,
  "isNewLaunch": false
}
```

> `metrics.readTime` is **auto-calculated** from content word count (~200 wpm).

---

### Admin Reviews

Base: `/admin/reviews`

| Method | Endpoint | Description |
|---|---|---|
| `GET`    | `/`                   | List all reviews (filter, paginate) |
| `GET`    | `/stats/overview`     | Review statistics |
| `GET`    | `/:id`                | Get single review |
| `PUT`    | `/:id/approve`        | Approve review |
| `PUT`    | `/:id/reject`         | Reject review |
| `POST`   | `/:id/reply`          | Post admin reply |
| `DELETE` | `/:id`                | Delete review |

**Query params for GET /**:
`page`, `limit`, `status` (`pending`/`approved`/`rejected`), `rating` (1-5), `search`, `productId`

**Reject body**:

```json
{ "moderationNotes": "Spam / violates community guidelines" }
```

**Reply body**:

```json
{ "text": "Thank you for your feedback! We will reach out to resolve your concern." }
```

**Stats response**:

```json
{
  "total": 254,
  "pending": 18,
  "approved": 228,
  "rejected": 8,
  "averageRating": 4.4,
  "ratingDistribution": { "5": 140, "4": 68, "3": 25, "2": 12, "1": 9 }
}
```

> Approving / rejecting a review **automatically recalculates** the product's `metrics.averageRating` and `metrics.totalReviews`.

---

### Admin Testimonials

Base: `/admin/testimonials`

| Method | Endpoint | Description |
|---|---|---|
| `GET`    | `/`               | List all testimonials (filter, paginate) |
| `GET`    | `/:id`            | Get single testimonial |
| `POST`   | `/`               | Create testimonial (manual add) |
| `PUT`    | `/:id`            | Update testimonial (full or partial) |
| `PATCH`  | `/:id/approve`    | Approve testimonial |
| `PATCH`  | `/reorder`        | Bulk reorder display order |
| `DELETE` | `/:id`            | Delete testimonial |

**Query params for GET /**:
`page`, `limit`, `status`, `featured=true`, `source`, `search`, `productId`

**Create/Update body**:

```json
{
  "customerName":     "Ravi Shankar",
  "customerAvatar":   "https://cdn.../ravi.jpg",
  "customerLocation": "Mumbai, Maharashtra",
  "customerTitle":    "Yoga Instructor",
  "testimonialText":  "SS Herbal's Ashwagandha has transformed my stress levels completely...",
  "rating":           5,

  "video": {
    "url":       "https://www.youtube.com/watch?v=...",
    "thumbnail": "https://img.youtube.com/vi/.../hqdefault.jpg",
    "duration":  "1:45",
    "platform":  "youtube"
  },

  "linkedReview": "664c...",
  "products":     ["664a...", "664b..."],

  "displayOrder": 0,
  "isFeatured":   true,
  "isActive":     true,
  "status":       "approved",
  "source":       "google",
  "adminNotes":   "Verified via Google reviews"
}
```

**Reorder body**:

```json
{ "order": [{ "id": "664a...", "displayOrder": 0 }, { "id": "664b...", "displayOrder": 1 }] }
```

---

### Admin Orders

Base: `/admin/orders`

| Method | Endpoint | Description |
|---|---|---|
| `GET`    | `/`       | List all orders |
| `GET`    | `/:id`    | Get order details |
| `PUT`    | `/:id`    | Update order status |

---

### Admin Users

Base: `/admin/users`

| Method | Endpoint | Description |
|---|---|---|
| `GET`    | `/`       | List all users |
| `GET`    | `/:id`    | Get user profile |
| `PUT`    | `/:id`    | Update user |

---

### Admin Categories

Base: `/admin/categories`

| Method | Endpoint | Description |
|---|---|---|
| `GET`    | `/`       | List all categories |
| `GET`    | `/:id`    | Get category |
| `POST`   | `/`       | Create category |
| `PUT`    | `/:id`    | Update category |
| `DELETE` | `/:id`    | Delete category |

---

### Admin Coupons

Base: `/admin/coupons`

| Method | Endpoint | Description |
|---|---|---|
| `GET`    | `/`       | List all coupons |
| `GET`    | `/:id`    | Get coupon |
| `POST`   | `/`       | Create coupon |
| `PUT`    | `/:id`    | Update coupon |
| `DELETE` | `/:id`    | Delete coupon |

---

### Admin Landing Pages

Base: `/admin/landing-pages`

| Method | Endpoint | Description |
|---|---|---|
| `GET`    | `/`                    | List all landing pages |
| `GET`    | `/:id`                 | Get single landing page |
| `GET`    | `/slug/:slug`          | Get by slug |
| `GET`    | `/product/:productId`  | Get by product ID |
| `POST`   | `/`                    | Create landing page |
| `PUT`    | `/:id`                 | Update landing page |
| `PATCH`  | `/:id/publish`         | Publish landing page |
| `DELETE` | `/:id`                 | Delete landing page |

---

### Admin Media

Base: `/admin/media`

| Method | Endpoint | Description |
|---|---|---|
| `GET`    | `/`       | List media files |
| `POST`   | `/upload` | Upload file(s) |
| `DELETE` | `/:id`    | Delete media |

---

### Admin Dashboard

Base: `/admin/dashboard`

| Method | Endpoint | Description |
|---|---|---|
| `GET`    | `/`       | Dashboard overview stats |
| `GET`    | `/recent` | Recent orders/activity |

---

## Product Detail Page

`GET /products/:slug` returns all data needed to render a product page:

```json
{
  "success": true,
  "data": {
    "product": {
      "_id":              "664a...",
      "sku":              "SSH-ASH-001",
      "name":             "Ashwagandha Premium Capsules",
      "slug":             "ashwagandha-premium-capsules",
      "shortDescription": "Stress relief & energy boost",
      "longDescription":  "...",
      "category":         { "name": "Wellness", "slug": "wellness" },
      "pricing":          { "mrp": 699, "sellingPrice": 499, "discount": 28 },
      "inventory":        { "stock": 250, "trackInventory": true },
      "images":           [{ "url": "...", "alt": "..." }],
      "videos":           [{ "url": "...", "thumbnail": "..." }],
      "benefits":         ["Reduces stress", "Boosts energy"],
      "concerns":         ["Stress", "Fatigue"],
      "ingredients":      ["Ashwagandha root extract 500mg"],
      "tags":             ["ashwagandha"],
      "variants":         [],
      "seo":              { "metaTitle": "...", "metaDescription": "..." },
      "metrics":          { "averageRating": 4.6, "totalReviews": 128, "views": 2500 },
      "isFeatured": true,
      "isBestSeller": true,
      "isNew": false
    },

    "reviews": [
      {
        "_id":       "...",
        "user":      { "firstName": "John", "lastName": "D.", "profileImage": "..." },
        "rating":    5,
        "title":     "Excellent product!",
        "comment":   "Really helped with my stress levels.",
        "images":    [],
        "verified":  true,
        "helpfulCount": 12,
        "adminReply": { "text": "Thank you!", "repliedAt": "2026-05-10T14:00:00Z" },
        "createdAt": "2026-05-06T10:00:00Z"
      }
    ],

    "testimonials": [
      {
        "customerName":   "Ravi Shankar",
        "customerTitle":  "Yoga Instructor",
        "testimonialText":"SS Herbal Ashwagandha is amazing...",
        "rating":         5,
        "video":          { "url": "https://youtube.com/...", "platform": "youtube" },
        "isFeatured":     true
      }
    ],

    "relatedProducts": [
      {
        "_id":     "664b...",
        "name":    "Shilajit Resin",
        "slug":    "shilajit-resin",
        "pricing": { "mrp": 999, "sellingPrice": 749 },
        "images":  [{ "url": "..." }],
        "metrics": { "averageRating": 4.5, "totalReviews": 89 }
      }
    ]
  }
}
```

---

## Error Reference

| HTTP Status | Meaning |
|---|---|
| `200` | Success |
| `201` | Created |
| `400` | Bad request / validation error — check `error` field |
| `401` | Unauthorized — missing or invalid JWT |
| `403` | Forbidden — user is not admin |
| `404` | Not found |
| `409` | Conflict — duplicate (e.g. same review twice) |
| `500` | Server error |

**Error response shape**:

```json
{
  "success": false,
  "message": "Validation error: SKU is required, MRP is required",
  "error":   "..."
}
```

---

## Quick Reference Card

### Frontend — Key Endpoints

```
GET  /hero-banners?placement=homepage_hero     → Homepage hero banners
GET  /products/new-launches?limit=12          → New launch products
GET  /products/best-sellers?limit=12          → Best sellers
GET  /products/featured?limit=12              → Featured products
GET  /products/:slug                          → Product detail + reviews + testimonials + related
GET  /blogs/new-launches?limit=6              → New launch articles
GET  /blogs?category=wellness&page=1          → Blog listing
GET  /blogs/:slug                             → Article detail
GET  /testimonials/videos?limit=8             → Video testimonials
GET  /testimonials/by-product/:productId      → Product page testimonials
GET  /reviews/product/:productId              → Product reviews
POST /reviews                [Auth]            → Submit review
POST /reviews/:id/helpful                     → Mark helpful
```

### Admin — Key Endpoints

```
POST /admin/auth/login                        → Login
GET  /admin/dashboard                         → Stats overview
GET  /admin/products?search=...               → Product list
POST /admin/products                          → Create product
PUT  /admin/products/:id                      → Update product
GET  /admin/blogs                             → Blog list
POST /admin/blogs                             → Create article
PATCH /admin/blogs/:id/publish                → Publish draft
POST /admin/testimonials                      → Add testimonial (manual)
PUT  /admin/testimonials/:id                  → Edit testimonial
POST /admin/hero-banners                      → Create banner
PATCH /admin/hero-banners/reorder             → Reorder banners
GET  /admin/reviews?status=pending            → Pending reviews
PUT  /admin/reviews/:id/approve               → Approve review
POST /admin/reviews/:id/reply                 → Admin reply to review
```
