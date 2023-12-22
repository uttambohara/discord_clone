// Import necessary dependencies and modules
import { prisma } from "@/lib/prisma"; // Prisma client for database interactions
import { currentUser, redirectToSignIn } from "@clerk/nextjs"; // Clerk authentication library for Next.js

export default async function CurrentProfile() {
  // Check if a user is authenticated using Clerk's currentUser function
  const user = await currentUser();

  // If user is not authenticated, return null
  if (!user) return null;

  // Attempt to retrieve a user profile from the database
  const profile = await prisma.profile.findFirst({
    where: {
      userId: user.id,
    },
  });

  // If no profile is found
  if (!profile) {
    // Create a new profile
    const createProfile = await prisma.profile.create({
      data: {
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
        name: user.firstName!,
        userId: user.id,
      },
    });

    // Return the newly created profile
    return createProfile;
  }

  // If a profile exists, return the retrieved profile
  return profile;
}
