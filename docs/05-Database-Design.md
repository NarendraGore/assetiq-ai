# Database Design

**Project Name:** AssetIQ AI  
**Project Type:** AI-Powered Inventory & Asset Management SaaS  
**Version:** 1.0.0  
**Document Type:** Database Design Specification  
**Status:** Draft  
**Author:** Narendra Gore  
**Last Updated:** YYYY-MM-DD

---

# Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0.0 | YYYY-MM-DD | Narendra Gore | Initial Database Design |

---

# Table of Contents

1. Introduction
2. Database Overview
3. Design Principles
4. Naming Conventions
5. Audit Fields
6. Core Entities
7. Entity Relationships
8. Database Constraints
9. Indexing Strategy
10. Data Integrity Rules
11. Soft Delete Strategy
12. Concurrency Control
13. Future Enhancements

---

# 1. Introduction

## Purpose

This document defines the logical database design for AssetIQ AI. It describes the entities, relationships, constraints, naming conventions, and database standards used throughout the application.

---

# 2. Database Overview

Database Engine

- PostgreSQL

ORM

- Entity Framework Core

Approach

- Code First

Migration Strategy

- Entity Framework Migrations

Normalization

- Third Normal Form (3NF)

---

# 3. Design Principles

The database is designed with the following principles:

- Data Integrity
- Normalization
- Performance
- Scalability
- Maintainability
- Security
- Referential Integrity
- Extensibility

---

# 4. Naming Conventions

## Tables

- Singular PascalCase

Examples

- User
- Product
- Asset
- Supplier

---

## Columns

- PascalCase

Examples

- FirstName
- CreatedAt
- UpdatedAt

---

## Primary Keys

```
Id
```

---

## Foreign Keys

```
ProductId
CategoryId
SupplierId
WarehouseId
EmployeeId
OrganizationId
```

---

## Junction Tables

Use descriptive names.

Examples

- EmployeeAsset
- ProductTag

---

# 5. Common Audit Fields

Every business entity should contain:

| Field | Description |
|---------|-------------|
| Id | Primary Key |
| CreatedAt | Record creation timestamp |
| CreatedBy | User who created the record |
| UpdatedAt | Last update timestamp |
| UpdatedBy | User who updated the record |
| IsDeleted | Soft delete flag |
| DeletedAt | Soft delete timestamp |
| RowVersion | Optimistic concurrency token |

---

# 6. Core Entities

## Organization

Represents a tenant or company.

Fields

- Id
- Name
- Email
- Phone
- Address
- Website
- IsActive

---

## User

Represents an authenticated system user.

Fields

- Id
- OrganizationId
- FirstName
- LastName
- Email
- PasswordHash
- PhoneNumber
- IsActive

---

## Role

Stores user roles.

Examples

- SuperAdmin
- Admin
- Manager
- Employee

---

## UserRole

Maps users to roles.

---

## Category

Stores product categories.

Fields

- Id
- Name
- Description

---

## Product

Stores inventory items.

Fields

- Id
- CategoryId
- SupplierId
- WarehouseId
- SKU
- Name
- Description
- UnitPrice
- Quantity
- ReorderLevel
- Status

---

## Supplier

Stores supplier information.

Fields

- Id
- Name
- Email
- Phone
- Address

---

## Warehouse

Represents physical storage locations.

Fields

- Id
- Name
- Location
- Description

---

## Asset

Represents company-owned assets.

Fields

- Id
- AssetCode
- Name
- CategoryId
- PurchaseDate
- WarrantyExpiry
- Status

---

## Employee

Stores employee information.

Fields

- Id
- DepartmentId
- EmployeeCode
- FirstName
- LastName
- Email
- Phone

---

## Department

Stores departments.

Examples

- IT
- HR
- Finance

---

## AssetAssignment

Tracks asset allocations.

Fields

- Id
- AssetId
- EmployeeId
- AssignedDate
- ReturnedDate
- Status

---

## PurchaseOrder

Stores purchase orders.

Fields

- Id
- SupplierId
- OrderNumber
- OrderDate
- Status
- TotalAmount

---

## PurchaseOrderItem

Stores order items.

Fields

- Id
- PurchaseOrderId
- ProductId
- Quantity
- UnitPrice

---

## Document

Stores uploaded document metadata.

Fields

- Id
- FileName
- FileUrl
- FileType
- UploadedBy

---

## Notification

Stores in-app notifications.

---

## AuditLog

Stores important application events.

---

# 7. Entity Relationships

```
Organization
    │
    ├────────── Users
    │
    ├────────── Products
    │
    ├────────── Assets
    │
    ├────────── Warehouses
    │
    ├────────── Suppliers
    │
    └────────── Employees

Category
    │
    ├──────── Products
    │
    └──────── Assets

Supplier
    │
    └──────── PurchaseOrders

Warehouse
    │
    └──────── Products

PurchaseOrder
    │
    └──────── PurchaseOrderItems

Employee
    │
    └──────── AssetAssignments

Asset
    │
    └──────── AssetAssignments
```

---

# 8. Database Constraints

The database shall enforce:

- Primary Keys
- Foreign Keys
- Unique Constraints
- Check Constraints
- Not Null Constraints

Examples

- Email must be unique.
- SKU must be unique.
- AssetCode must be unique.
- Quantity cannot be negative.
- UnitPrice cannot be negative.

---

# 9. Indexing Strategy

Indexes should be created on:

- Email
- SKU
- AssetCode
- ProductName
- EmployeeCode
- OrderNumber
- CreatedAt

Composite indexes may be added based on query patterns.

---

# 10. Data Integrity Rules

- Foreign keys must be valid.
- Orphan records are not allowed.
- Cascade delete should be avoided for business entities.
- Soft delete should be preferred.

---

# 11. Soft Delete Strategy

Business entities use:

```
IsDeleted
DeletedAt
```

Deleted records remain in the database and are excluded from normal queries.

---

# 12. Concurrency Control

Optimistic concurrency is implemented using:

```
RowVersion
```

This prevents accidental overwrites during concurrent updates.

---

# 13. Future Enhancements

Future database improvements may include:

- Multi-Tenant Isolation
- Database Partitioning
- Read Replicas
- Full-Text Search
- Materialized Views
- Redis Cache
- Audit History Tables
- Event Store
- Time-Series Data
- IoT Device Data Storage

---

# Entity Summary

| Entity | Purpose |
|---------|---------|
| Organization | Tenant / Company |
| User | Application user |
| Role | Authorization |
| UserRole | User-role mapping |
| Category | Product categories |
| Product | Inventory items |
| Supplier | Vendors |
| Warehouse | Storage locations |
| Asset | Company assets |
| Department | Employee departments |
| Employee | Employees |
| AssetAssignment | Asset allocation history |
| PurchaseOrder | Purchase orders |
| PurchaseOrderItem | Order items |
| Document | Uploaded files |
| Notification | User notifications |
| AuditLog | Activity history |

---

# Database Characteristics

| Characteristic | Status |
|---------------|--------|
| PostgreSQL | ✔ |
| Entity Framework Core | ✔ |
| Code First | ✔ |
| Normalized Schema | ✔ |
| Soft Delete | ✔ |
| Audit Fields | ✔ |
| Foreign Keys | ✔ |
| Optimistic Concurrency | ✔ |
| Scalable Design | ✔ |

---

**End of Document**