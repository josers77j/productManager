-- AlterTable
ALTER TABLE "permission" ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "deleteAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "resource" ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "deleteAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "role" ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "deleteAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "rolePermission" ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "deleteAt" TIMESTAMP(3);
