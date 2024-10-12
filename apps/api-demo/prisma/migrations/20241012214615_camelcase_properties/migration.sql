/*
  Warnings:

  - The primary key for the `Permission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `permission_id` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `permission_name` on the `Permission` table. All the data in the column will be lost.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role_id` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `role_name` on the `Role` table. All the data in the column will be lost.
  - The primary key for the `RolesPermissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `permission_id` on the `RolesPermissions` table. All the data in the column will be lost.
  - You are about to drop the column `role_id` on the `RolesPermissions` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `delete_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - The primary key for the `UsersRoles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role_id` on the `UsersRoles` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `UsersRoles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[permissionName]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roleName]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `permissionName` to the `Permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleName` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permissionId` to the `RolesPermissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `RolesPermissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `UsersRoles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UsersRoles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RolesPermissions" DROP CONSTRAINT "RolesPermissions_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "RolesPermissions" DROP CONSTRAINT "RolesPermissions_role_id_fkey";

-- DropForeignKey
ALTER TABLE "UsersRoles" DROP CONSTRAINT "UsersRoles_role_id_fkey";

-- DropForeignKey
ALTER TABLE "UsersRoles" DROP CONSTRAINT "UsersRoles_user_id_fkey";

-- DropIndex
DROP INDEX "Permission_permission_name_key";

-- DropIndex
DROP INDEX "Role_role_name_key";

-- AlterTable
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_pkey",
DROP COLUMN "permission_id",
DROP COLUMN "permission_name",
ADD COLUMN     "permissionId" SERIAL NOT NULL,
ADD COLUMN     "permissionName" TEXT NOT NULL,
ADD CONSTRAINT "Permission_pkey" PRIMARY KEY ("permissionId");

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
DROP COLUMN "role_id",
DROP COLUMN "role_name",
ADD COLUMN     "roleId" SERIAL NOT NULL,
ADD COLUMN     "roleName" TEXT NOT NULL,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("roleId");

-- AlterTable
ALTER TABLE "RolesPermissions" DROP CONSTRAINT "RolesPermissions_pkey",
DROP COLUMN "permission_id",
DROP COLUMN "role_id",
ADD COLUMN     "permissionId" INTEGER NOT NULL,
ADD COLUMN     "roleId" INTEGER NOT NULL,
ADD CONSTRAINT "RolesPermissions_pkey" PRIMARY KEY ("roleId", "permissionId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "created_at",
DROP COLUMN "delete_at",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleteAt" TIMESTAMP(3),
ADD COLUMN     "userId" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "UsersRoles" DROP CONSTRAINT "UsersRoles_pkey",
DROP COLUMN "role_id",
DROP COLUMN "user_id",
ADD COLUMN     "roleId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "UsersRoles_pkey" PRIMARY KEY ("userId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_permissionName_key" ON "Permission"("permissionName");

-- CreateIndex
CREATE UNIQUE INDEX "Role_roleName_key" ON "Role"("roleName");

-- AddForeignKey
ALTER TABLE "UsersRoles" ADD CONSTRAINT "UsersRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersRoles" ADD CONSTRAINT "UsersRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("roleId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesPermissions" ADD CONSTRAINT "RolesPermissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("roleId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesPermissions" ADD CONSTRAINT "RolesPermissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("permissionId") ON DELETE CASCADE ON UPDATE CASCADE;
