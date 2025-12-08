-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileImage" TEXT NOT NULL DEFAULT 'https://github.com/shadcn.png',
ADD COLUMN     "username" TEXT NOT NULL DEFAULT 'Admin';
