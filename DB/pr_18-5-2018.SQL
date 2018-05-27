-- =============================================================================================================
------------------------------------------------- DELVRT -------------------------------------------------------
-- Author: Harsh Chauhan
-- Backed up on: 18-05-2018
-- =============================================================================================================
-- CREATE QUERIES

CREATE TABLE entityTypeMaster (
    idEntityTypeMaster serial NOT NULL,
    eType text NOT NULL,
    isActive boolean DEFAULT true,
    createdOn timestamp with time zone DEFAULT now() NOT NULL,
    createdBy integer,
    updatedOn timestamp with time zone,
    updatedBy integer,
    CONSTRAINT entityTypeMaster_pk PRIMARY KEY (idEntityTypeMaster)
);

CREATE TABLE usersMaster (
    idUsersMaster serial NOT NULL,
    uType text NOT NULL,
    isActive boolean DEFAULT true,
    createdOn timestamp with time zone,
    createdBy integer,
    updatedOn timestamp with time zone DEFAULT now() NOT NULL,
    updatedBy integer,
    CONSTRAINT usersmaster_pk PRIMARY KEY (idUsersMaster)
);

CREATE TABLE users (
    uid integer NOT NULL,
    uTypeId integer NOT NULL,
    uname text NOT NULL CONSTRAINT unq_uname UNIQUE,
    passwd text NOT NULL,
    salt text NOT NULL,
    email text NOT NULL CONSTRAINT unq_email UNIQUE,
    fname text,
    lname text,
    isdeleted boolean DEFAULT false,
    createdon timestamp with time zone,
    createdby integer,
    updatedon timestamp with time zone DEFAULT now() NOT NULL,
    updatedby integer,
    CONSTRAINT users_pk PRIMARY KEY (uid),
    CONSTRAINT fk_users_usersmaster FOREIGN KEY (utypeid) REFERENCES usersmaster(idusersmaster)
);

CREATE TABLE retailerTypeMaster (
    idRetailerTypeMaster serial NOT NULL,
    rType text NOT NULL,
    isActive boolean DEFAULT true,
    createdOn timestamp with time zone DEFAULT now() NOT NULL,
    createdBy integer,
    updatedOn timestamp with time zone,
    updatedBy integer,
    CONSTRAINT retailerTypeMaster_pk PRIMARY KEY (idRetailerTypeMaster)
);

CREATE TABLE storeTypeMaster (
    idStoreTypeMaster serial NOT NULL,
    sType text NOT NULL,
    isActive boolean DEFAULT true,
    createdOn timestamp with time zone DEFAULT now() NOT NULL,
    createdBy integer,
    updatedOn timestamp with time zone,
    updatedBy integer,
    CONSTRAINT storeTypeMaster_pk PRIMARY KEY (idStoreTypeMaster)
);

CREATE TABLE productsCategoryMaster (
    idProductsCategoryMaster serial NOT NULL,
    categoryType text NOT NULL,
    isActive boolean DEFAULT true,
    createdOn timestamp with time zone DEFAULT now() NOT NULL,
    createdBy integer,
    updatedOn timestamp with time zone,
    updatedBy integer,
    CONSTRAINT productsCategoryMaster_pk PRIMARY KEY (idProductsCategoryMaster)
);


CREATE TABLE productsSubCategoryMaster (
	idProductsSubCategoryMaster serial NOT NULL,
	subcategoryType text NOT NULL,
	categoryMasterId int NOT NULL,
	CONSTRAINT productssubcategorymaster_pk PRIMARY KEY (idProductsSubCategoryMaster),
	CONSTRAINT fk_productssubcategorymaster_productscategorymaster FOREIGN KEY (categoryMasterId) REFERENCES productsCategoryMaster(idProductsCategoryMaster)
);

CREATE TABLE products (
	idProducts serial NOT NULL,
	productName text NOT NULL,
	subcategoryMasterid int NOT NULL,
	CONSTRAINT products_pk PRIMARY KEY (idProducts),
	CONSTRAINT fk_products_productssubcategorymaster FOREIGN KEY (subcategoryMasterid) REFERENCES productsSubCategoryMaster(idProductsSubCategoryMaster)
);

CREATE TABLE locations (
    idLocations serial NOT NULL,
    entityTypeId INT not null,
    entityId INT not null,
    latlng geography not null,
    place text not null,
    CONSTRAINT locations_pk PRIMARY KEY (idLocations),
	CONSTRAINT fk_locations_entityTypeMaster FOREIGN KEY (entityTypeId) REFERENCES entityTypeMaster(idEntityTypeMaster)
);


CREATE TABLE locationsHistory (
    idLocationsHistory serial NOT NULL,
    entityTypeId INT not null,
    entityId INT not null,
    latlng geography not null,
    place text not null,
    CONSTRAINT locations_pk PRIMARY KEY (idLocations),
	CONSTRAINT fk_locations_entityTypeMaster FOREIGN KEY (entityTypeId) REFERENCES entityTypeMaster(idEntityTypeMaster)
);

CREATE INDEX locations_latlng_idx ON delvrt.locations USING gist (latlng);
CREATE INDEX locationshistory_latlng_idx ON delvrt.locationshistory USING gist (latlng);

CREATE UNIQUE INDEX locations_unq_index ON delvrt.locations USING btree (entitytypeid, entityid, latlng);
CREATE UNIQUE INDEX locationshistory_unq_index ON delvrt.locationshistory USING btree (entitytypeid, entityid, latlng);


CREATE TABLE stores (
	idStore serial NOT NULL,
	retailerTypeId int NOT NULL,
	retailerId int NOT NULL,
	storeTypeId int NOT NULL,
	storeName text NOT NULL,
	isActive bool NULL DEFAULT true,
	createdOn timestamptz NOT NULL DEFAULT now(),
	createdBy int4 NULL,
	updatedOn timestamptz NULL,
	updatedBy int4 NULL,
	CONSTRAINT stores_pk PRIMARY KEY (idStore),
	CONSTRAINT fk_stores_retailertypemaster FOREIGN KEY (retailerTypeId) REFERENCES retailerTypeMaster(idRetailerTypeMaster),
	CONSTRAINT fk_stores_storetypemaster FOREIGN KEY (storeTypeId) REFERENCES storeTypeMaster(idStoreTypeMaster),
	CONSTRAINT fk_stores_users FOREIGN KEY (retailerId) REFERENCES users(uid)
);

CREATE TABLE productsRetailerMapping (
    idProductsRetailer serial NOT NULL,
    storeId integer NOT NULL,
    productId integer NOT NULL,
    isActive boolean DEFAULT false,
    createdOn timestamp with time zone DEFAULT now() NOT NULL,
    createdBy integer,
    updatedOn timestamp with time zone,
    updatedBy integer,
	CONSTRAINT productsRetailerMapping_pk PRIMARY KEY (idProductsRetailer),
    CONSTRAINT fk_productsRetailerMapping_stores FOREIGN KEY (storeId) REFERENCES stores(idStore),
    CONSTRAINT fk_productsRetailerMapping_products FOREIGN KEY (productId) REFERENCES products(idProducts)
);




-- DROP QUERIES
DROP TABLE entityTypeMaster;
DROP TABLE usersMaster;
DROP TABLE users;
DROP TABLE retailerTypeMaster;
DROP TABLE storeTypeMaster;
DROP TABLE locations;
DROP TABLE locationsHistory;
DROP TABLE productsCategoryMaster;
DROP TABLE productsSubCategoryMaster;
DROP TABLE products;
DROP TABLE stores;


-- CHECK geography DATATYPE EXISTS OR NOT IN POSTGIS
\dT geography