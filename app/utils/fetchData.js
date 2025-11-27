// ✅ Fetch logo
export async function fetchLogo() {
    const res = await fetch("/api/logo");
    if (!res.ok) throw new Error("Failed to fetch logo");
    const data = await res.json();
    return data.logo_url;
}

// ✅ Fetch navbar
export async function fetchNavbar() {
    const res = await fetch("/api/navbar");
    if (!res.ok) throw new Error("Failed to fetch navbar");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
}

//Fetch Banners
export async function fetchBanners() {
  const res = await fetch("/api/banners");
  if (!res.ok) throw new Error("Failed to fetch banners");
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

// Fetch Explore Courses
export async function fetchExploreCourses() {
  const res = await fetch("/api/home/explore_courses");
  if (!res.ok) throw new Error("Failed to fetch explore courses");
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

//Why Choose Step Robotics
// export async function whyChooseSTEPS(){
//   const res = await fetch('api/home/robotics');
//   if(!res.ok) throw new Error("Failed to fetch the Data (Why Choose STEPS Robotics)");
//   const data = await res.json();
//   return Array.isArray(data) ? data : [];
// }

// Why Choose Step Robotics
export async function whyChooseSTEPS() {
  try {
    const res = await fetch("/api/home/robotics", {
      cache: "no-store", // ensures fresh data each time
    });

    if (!res.ok) throw new Error("Failed to fetch Why Choose STEPS data");

    const data = await res.json();

    // Return the full API object
    return data;
  } catch (err) {
    console.error("❌ Error fetching Why Choose STEPS:", err);
    return null;
  }
}


//Testimonals
export async function fetchTestimonials() {
  const res = await fetch("/api/home/testimonials", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch testimonials");
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

// Fetch Why Choose STEPS
export async function fetchWhyChoose() {
  const res = await fetch("/api/home/why_choose", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch Why Choose STEPS");
  const data = await res.json();
  return data;
}

//Footer
export async function footer(){
  const res = await fetch("/api/home/footer", {cache: "no-store"});
  if(!res.ok) throw new Error("Failed to fetch Footer")
  const data = await res.json()
  return data
}