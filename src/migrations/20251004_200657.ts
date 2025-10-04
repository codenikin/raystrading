import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "categories_rels" CASCADE;
  ALTER TABLE "subcategories_rels" DROP CONSTRAINT "subcategories_rels_products_fk";
  
  DROP INDEX "subcategories_rels_products_id_idx";
  ALTER TABLE "products" ALTER COLUMN "categories_id" DROP NOT NULL;
  ALTER TABLE "products" ALTER COLUMN "subcategories_id" DROP NOT NULL;
  ALTER TABLE "subcategories_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "subcategories_rels" ADD CONSTRAINT "subcategories_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "subcategories_rels_categories_id_idx" ON "subcategories_rels" USING btree ("categories_id");
  ALTER TABLE "subcategories_rels" DROP COLUMN "products_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "categories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer,
  	"subcategories_id" integer
  );
  
  ALTER TABLE "subcategories_rels" DROP CONSTRAINT "subcategories_rels_categories_fk";
  
  DROP INDEX "subcategories_rels_categories_id_idx";
  ALTER TABLE "products" ALTER COLUMN "categories_id" SET NOT NULL;
  ALTER TABLE "products" ALTER COLUMN "subcategories_id" SET NOT NULL;
  ALTER TABLE "subcategories_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "categories_rels" ADD CONSTRAINT "categories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_rels" ADD CONSTRAINT "categories_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_rels" ADD CONSTRAINT "categories_rels_subcategories_fk" FOREIGN KEY ("subcategories_id") REFERENCES "public"."subcategories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "categories_rels_order_idx" ON "categories_rels" USING btree ("order");
  CREATE INDEX "categories_rels_parent_idx" ON "categories_rels" USING btree ("parent_id");
  CREATE INDEX "categories_rels_path_idx" ON "categories_rels" USING btree ("path");
  CREATE INDEX "categories_rels_products_id_idx" ON "categories_rels" USING btree ("products_id");
  CREATE INDEX "categories_rels_subcategories_id_idx" ON "categories_rels" USING btree ("subcategories_id");
  ALTER TABLE "subcategories_rels" ADD CONSTRAINT "subcategories_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "subcategories_rels_products_id_idx" ON "subcategories_rels" USING btree ("products_id");
  ALTER TABLE "subcategories_rels" DROP COLUMN "categories_id";`)
}
