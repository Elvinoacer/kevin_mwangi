import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "campus-services-platform",
    index: "01",
    title: "Campus Services & Local Business Discovery Platform",
    tagline:
      "One structured place for university students to discover, vet and reach nearby service providers.",
    category: "full-stack",
    type: "final-year",
    featured: true,
    year: 2026,
    duration: "2 semesters · final-year project",
    role: "Full-Stack Development, Backend Architecture & Database Design",
    teamSize: 1,
    status: "Final-year project · documented build",
    summary:
      "A web platform that helps university students discover nearby service providers and businesses, view verified profiles, contact providers through phone or WhatsApp, browse services, and optionally make booking requests. Built end-to-end: data model, APIs, authentication, search, moderation and deployment.",
    problem:
      "Students around a university environment rely on word of mouth, scattered WhatsApp contacts, social-media posts and physical searching to find service providers — barbers, tutors, printers, repair shops, movers. Recommendations go stale, there is no way to compare providers, and no single place holds structured, up-to-date information. The result is wasted time and low trust: you find a provider, but you cannot see their services, prices or opening state anywhere reliable.",
    users: [
      "Students searching for nearby services and businesses",
      "Business owners who want a discoverable, structured profile",
      "Admins who moderate listings and keep the directory trustworthy",
    ],
    requirements: [
      "Businesses can register, create and edit profiles",
      "Categories and structured service information per business",
      "Contact methods exposed per provider (phone, WhatsApp)",
      "Location information for proximity-aware discovery",
      "Search by name with category filtering and sorting",
      "Optional ratings and reviews",
      "Booking / contact requests",
      "Authentication with distinct user, business-owner and admin roles",
      "A dashboard where owners manage their own listings only",
      "Basic admin moderation actions",
      "Deployed publicly with preview and production environments",
    ],
    constraints: [
      "Solo developer — scope had to stay honest",
      "Free-tier hosting and database budget",
      "Primary users on mobile devices and patchy campus networks",
      "No access to real payment rails — payments are out of scope",
      "Location data is approximate (campus-area level), not GPS-precise",
    ],
    architectureNote:
      "Next.js application hosting both UI and server layer. Server components render discovery pages; server actions and route handlers expose the application API. Authentication gates business-owner and admin capabilities. PostgreSQL is the single source of truth; file storage is separated so the database stays lean. Every request that mutates state is authenticated, authorized and validated server-side.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Auth.js",
      "Cloudinary",
      "Vercel",
    ],
    dataModel: [
      {
        name: "User",
        fields: [
          { name: "id", type: "uuid" },
          { name: "email", type: "text", note: "unique" },
          { name: "passwordHash", type: "text" },
          { name: "role", type: "enum", note: "user · owner · admin" },
          { name: "name", type: "text" },
        ],
        relations: ["owns zero or one Business"],
      },
      {
        name: "Business",
        fields: [
          { name: "id", type: "uuid" },
          { name: "ownerId", type: "uuid", note: "FK → User" },
          { name: "name", type: "text" },
          { name: "slug", type: "text", note: "unique, indexed" },
          { name: "description", type: "text" },
          { name: "categoryId", type: "uuid", note: "FK → BusinessCategory" },
          { name: "phone / whatsapp", type: "text" },
          { name: "area / landmark", type: "text" },
          { name: "status", type: "enum", note: "pending · active · suspended" },
        ],
        relations: ["has Services", "has Images", "has Location", "receives Bookings"],
      },
      {
        name: "Service",
        fields: [
          { name: "id", type: "uuid" },
          { name: "businessId", type: "uuid", note: "FK → Business" },
          { name: "title", type: "text" },
          { name: "priceNote", type: "text" },
          { name: "duration", type: "text" },
        ],
      },
      {
        name: "Booking",
        fields: [
          { name: "id", type: "uuid" },
          { name: "businessId", type: "uuid", note: "FK" },
          { name: "userId", type: "uuid", note: "FK → User" },
          { name: "serviceId", type: "uuid", note: "FK, nullable" },
          { name: "requestedFor", type: "timestamp" },
          { name: "note", type: "text" },
          { name: "status", type: "enum", note: "new · accepted · declined" },
        ],
      },
      {
        name: "Review",
        fields: [
          { name: "id", type: "uuid" },
          { name: "businessId", type: "uuid", note: "FK" },
          { name: "userId", type: "uuid", note: "FK" },
          { name: "rating", type: "int", note: "1–5" },
          { name: "body", type: "text" },
        ],
      },
      {
        name: "BusinessCategory",
        fields: [
          { name: "id", type: "uuid" },
          { name: "name", type: "text", note: "unique" },
          { name: "slug", type: "text", note: "indexed" },
        ],
      },
    ],
    apis: [
      {
        method: "GET",
        path: "/api/businesses?search=&category=&page=",
        auth: "Public",
        description: "Paginated, filterable directory listing — the discovery workhorse.",
      },
      {
        method: "GET",
        path: "/api/businesses/:slug",
        auth: "Public",
        description: "Business profile with services, images and aggregate rating.",
      },
      {
        method: "POST",
        path: "/api/businesses",
        auth: "Required",
        role: "Business owner",
        description: "Create a business profile after registration.",
      },
      {
        method: "PATCH",
        path: "/api/businesses/:id",
        auth: "Required",
        role: "Owner of this business",
        description: "Update profile — ownership checked server-side, every time.",
      },
      {
        method: "POST",
        path: "/api/bookings",
        auth: "Required",
        role: "Customer",
        description: "Create a booking/contact request against a business.",
      },
      {
        method: "GET",
        path: "/api/admin/businesses?status=pending",
        auth: "Required",
        role: "Admin",
        description: "Moderation queue of pending or flagged listings.",
      },
    ],
    security: [
      "Server-side authorization: owners can only touch their own rows",
      "Password hashing — plaintext is never stored or logged",
      "Session management through Auth.js with httpOnly cookies",
      "Input validation on every mutation with schema validation",
      "Rate limiting on auth and booking endpoints",
      "Parameterized queries via Prisma — no string-built SQL",
      "Least privilege: admin actions are separate, auditable operations",
    ],
    testing: [
      "Unit tests for validation and slug/ID generation",
      "Integration tests for the booking flow",
      "Authorization tests — user A must not edit user B's business",
      "API tests for listing, filtering and pagination behaviour",
      "Manual responsive testing on mobile viewports",
    ],
    deployment: [
      "GitHub as source of truth — feature branches, reviewed PRs",
      "CI running lint, type checks and tests on every push",
      "Vercel preview deployments per pull request",
      "Production environment with managed PostgreSQL",
      "Prisma migrations applied through the release pipeline",
      "Environment variables for DB, auth secrets and file storage",
    ],
    results: [
      "A working, deployed directory application covering the full loop: discovery → profile → contact → booking",
      "Role-based flows (user, owner, admin) behaving correctly under tests",
      "A normalized relational schema that survived multiple feature iterations without rewrites",
      "A moderation path that keeps listing quality under control",
    ],
    metrics: [
      { label: "Entities modelled", value: "9" },
      { label: "API routes", value: "14" },
      { label: "Roles", value: "3" },
      { label: "Test categories", value: "5" },
    ],
    challenges: [
      "Search: naive ILIKE queries scanned too much on seed data — fixed with a pg_trgm index and tighter query scope",
      "Ownership checks were initially sprinkled in the UI layer; moving them server-side centralised trust",
      "Image uploads needed size/type limits and a fail-safe path when storage was unreachable",
      "The first schema put contact info on the User table; extracting Business as its own entity was a necessary early refactor",
    ],
    lessons: [
      "Software engineering is more than writing features. Data modelling, authentication, failure states, security, deployment, performance and maintainability all decide whether a product works reliably for real users.",
      "Every constraint I honoured early (roles, validation, migrations) paid for itself the moment requirements moved.",
    ],
    improvements: [
      "Mobile app with offline-first behaviour",
      "Recommendation engine based on category affinity",
      "Stronger geospatial search with PostGIS",
      "In-app messaging between students and providers",
      "Booking calendar with availability windows",
      "Business analytics dashboard for owners",
      "Observability: structured logs and error tracking in production",
    ],
    accent: "green",
    excerpt: {
      file: "src/lib/authorization.ts",
      language: "ts",
      lines: [
        "export async function assertCanEditBusiness(",
        "  session: Session,",
        "  businessId: string,",
        ") {",
        "  if (session.role === \"admin\") return;",
        "",
        "  const business = await db.business.findUnique({",
        "    where: { id: businessId },",
        "    select: { ownerId: true },",
        "  });",
        "",
        "  if (!business || business.ownerId !== session.userId) {",
        "    throw new AuthorizationError(",
        "      \"You do not own this business.\",",
        "    );",
        "  }",
        "}",
      ],
      caption:
        "Ownership is verified server-side on every mutation — the UI never decides who is allowed to act.",
    },
  },
  {
    slug: "realtime-chat",
    index: "02",
    title: "Real-Time Chat Application",
    tagline:
      "WebSocket conversations with presence, read state and durable message history.",
    category: "backend",
    type: "personal",
    featured: false,
    year: 2025,
    duration: "6 weeks · personal project",
    role: "Backend & real-time systems focus",
    teamSize: 1,
    status: "Personal project · documented build",
    summary:
      "A chat application with authentication, conversation management, WebSocket delivery, online presence, read receipts and full message persistence. Built to understand event-driven backend systems beyond request/response.",
    problem:
      "Request/response APIs cannot push state. Presence, typing indicators and message delivery need an always-open channel with careful event design. I wanted to build the real-time layer properly — including the failure cases: reconnects, missed events and duplicate delivery.",
    users: [
      "Registered users in 1:1 conversations",
      "Future: small group conversations",
    ],
    requirements: [
      "User registration and login",
      "1:1 conversations with message persistence",
      "WebSocket delivery with reconnect handling",
      "Online/offline presence per user",
      "Read state (unread counts, seen markers)",
      "Message history pagination",
    ],
    constraints: [
      "Single server process — no distributed fan-out yet",
      "Websocket library constraints in the hosting environment",
      "Designed for learning depth over scale",
    ],
    architectureNote:
      "HTTP layer handles auth and history; a Socket.IO server handles the real-time channel. On connect, the socket authenticates against the same session, joins per-user rooms, and presence is tracked with connection counts so multiple tabs behave correctly. Messages are persisted first, then broadcast — persistence is the source of truth, sockets are delivery.",
    stack: [
      "Node.js",
      "TypeScript",
      "Socket.IO",
      "PostgreSQL",
      "React",
      "Express",
    ],
    dataModel: [
      {
        name: "Conversation",
        fields: [
          { name: "id", type: "uuid" },
          { name: "createdAt", type: "timestamp" },
          { name: "lastMessageAt", type: "timestamp", note: "indexed — powers chat ordering" },
        ],
        relations: ["has Participants", "has Messages"],
      },
      {
        name: "Participant",
        fields: [
          { name: "conversationId", type: "uuid", note: "FK" },
          { name: "userId", type: "uuid", note: "FK" },
          { name: "lastReadAt", type: "timestamp", note: "drives read receipts" },
        ],
      },
      {
        name: "Message",
        fields: [
          { name: "id", type: "uuid" },
          { name: "conversationId", type: "uuid", note: "FK, indexed" },
          { name: "senderId", type: "uuid", note: "FK" },
          { name: "body", type: "text" },
          { name: "createdAt", type: "timestamp" },
        ],
      },
    ],
    apis: [
      {
        method: "GET",
        path: "/api/conversations",
        auth: "Required",
        description: "List conversations ordered by most recent message.",
      },
      {
        method: "GET",
        path: "/api/conversations/:id/messages?before=",
        auth: "Required",
        description: "Cursor-paginated message history for scroll-back.",
      },
      {
        method: "WS",
        path: "message:send / message:new / presence:update",
        auth: "Session handshake",
        description: "Real-time events: send, receive, presence and read markers.",
      },
    ],
    security: [
      "Socket handshake authenticates the session — anonymous sockets never join rooms",
      "Server validates that both participants belong to a conversation before events flow",
      "Message bodies are length-capped and escaped on render",
    ],
    testing: [
      "Unit tests for read-state calculation",
      "Integration tests for message persistence + broadcast order",
      "Manual reconnect testing (kill socket, verify recovery)",
    ],
    deployment: [
      "Runs behind a reverse proxy with WebSocket upgrade support",
      "Environment-scoped database credentials",
    ],
    results: [
      "Reconnect-safe message delivery with no duplicates in tests",
      "Correct multi-tab presence via connection counting",
      "Chat list ordering driven by an indexed lastMessageAt",
    ],
    metrics: [
      { label: "Real-time events", value: "7" },
      { label: "Core tables", value: "3" },
    ],
    challenges: [
      "Duplicate messages on rapid reconnects — solved with client event IDs and server de-duplication",
      "Presence flapping when tabs sleep — presence only marked offline after a grace window",
    ],
    lessons: [
      "Event-driven systems push complexity into ordering and idempotency. Design for the reconnect, not the happy path.",
    ],
    improvements: [
      "Group conversations",
      "Message delivery states (sent / delivered / read) end-to-end",
      "Horizontal scaling with a Redis pub/sub adapter",
      "Typing indicators and unread badges in the UI shell",
    ],
    accent: "blue",
  },
  {
    slug: "ecommerce-api",
    index: "03",
    title: "E-Commerce Backend API",
    tagline:
      "A documented REST API for products, carts, orders, inventory and admin flows.",
    category: "backend",
    type: "academic",
    featured: false,
    year: 2025,
    duration: "8 weeks · academic / personal project",
    role: "Backend engineering & API design",
    teamSize: 1,
    status: "Academic project · documented build",
    summary:
      "A backend-for-frontend style commerce API: product catalog, cart management, order placement with a mocked payment step, inventory decrement, user accounts and an admin surface. Ships with API documentation, schema and a Postman collection.",
    problem:
      "Commerce is a deceptively deep domain: stock must not oversell, carts must survive sessions, orders must be transactional. I built this API to practise designing an interface other developers could consume without talking to me — the documentation is part of the product.",
    users: [
      "Frontend developers consuming the API",
      "Shoppers with accounts and carts",
      "Admins managing catalog and orders",
    ],
    requirements: [
      "Product catalog with categories, search and pagination",
      "Cart per user with quantity rules",
      "Order placement with inventory reservation",
      "Mocked payment step with explicit states",
      "Admin endpoints for products and order status",
      "OpenAPI-style documentation and a Postman collection",
    ],
    constraints: [
      "Payments mocked — no real money flows",
      "Single database — no warehouse-scale requirements",
      "Focus on interface quality over breadth of features",
    ],
    architectureNote:
      "Layered Node.js/Express service: routes validate, services decide, repositories talk to PostgreSQL through Prisma. Order placement runs inside a transaction that re-checks stock levels, so concurrent checkouts cannot oversell the last item. The mocked payment provider is isolated behind an interface so a real one can slot in later.",
    stack: ["Node.js", "Express", "TypeScript", "PostgreSQL", "Prisma", "Jest"],
    dataModel: [
      {
        name: "Product",
        fields: [
          { name: "id", type: "uuid" },
          { name: "title / slug", type: "text", note: "indexed" },
          { name: "priceCents", type: "int", note: "money as integers, never floats" },
          { name: "stockQty", type: "int", note: "checked at order time" },
          { name: "categoryId", type: "uuid", note: "FK" },
        ],
      },
      {
        name: "Cart / CartItem",
        fields: [
          { name: "userId", type: "uuid", note: "one active cart per user" },
          { name: "productId", type: "uuid", note: "FK" },
          { name: "qty", type: "int" },
        ],
      },
      {
        name: "Order / OrderItem",
        fields: [
          { name: "id", type: "uuid" },
          { name: "userId", type: "uuid", note: "FK" },
          { name: "status", type: "enum", note: "pending · paid · fulfilled · cancelled" },
          { name: "totalCents", type: "int", note: "snapshot, not derived" },
        ],
        relations: ["has OrderItems with per-item price snapshots"],
      },
    ],
    apis: [
      {
        method: "GET",
        path: "/api/products?search=&category=&page=",
        auth: "Public",
        description: "Catalog listing with filtering and pagination.",
      },
      {
        method: "POST",
        path: "/api/cart/items",
        auth: "Required",
        description: "Add or update a cart line with quantity validation.",
      },
      {
        method: "POST",
        path: "/api/orders",
        auth: "Required",
        description: "Place an order — transactional stock check, mock payment.",
      },
      {
        method: "GET",
        path: "/api/admin/orders",
        auth: "Required",
        role: "Admin",
        description: "Admin order list with status transitions.",
      },
    ],
    security: [
      "JWT-based authentication with hashed passwords",
      "Role middleware guarding the admin surface",
      "Validation on every body — the API never trusts the client",
      "Money handled as integer cents to avoid float drift",
    ],
    testing: [
      "Unit tests for cart math and totals",
      "Integration test: concurrent checkout of the last item — exactly one order wins",
      "API contract tests for pagination shape",
    ],
    deployment: ["Docker container for reproducible local runs", "Postman collection for manual exploration"],
    results: [
      "Transactional order flow that passes the oversell test",
      "Documented, consumable API surface",
      "Clean separation between routes, services and data access",
    ],
    metrics: [
      { label: "Endpoints", value: "18" },
      { label: "Tables", value: "7" },
    ],
    challenges: [
      "Cart totals drifting from product prices — solved with per-item price snapshots at order time",
      "The first checkout implementation checked stock before the transaction; moving the check inside it fixed the race",
    ],
    lessons: [
      "An API is a product. Documentation, consistent error shapes and pagination conventions are design work, not extras.",
    ],
    improvements: [
      "Real payment provider integration",
      "Idempotency keys for safe retries",
      "Redis-backed sessions and caching",
      "Rate limiting at the gateway layer",
    ],
    accent: "green",
  },
  {
    slug: "analytics-dashboard",
    index: "04",
    title: "Data Analytics Dashboard",
    tagline: "From raw dataset to cleaned aggregates to honest visual insight.",
    category: "data",
    type: "academic",
    featured: false,
    year: 2025,
    duration: "5 weeks · academic project",
    role: "Data cleaning, aggregation & visualization",
    teamSize: 2,
    status: "Academic project · documented build",
    summary:
      "An analytics project covering the full data path: cleaned a raw dataset, aggregated it in SQL and Python, built visualizations, and documented the trends with explicit assumptions and limitations.",
    problem:
      "Raw datasets answer nothing by themselves. The assignment's dataset was inconsistently coded, partially missing values and mixed types. The deliverable required defensible aggregates — numbers a reviewer could trace back to documented cleaning decisions.",
    users: [
      "Reviewers assessing the analysis methodology",
      "Readers consuming the final charts and insights",
    ],
    requirements: [
      "Profile the raw dataset and document quality issues",
      "Clean and normalize with a repeatable script",
      "Aggregate with SQL and pandas",
      "Visualize key trends and distributions",
      "Write up findings with stated limitations",
    ],
    constraints: [
      "Dataset size modest — correctness over big-data tooling",
      "Time-boxed academic deadline",
    ],
    architectureNote:
      "A notebook-free pipeline: Python scripts run the cleaning steps in order and write intermediate parquet/CSV artifacts; SQL handles aggregation; matplotlib renders charts. Each stage is re-runnable, so every figure in the write-up can be regenerated from raw input.",
    stack: ["Python", "pandas", "SQL", "matplotlib"],
    dataModel: [
      {
        name: "cleaned_* staging tables",
        fields: [
          { name: "source columns", type: "typed & coerced", note: "documented per-column transforms" },
          { name: "quality flags", type: "bool", note: "rows kept, but flagged" },
        ],
        relations: ["aggregates read from cleaned staging only"],
      },
    ],
    apis: [],
    security: [
      "No PII in the dataset — verified during profiling",
      "Scripts run read-only against source files",
    ],
    testing: [
      "Assertion checks after each cleaning stage (row counts, null budgets)",
      "Aggregate cross-checks between SQL and pandas results",
    ],
    deployment: ["Reproducible local pipeline with pinned dependencies"],
    results: [
      "A fully documented cleaning chain with regeneration from raw data",
      "Five publication-style charts with written interpretation",
      "SQL/pandas cross-validated aggregates",
    ],
    metrics: [
      { label: "Cleaning stages", value: "6" },
      { label: "Charts delivered", value: "5" },
    ],
    challenges: [
      "Silent type coercion corrupting one column — caught by the null-budget assertions, fixed with an explicit parser",
      "Two 'same' categories spelled differently — normalized with a mapping table, documented in the write-up",
    ],
    lessons: [
      "The analysis is only as defensible as its cleaning decisions. Every transform should be written down and re-runnable.",
    ],
    improvements: [
      "Interactive dashboard version",
      "Automated data-quality report generation",
      "Statistical significance testing on the headline trends",
    ],
    accent: "violet",
  },
  {
    slug: "rbac-auth-system",
    index: "05",
    title: "Authentication & RBAC System",
    tagline: "Registration to roles to protected endpoints — the security layer done as a study.",
    category: "security",
    type: "personal",
    featured: false,
    year: 2024,
    duration: "4 weeks · personal project",
    role: "Security-focused backend build",
    teamSize: 1,
    status: "Personal project · documented build",
    summary:
      "A standalone authentication and authorization service: registration, login, sessions, password reset, roles, granular permissions and protected endpoints — built to make the security layer explicit instead of magical.",
    problem:
      "Auth is usually copied from a tutorial and never understood. I wanted to implement the full lifecycle — including password reset with expiring tokens and permission checks that live server-side — so that security decisions in later projects were deliberate.",
    users: [
      "Applications needing an identity layer",
      "Developers learning how RBAC maps to storage",
    ],
    requirements: [
      "Registration with validation and hashed credentials",
      "Login with session issuance",
      "Password reset with single-use expiring tokens",
      "Roles and a permission matrix",
      "Middleware-guarded example endpoints",
      "Audit trail of sensitive actions",
    ],
    constraints: [
      "Educational scope — no production user data",
      "Deliberately explicit over framework magic",
    ],
    architectureNote:
      "Express service with a session store and a permission model stored as relations (role → permission rows), not code branches. Middleware resolves the session, loads the permission set once per request, and endpoints declare required permissions declaratively. Reset tokens are single-use, hashed at rest and expire.",
    stack: ["Node.js", "Express", "TypeScript", "PostgreSQL", "Prisma"],
    dataModel: [
      {
        name: "User",
        fields: [
          { name: "id", type: "uuid" },
          { name: "email", type: "text", note: "unique" },
          { name: "passwordHash", type: "text" },
          { name: "status", type: "enum", note: "active · locked" },
        ],
        relations: ["has Sessions", "has Roles via UserRole"],
      },
      {
        name: "Role / Permission",
        fields: [
          { name: "role.name", type: "text", note: "e.g. admin, editor, viewer" },
          { name: "permission.key", type: "text", note: "e.g. business:update" },
        ],
        relations: ["RolePermission joins roles to permissions"],
      },
      {
        name: "PasswordResetToken",
        fields: [
          { name: "tokenHash", type: "text", note: "tokens stored hashed" },
          { name: "userId", type: "uuid", note: "FK" },
          { name: "expiresAt", type: "timestamp" },
          { name: "usedAt", type: "timestamp", note: "single-use marker" },
        ],
      },
    ],
    apis: [
      {
        method: "POST",
        path: "/api/auth/register",
        auth: "Public",
        description: "Create an account with validation and hashed password.",
      },
      {
        method: "POST",
        path: "/api/auth/login",
        auth: "Public",
        description: "Verify credentials, issue a session.",
      },
      {
        method: "POST",
        path: "/api/auth/reset-password",
        auth: "Reset token",
        description: "Consume a single-use expiring reset token.",
      },
      {
        method: "GET",
        path: "/api/examples/protected",
        auth: "Required",
        role: "Permission: examples:read",
        description: "Example of a declaratively-guarded endpoint.",
      },
    ],
    security: [
      "Passwords hashed with a slow hash + per-user salt",
      "Reset tokens: hashed at rest, single-use, expiring",
      "Sessions: opaque IDs in httpOnly cookies with expiry",
      "Permissions resolved server-side, never from the client",
      "Login rate limiting with lockout windows",
      "Login/permission failures logged as audit events",
    ],
    testing: [
      "Unit tests for token expiry and single-use semantics",
      "Integration tests for the full reset flow",
      "Authorization tests: permission X required, absent → 403",
    ],
    deployment: ["Local and containerized runs for study and reuse"],
    results: [
      "A reusable identity layer with a real permission matrix",
      "All security invariants covered by tests",
    ],
    metrics: [
      { label: "Roles modelled", value: "3" },
      { label: "Security invariants tested", value: "12" },
    ],
    challenges: [
      "Reset tokens initially stored in plaintext — hashing them at rest changed lookup to a hash comparison, a worthwhile trade",
      "Permission caching per request needed care to invalidate on role change",
    ],
    lessons: [
      "Authentication answers who the user is; authorization answers what they may do. Systems fail when the two are blurred.",
    ],
    improvements: [
      "Refresh-token rotation",
      "2FA (TOTP)",
      "Admin UI for role management",
    ],
    accent: "blue",
  },
  {
    slug: "url-shortener",
    index: "06",
    title: "URL Shortener & Link Analytics Service",
    tagline: "Short links, redirects and click analytics — small surface, real systems problems.",
    category: "systems",
    type: "personal",
    featured: false,
    year: 2024,
    duration: "3 weeks · personal project",
    role: "Systems & backend build",
    teamSize: 1,
    status: "Personal project · documented build",
    summary:
      "A link shortening service with redirects, click tracking, link expiration, per-link analytics and rate limiting. Chosen deliberately: a tiny product surface that hides classic systems problems — ID generation, index design, caching and concurrency.",
    problem:
      "A shortener looks like a weekend CRUD app until you think about it: collision-free ID generation at speed, a redirect path that must be near-instant, click tracking that must not slow the redirect, and analytics that aggregate honestly. I built it to practise those trade-offs in code.",
    users: [
      "Users who share links and want click counts",
      "Me — as a systems design exercise",
    ],
    requirements: [
      "Create short links from long URLs",
      "Fast redirects by slug",
      "Click tracking with referrer and coarse device",
      "Link expiration and optional custom slugs",
      "Per-link analytics summary",
      "Rate limiting on creation",
    ],
    constraints: [
      "Single-node deployment",
      "No third-party analytics dependency — clicks counted in my own store",
    ],
    architectureNote:
      "The redirect path reads from a hot cache (in-memory, Redis-shaped interface) backed by PostgreSQL with a unique index on slug. Click events are appended asynchronously after the redirect decision, so analytics never adds latency to the hop. Slug generation is base62 from a snowflake-style ID, which guarantees uniqueness without a retry loop in the common case.",
    stack: ["Node.js", "Express", "TypeScript", "PostgreSQL", "Redis (interface)", "Docker"],
    dataModel: [
      {
        name: "Link",
        fields: [
          { name: "id", type: "bigint", note: "snowflake-style" },
          { name: "slug", type: "text", note: "unique index — the hot lookup key" },
          { name: "targetUrl", type: "text" },
          { name: "expiresAt", type: "timestamp", note: "nullable" },
          { name: "createdAt", type: "timestamp" },
        ],
      },
      {
        name: "ClickEvent",
        fields: [
          { name: "linkId", type: "bigint", note: "FK, partition-ready" },
          { name: "occurredAt", type: "timestamp" },
          { name: "referrerHost", type: "text" },
          { name: "deviceClass", type: "text", note: "coarse, privacy-preserving" },
        ],
      },
    ],
    apis: [
      {
        method: "POST",
        path: "/api/links",
        auth: "Required",
        description: "Create a short link — rate limited, validates target URL.",
      },
      {
        method: "GET",
        path: "/:slug",
        auth: "Public",
        description: "301/302 redirect — the performance-critical path.",
      },
      {
        method: "GET",
        path: "/api/links/:id/analytics",
        auth: "Required",
        description: "Click totals, daily series, top referrers.",
      },
    ],
    security: [
      "Target URL validation — no javascript: or data: schemes",
      "Creation rate limiting per session",
      "Click data kept coarse on purpose — no fingerprinting",
    ],
    testing: [
      "Redirect correctness including expired links",
      "Slug uniqueness under concurrent creation",
      "Analytics aggregation against seeded click events",
    ],
    deployment: ["Dockerized app + database for one-command local run"],
    results: [
      "Redirect decision served from cache on the hot path",
      "Analytics pipeline that never blocks a redirect",
      "Collision-free slug generation in the common path",
    ],
    metrics: [
      { label: "Redirect path", value: "cached" },
      { label: "Slug space", value: "base62" },
    ],
    challenges: [
      "Counting clicks inline made redirects visibly slower — moving to async appends after the hop fixed it",
      "Custom slugs collided with generated ones until both paths shared the same unique index",
    ],
    lessons: [
      "Index design is product design: the unique slug index is what makes the whole service feel instant.",
    ],
    improvements: [
      "Redis-backed distributed cache",
      "Geohashed analytics regions",
      "API keys for programmatic link creation",
      "Queue-based analytics with exactly-once counting",
    ],
    accent: "green",
  },
  {
    slug: "ml-sentiment-classifier",
    index: "07",
    title: "Machine Learning Mini-Project — Sentiment Classifier",
    tagline: "A small, honest classifier: features, training, evaluation, limitations.",
    category: "ai",
    type: "academic",
    featured: false,
    year: 2024,
    duration: "3 weeks · academic project",
    role: "Feature engineering & evaluation",
    teamSize: 1,
    status: "Academic project · secondary depth",
    summary:
      "A text sentiment classification mini-project: dataset preparation, feature extraction, model training and a written evaluation with honest limitations. Kept deliberately secondary — I treat ML as a supported competency, not my primary direction.",
    problem:
      "Coursework required an end-to-end ML artifact. The interesting part was not the accuracy number but the evaluation discipline: train/validation/test splits that do not leak, baseline comparison, and a write-up that states what the model cannot do.",
    users: ["Course reviewers", "Anyone curious how far classical ML goes on small text data"],
    requirements: [
      "Prepare and split a labelled text dataset",
      "Extract features (bag-of-words, TF-IDF)",
      "Train and compare a baseline and a classifier",
      "Evaluate with precision/recall/F1, not just accuracy",
      "Document limitations and failure cases",
    ],
    constraints: [
      "CPU-only training",
      "Small dataset — class balance had to be managed",
    ],
    architectureNote:
      "A scikit-learn pipeline: cleaning → vectorization → classifier, with cross-validation for model selection and a held-out test set for the final report. The pipeline is serialized so the same transform applied at training applies at inference.",
    stack: ["Python", "scikit-learn", "pandas", "NumPy"],
    dataModel: [],
    apis: [],
    security: ["Dataset licensing respected", "No personal data in training inputs"],
    testing: [
      "Cross-validated model selection",
      "Held-out test evaluation",
      "Spot-check failure cases by hand and document them",
    ],
    deployment: ["Serialized model + inference script for local use"],
    results: [
      "A classifier that beat its majority-class baseline meaningfully",
      "A written evaluation including where it fails (sarcasm, negation, code-mixed text)",
    ],
    metrics: [
      { label: "Feature sets", value: "2" },
      { label: "Models compared", value: "3" },
    ],
    challenges: [
      "Class imbalance inflating accuracy — fixed with stratified splits and F1 reporting",
      "Preprocessing leakage between train and test — fixed by fitting vectorizers on the training fold only",
    ],
    lessons: [
      "A model without a baseline is a number without context. Evaluation design matters more than model choice.",
    ],
    improvements: [
      "Fine-tuned transformer comparison",
      "Confidence thresholds with abstention",
      "Deployment as an inference API",
    ],
    accent: "violet",
  },
];

export const featuredProject = projects[0];
export const otherProjects = projects.slice(1);
