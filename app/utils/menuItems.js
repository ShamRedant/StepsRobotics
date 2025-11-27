// lib/navbarData.js
import { fetchLogo, fetchNavbar } from "./fetchData";

export async function getNavbarData() {
  const [logoUrl, navbarItems] = await Promise.all([
    fetchLogo(),
    fetchNavbar(),
  ]);

  // Define the desired order
  const order = ["Home", "Courses", "Programs", "About Us", "Contacts"];

  // Sort according to that order
  const sortedItems = navbarItems.sort(
    (a, b) => order.indexOf(a.label) - order.indexOf(b.label)
  );

  return { logoUrl, sortedItems };
}